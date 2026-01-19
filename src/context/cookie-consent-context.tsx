'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CookiePreferences {
	necessary: boolean
	functional: boolean
	analytics: boolean
	marketing: boolean
}

interface CookieConsentContextType {
	preferences: CookiePreferences | null
	hasConsent: boolean
	acceptAll: () => void
	rejectAll: () => void
	updatePreferences: (prefs: CookiePreferences) => void
	openPreferences: () => void
	closePreferences: () => void
	isPreferencesOpen: boolean
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

const COOKIE_CONSENT_KEY = 'cookie_consent'

export const defaultPreferences: CookiePreferences = {
	necessary: true,
	functional: false,
	analytics: false,
	marketing: false,
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
	const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
	const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

	// Carica le preferenze da localStorage al mount
	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
			if (saved) {
				const parsed = JSON.parse(saved) as CookiePreferences
				setPreferences(parsed)
			}
		} catch (error) {
			console.error('Error loading cookie preferences:', error)
		}
	}, [])

	const savePreferences = (prefs: CookiePreferences) => {
		setPreferences(prefs)
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
			} catch (error) {
				console.error('Error saving cookie preferences:', error)
			}
		}
	}

	const acceptAll = () => {
		const allAccepted: CookiePreferences = {
			necessary: true,
			functional: true,
			analytics: true,
			marketing: true,
		}
		savePreferences(allAccepted)
		setIsPreferencesOpen(false)
	}

	const rejectAll = () => {
		savePreferences(defaultPreferences)
		setIsPreferencesOpen(false)
	}

	const updatePreferences = (prefs: CookiePreferences) => {
		// I cookie necessari sono sempre attivi
		savePreferences({
			...prefs,
			necessary: true,
		})
		setIsPreferencesOpen(false)
	}

	const openPreferences = () => {
		setIsPreferencesOpen(true)
	}

	const closePreferences = () => {
		setIsPreferencesOpen(false)
	}

	const hasConsent = preferences !== null

	return (
		<CookieConsentContext.Provider
			value={{
				preferences,
				hasConsent,
				acceptAll,
				rejectAll,
				updatePreferences,
				openPreferences,
				closePreferences,
				isPreferencesOpen,
			}}
		>
			{children}
		</CookieConsentContext.Provider>
	)
}

export function useCookieConsent() {
	const context = useContext(CookieConsentContext)
	if (context === undefined) {
		throw new Error('useCookieConsent must be used within a CookieConsentProvider')
	}
	return context
}
