'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface CustomerContextValue {
	isAuthenticated: boolean
	isLoading: boolean
	isLoggingIn: boolean
	customerName?: string
	orderCount?: number
	refreshCustomer: () => Promise<void>
	handleLogin: (email: string, password: string) => Promise<boolean>
	handleRegister: (email: string, password: string) => Promise<boolean>
	handleLogout: () => Promise<void>
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined)

async function request<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
		...options,
	})

	if (!response.ok) {
		const body = (await response.json().catch(() => ({}))) as { error?: string }
		throw new Error(body.error ?? 'Request failed')
	}

	return response.json() as Promise<T>
}

async function fetchCustomerSummary(): Promise<{
	name?: string
	orderCount?: number
}> {
	const data = await request<{
		customer?: {
			displayName?: string
			numberOfOrders?: number
		}
	}>('/api/customer/profile')

	return {
		name: data.customer?.displayName,
		orderCount: data.customer?.numberOfOrders,
	}
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [customerName, setCustomerName] = useState<string | undefined>()
	const [orderCount, setOrderCount] = useState<number | undefined>()

	const refreshCustomer = useCallback(async () => {
		try {
			setIsLoading(true)
			const { name, orderCount } = await fetchCustomerSummary()
			setIsAuthenticated(true)
			setCustomerName(name)
			setOrderCount(orderCount)
		} catch (error) {
			setIsAuthenticated(false)
			setCustomerName(undefined)
			setOrderCount(undefined)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		refreshCustomer().catch(() => {
			setIsLoading(false)
		})
	}, [refreshCustomer])

	const handleLogin = useCallback(
		async (email: string, password: string) => {
			try {
				setIsLoggingIn(true)
				await request('/api/auth/login', {
					method: 'POST',
					body: JSON.stringify({ email, password }),
				})
				await refreshCustomer()
				return true
			} catch (error) {
				return false
			} finally {
				setIsLoggingIn(false)
			}
		},
		[refreshCustomer],
	)

	const handleRegister = useCallback(
		async (email: string, password: string) => {
			try {
				setIsLoggingIn(true)
				await request('/api/auth/register', {
					method: 'POST',
					body: JSON.stringify({ email, password }),
				})
				await refreshCustomer()
				return true
			} catch (error) {
				return false
			} finally {
				setIsLoggingIn(false)
			}
		},
		[refreshCustomer],
	)

	const handleLogout = useCallback(async () => {
		await request('/api/auth/logout', {
			method: 'POST',
		})
		setIsAuthenticated(false)
		setCustomerName(undefined)
		setOrderCount(undefined)
	}, [])

	const value = useMemo(
		() => ({
			isAuthenticated,
			isLoading,
			isLoggingIn,
			customerName,
			orderCount,
			refreshCustomer,
			handleLogin,
			handleRegister,
			handleLogout,
		}),
		[customerName, handleLogin, handleLogout, handleRegister, isAuthenticated, isLoading, isLoggingIn, orderCount, refreshCustomer],
	)

	return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export function useCustomer() {
	const ctx = useContext(CustomerContext)

	if (!ctx) {
		throw new Error('useCustomer deve essere usato dentro CustomerProvider')
	}

	return ctx
}

