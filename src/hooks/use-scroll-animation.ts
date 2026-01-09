'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Hook per triggerare animazioni quando un elemento entra in viewport
 *
 * @param threshold - Percentuale di visibilità necessaria (0-1)
 * @param once - Se l'animazione deve scattare solo una volta
 * @returns Ref da assegnare all'elemento e booleano per stato di visibilità
 *
 * @example
 * const { ref, isInView } = useScrollAnimation(0.2)
 *
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: isInView ? 1 : 0 }}
 * >
 *   Contenuto animato
 * </motion.div>
 */
export function useScrollAnimation(threshold = 0.2, once = true) {
	const ref = useRef(null)
	const isInView = useInView(ref, {
		once: once,
		amount: threshold,
		margin: '0px 0px -50px 0px', // Trigger un po' prima che l'elemento sia completamente visibile
	})

	return { ref, isInView }
}

/**
 * Hook per scroll progress (0 a 1)
 * Utile per parallax o progress bar
 */
export function useScrollProgress() {
	if (typeof window === 'undefined') {
		return { scrollProgress: 0, scrollY: 0 }
	}

	const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
	const docHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 1
	const winHeight = typeof window !== 'undefined' ? window.innerHeight : 1

	const scrollProgress = Math.min(scrollY / (docHeight - winHeight), 1)

	return { scrollProgress, scrollY }
}

/**
 * Hook per ottenere direzione scroll (up/down)
 */
export function useScrollDirection() {
	if (typeof window === 'undefined') {
		return { direction: 'down', isScrolling: false }
	}

	let lastScrollY = 0

	const updateDirection = () => {
		const currentScrollY = window.scrollY
		const direction = currentScrollY > lastScrollY ? 'down' : 'up'
		lastScrollY = currentScrollY
		return direction
	}

	return { direction: updateDirection(), isScrolling: true }
}
