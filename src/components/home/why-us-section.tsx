'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Heart, Sparkles, Clock, Award, Shield, LucideIcon } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface FeatureCardProps {
	icon: LucideIcon
	title: string
	description: string
	index: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
	const shouldReduceMotion = useReducedMotion()
	const [isMobile, setIsMobile] = React.useState(false)

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Alterna animazione: pari da destra, dispari da sinistra
	const isEven = index % 2 === 0
	const mobileInitialX = isEven ? 100 : -100

	return (
		<motion.div
			initial={shouldReduceMotion ? false : isMobile 
				? { opacity: 0, x: mobileInitialX }
				: { opacity: 0, scale: 0.8, rotate: -5 }
			}
			whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{
				type: 'spring',
				stiffness: 200,
				damping: 20,
				delay: shouldReduceMotion ? 0 : index * 0.1
			}}
			whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
			className="group relative overflow-hidden rounded-2xl bg-white border border-border/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
		>
			{/* Animated Background Gradient on Hover */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					opacity: [0, 0.5, 0],
				}}
				transition={{
					duration: 0.6,
					repeat: shouldReduceMotion ? 0 : Infinity,
					repeatDelay: 3,
					delay: index * 0.2
				}}
				className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 pointer-events-none"
			/>

			{/* Icon with Bounce Animation */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					scale: [1, 1.15, 1],
					rotate: [0, 5, 0]
				}}
				transition={{
					duration: 0.6,
					repeat: shouldReduceMotion ? 0 : Infinity,
					repeatDelay: 2 + index * 0.3,
					ease: 'easeInOut'
				}}
				whileHover={shouldReduceMotion ? {} : { scale: 1.2, rotate: 10 }}
				className="w-14 h-14 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300"
			>
				<Icon className="h-7 w-7 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
			</motion.div>

			{/* Title */}
			<motion.h3
				initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1 }}
				className="font-playfair font-bold text-lg text-foreground text-center mb-2 group-hover:text-brand-primary transition-colors duration-300"
			>
				{title}
			</motion.h3>

			{/* Description */}
			<motion.p
				initial={shouldReduceMotion ? false : { opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1 }}
				className="text-muted-foreground text-sm leading-relaxed text-center"
			>
				{description}
			</motion.p>

			{/* Hover Indicator Line */}
			<motion.div
				animate={shouldReduceMotion ? {} : { width: ['0%', '100%', '0%'] }}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					repeatDelay: 2 + index * 0.3,
					ease: 'easeInOut'
				}}
				className="absolute bottom-0 left-0 h-0.5 bg-brand-primary/20"
			/>
		</motion.div>
	)
}

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.span
			initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ type: 'spring', stiffness: 200, damping: 15 }}
			className="inline-block font-playfair text-4xl md:text-5xl font-bold text-brand-primary"
		>
			<motion.span
				animate={shouldReduceMotion ? {} : {
					opacity: [0.5, 1, 0.5],
					scale: [1, 1.1, 1]
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					repeatDelay: 3,
					ease: 'easeInOut'
				}}
			>
				{value}
			</motion.span>
			{suffix && <span className="text-2xl ml-1">{suffix}</span>}
		</motion.span>
	)
}

const WhyUsSection = () => {
	const features = [
		{
			icon: Eye,
			title: 'Leggere & Naturali',
			description: 'Così comode che ti dimentichi di averle, così naturali che tutti noteranno solo il tuo sguardo.',
		},
		{
			icon: Clock,
			title: 'Applicazione in pochi secondi',
			description: 'Zero stress, zero attese: ciglia perfette in un attimo, anche se vai sempre di corsa',
		},
		{
			icon: Sparkles,
			title: 'Come truccata, anche appena sveglia',
			description: 'Uno sguardo sempre curato anche nei tuoi giorni più "make-up free"',
		},
		{
			icon: Heart,
			title: 'Setole in PLA',
			description: 'Materiali biodegradabili, cruelty-free e ipoallergenici per la massima sicurezza',
		},
		{
			icon: Award,
			title: 'Qualità certificata',
			description: 'Prodotti testati e approvati da professionisti del settore beauty',
		},
		{
			icon: Shield,
			title: 'Soddisfatti o rimborsati',
			description: '30 giorni di garanzia: se non sei felice, ti rimborsiamo completamente',
		},
	]

	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				{/* Header Section */}
				<ScrollReveal>
					<div className="text-center mb-12 md:mb-16">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ type: 'spring', damping: 20 }}
							className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
						>
							Perché scegliere <span className="text-brand-primary">Lashesmood</span>?
						</motion.h2>
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
						>
							Scopri perché migliaia di donne scelgono le nostre ciglia magnetiche ogni giorno
						</motion.p>
					</div>
				</ScrollReveal>

				{/* Stats Bar with Animated Counters */}
				<ScrollReveal>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 bg-white rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm"
					>
						<div className="text-center">
							<Counter value={15000} suffix="+" />
							<p className="text-sm text-muted-foreground mt-2">Clienti felici</p>
						</div>
						<div className="text-center">
							<Counter value={4.9} suffix="/5" />
							<p className="text-sm text-muted-foreground mt-2">Valutazione media</p>
						</div>
						<div className="text-center">
							<Counter value={98} suffix="%" />
							<p className="text-sm text-muted-foreground mt-2">Ritorno acquisto</p>
						</div>
						<div className="text-center">
							<Counter value={24} suffix="h" />
							<p className="text-sm text-muted-foreground mt-2">Supporto clienti</p>
						</div>
					</motion.div>
				</ScrollReveal>

				{/* Features Grid */}
				<ScrollReveal>
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.1
								}
							}
						}}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-50px' }}
					>
						{features.map((feature, index) => (
							<FeatureCard
								key={index}
								icon={feature.icon}
								title={feature.title}
								description={feature.description}
								index={index}
							/>
						))}
					</motion.div>
				</ScrollReveal>

			{/* Bottom CTA */}
				<ScrollReveal>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ type: 'spring', stiffness: 200, damping: 15 }}
						className="mt-12 md:mt-16 text-center"
					>
						<motion.div
							animate={{ y: [0, -8, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								repeatDelay: 3,
								ease: 'easeInOut'
							}}
							className="inline-block"
						>
							<p className="text-lg font-medium text-foreground mb-4">
								Pronta a trasformare il tuo sguardo?
							</p>
						</motion.div>
					</motion.div>
				</ScrollReveal>
			</div>
		</section>
	)
}

export default WhyUsSection
