'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ShopifyCart } from '@/types/shopify'

interface CartContextType {
	cart: ShopifyCart | null
	isLoading: boolean
	isOpen: boolean
	itemCount: number
	addToCart: (variantId: string, quantity?: number) => Promise<void>
	updateCartLine: (lineId: string, quantity: number) => Promise<void>
	removeFromCart: (lineId: string) => Promise<void>
	toggleCart: () => void
	openCart: () => void
	closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_ID_KEY = 'shopify_cart_id'

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<ShopifyCart | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isOpen, setIsOpen] = useState(false)

	// Calculate item count from cart lines
	const itemCount = cart?.lines.edges.reduce(
		(total, edge) => total + edge.node.quantity,
		0
	) || 0

	// Load cart from localStorage on mount
	useEffect(() => {
		async function loadCart() {
			try {
				const cartId = localStorage.getItem(CART_ID_KEY)
				if (cartId) {
					const response = await fetch('/api/cart', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ action: 'get', cartId }),
					})

					if (response.ok) {
						const data = await response.json()
						setCart(data.cart)
					} else {
						// Clear invalid cart ID
						localStorage.removeItem(CART_ID_KEY)
					}
				}
			} catch (error) {
				console.error('Error loading cart:', error)
			} finally {
				setIsLoading(false)
			}
		}

		loadCart()
	}, [])

	const addToCart = async (variantId: string, quantity = 1) => {
		try {
			setIsLoading(true)

			const cartId = cart?.id || localStorage.getItem(CART_ID_KEY)
			const action = cartId ? 'add' : 'create'

			const response = await fetch('/api/cart', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action,
					cartId,
					variantId,
					quantity,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to add to cart')
			}

			const data = await response.json()
			setCart(data.cart)

			// Save cart ID to localStorage
			if (data.cart?.id) {
				localStorage.setItem(CART_ID_KEY, data.cart.id)
			}

			// Auto-open cart drawer
			setIsOpen(true)
		} catch (error) {
			console.error('Error adding to cart:', error)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const updateCartLine = async (lineId: string, quantity: number) => {
		if (!cart?.id) return

		try {
			setIsLoading(true)

			const response = await fetch('/api/cart', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'update',
					cartId: cart.id,
					lineId,
					quantity,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to update cart')
			}

			const data = await response.json()
			setCart(data.cart)
		} catch (error) {
			console.error('Error updating cart:', error)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const removeFromCart = async (lineId: string) => {
		if (!cart?.id) return

		try {
			setIsLoading(true)

			const response = await fetch('/api/cart', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'remove',
					cartId: cart.id,
					lineId,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to remove from cart')
			}

			const data = await response.json()
			setCart(data.cart)
		} catch (error) {
			console.error('Error removing from cart:', error)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const toggleCart = () => setIsOpen((prev) => !prev)
	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)

	return (
		<CartContext.Provider
			value={{
				cart,
				isLoading,
				isOpen,
				itemCount,
				addToCart,
				updateCartLine,
				removeFromCart,
				toggleCart,
				openCart,
				closeCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}