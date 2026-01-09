'use client'

import { motion, type Variants } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface ScrollRevealProps {
	children: React.ReactNode
	className?: string
	variants?: Variants
	delay?: number
	once?: boolean
	threshold?: number
	as?: keyof typeof motion
}

/**
 * Componente wrapper che rivela il contenuto quando entra in viewport
 *
 * @example
 * <ScrollReveal>
 *   <HeroSection />
 * </ScrollReveal>
 *
 * @example
 * <ScrollReveal variants={fadeInUp} delay={0.2}>
 *   <div>Contenuto animato</div>
 * </ScrollReveal>
 */
export function ScrollReveal({
	children,
	className,
	variants,
	delay = 0,
	once = true,
	threshold = 0.2,
	as = 'div',
}: ScrollRevealProps) {
	const { ref, isInView } = useScrollAnimation(threshold, once)
	const shouldReduceMotion = useReducedMotion()

	// Se l'utente ha ridotto le animazioni, mostra subito il contenuto
	if (shouldReduceMotion) {
		return (
			<div className={className} ref={ref}>
				{children}
			</div>
		)
	}

	// Varianti di default
	const defaultVariants: Variants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: delay,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	}

	const MotionComponent = motion[as] as typeof motion.div

	return (
		<MotionComponent
			ref={ref}
			className={className}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={variants || defaultVariants}
		>
			{children}
		</MotionComponent>
	)
}

/**
 * Stagger container per animazioni di gruppo
 *
 * @example
 * <ScrollRevealStagger>
 *   <Card>1</Card>
 *   <Card>2</Card>
 *   <Card>3</Card>
 * </ScrollRevealStagger>
 */
export function ScrollRevealStagger({
	children,
	className,
	stagger = 0.1,
}: {
	children: React.ReactNode
	className?: string
	stagger?: number
}) {
	const { ref, isInView } = useScrollAnimation(0.2, true)
	const shouldReduceMotion = useReducedMotion()

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: stagger,
				delayChildren: 0.1,
			},
		},
	}

	if (shouldReduceMotion) {
		return (
			<div className={className} ref={ref}>
				{children}
			</div>
		)
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={containerVariants}
		>
			{children}
		</motion.div>
	)
}

/**
 * Hook per ottenere le props per un elemento scroll-reveal
 * Utile per componenti complessi che non possono usare il wrapper
 */
export function useScrollRevealProps(variants?: Variants, delay = 0) {
	const { ref, isInView } = useScrollAnimation(0.2, true)
	const shouldReduceMotion = useReducedMotion()

	if (shouldReduceMotion) {
		return { ref, style: {} }
	}

	const defaultVariants: Variants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: delay,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	}

	return {
		ref,
		initial: 'hidden',
		animate: isInView ? 'visible' : 'hidden',
		variants: variants || defaultVariants,
	}
}
