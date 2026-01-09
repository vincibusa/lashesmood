'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface PageTransitionProps {
	children: React.ReactNode
}

/**
 * PageTransition wrapper per animazioni fluide tra le pagine
 * Rispetta prefers-reduced-motion per accessibilità
 */
export function PageTransition({ children }: PageTransitionProps) {
	const pathname = usePathname()
	const shouldReduceMotion = useReducedMotion()

	// Se l'utente ha ridotto le animazioni, ritorna solo i children senza wrapper
	if (shouldReduceMotion) {
		return <>{children}</>
	}

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={pathname}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 25,
					duration: 0.3
				}}
				className='min-h-full'
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

/**
 * Varianti di transizione alternative per casi specifici
 */
export const pageTransitionVariants = {
	// Transizione semplice fade
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.2 }
	},

	// Transizione slide da destra (per modali e overlay)
	slideFromRight: {
		initial: { x: '100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '100%', opacity: 0 },
		transition: { type: 'spring', stiffness: 200, damping: 30 }
	},

	// Transizione slide dall'alto (per bottom sheet)
	slideFromTop: {
		initial: { y: '-100%', opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: '-100%', opacity: 0 },
		transition: { type: 'spring', stiffness: 200, damping: 30 }
	},

	// Transizione scale (per modali focus)
	scale: {
		initial: { scale: 0.95, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		exit: { scale: 0.95, opacity: 0 },
		transition: { type: 'spring', stiffness: 200, damping: 20 }
	}
}

/**
 * Hook per ottenere le animazioni di transizione rispettando reduced motion
 */
export function usePageTransition() {
	const shouldReduceMotion = useReducedMotion()

	const getTransition = (variant: keyof typeof pageTransitionVariants) => {
		if (shouldReduceMotion) {
			return {
				initial: false,
				animate: false,
				exit: false,
				transition: { duration: 0 }
			}
		}
		return pageTransitionVariants[variant]
	}

	return { getTransition, shouldReduceMotion }
}
