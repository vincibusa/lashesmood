import { Variants, Transition } from 'framer-motion'

// ==================== ANIMATION VARIANTS ====================

// Entrata elementi con fade e slide up
export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
}

// Container con figli sfalsati
export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.1 },
	},
}

// Hero badge slide da sinistra
export const slideInLeft: Variants = {
	hidden: { opacity: 0, x: -30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
}

// Titolo con spring physics
export const springUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 100, damping: 20 },
	},
}

// Bottone fade in con scale
export const buttonEntrance: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.3, ease: 'easeOut' },
	},
}

// Card hover 3D effect
export const cardTilt3D = {
	rest: { rotateX: 0, rotateY: 0, scale: 1 },
	hover: {
		scale: 1.02,
		transition: { duration: 0.3, ease: 'easeOut' },
	},
}

// Icon bounce on entrance
export const iconBounce: Variants = {
	hidden: { scale: 0, rotate: -180 },
	visible: {
		scale: 1,
		rotate: 0,
		transition: { type: 'spring', stiffness: 200, damping: 15 },
	},
}

// Icon hover lift
export const iconHover = {
	rest: { y: 0 },
	hover: {
		y: -5,
		transition: { type: 'spring', stiffness: 400, damping: 10 },
	},
}

// Overlay reveal on hover
export const overlayReveal = {
	rest: { opacity: 0, y: 20 },
	hover: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

// Image scale on hover
export const imageScale = {
	rest: { scale: 1 },
	hover: { scale: 1.05, transition: { duration: 0.4 } },
}

// Page transitions
export const pageTransition: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

// Masonry item entrance
export const masonryItem: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4 },
	},
}

// Quiz question transition
export const questionTransition = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
}

// Modal entrance
export const modalVariant: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { type: 'spring', damping: 25 },
	},
}

// ==================== TRANSITIONS ====================

export const smoothTransition: Transition = {
	duration: 0.3,
	ease: [0.22, 1, 0.36, 1],
}

export const springTransition: Transition = {
	type: 'spring',
	stiffness: 100,
	damping: 20,
}

// ==================== REDUCED MOTION ====================

// Per quando l'utente preferisce meno animazioni
export const reducedMotionVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.1 } },
}

// Check se riduzione animazioni attiva
export const shouldReduceMotion = () => {
	if (typeof window === 'undefined') return false
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Helper per ottenere varianti corrette basate su preferenza
export const getMotionVariants = (variants: Variants) => {
	return shouldReduceMotion() ? reducedMotionVariants : variants
}
