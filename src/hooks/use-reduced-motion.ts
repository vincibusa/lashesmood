'use client'

import { useEffect, useState } from 'react'

/**
 * Hook per rilevare la preferenza dell'utente per le animazioni ridotte
 * Rispetta l'impostazione di accessibilità del sistema operativo
 *
 * @returns boolean - true se l'utente ha richiesto animazioni ridotte
 *
 * @example
 * const shouldReduceMotion = useReducedMotion()
 *
 * const animationVariants = shouldReduceMotion ?
 *   { opacity: 1 } :
 *   { opacity: 0, y: 20, opacity: 1 }
 */
export function useReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

	useEffect(() => {
		// Controlla solo se window è disponibile (client-side)
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

		const handleChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches)
		}

		// Imposta il valore iniziale
		setPrefersReducedMotion(mediaQuery.matches)

		// Aggiungi listener per cambiamenti
		mediaQuery.addEventListener('change', handleChange)

		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	}, [])

	return prefersReducedMotion
}

/**
 * Hook per ottenere la durata di transizione ridotta se necessario
 * Utile per adattare le animazioni in base alle preferenze utente
 *
 * @param normalDuration - Durata normale in secondi
 * @returns Durata adattata (sempre 0.1s se reduced motion attivo)
 */
export function useAdaptedDuration(normalDuration: number = 0.3) {
	const shouldReduceMotion = useReducedMotion()
	return shouldReduceMotion ? 0.1 : normalDuration
}

/**
 * Hook per ottenere moltiplicatore di velocità animazione
 * 0 = nessuna animazione, 1 = normale, >1 = più lento
 *
 * @returns number - moltiplicatore di velocità
 */
export function useAnimationSpeedMultiplier() {
	const shouldReduceMotion = useReducedMotion()
	return shouldReduceMotion ? 0 : 1
}
