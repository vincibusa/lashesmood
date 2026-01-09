'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Users, Store, Clock, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface ContactSection {
	icon: LucideIcon
	title: string
	description: string
	email?: string
	extraInfo?: string
	cta?: {
		text: string
		href: string
		external: boolean
	}
	hours?: string
}

interface ContactCardProps {
	section: ContactSection
	index: number
}

const ContactCard: React.FC<ContactCardProps> = ({ section, index }) => {
	const shouldReduceMotion = useReducedMotion()
	const [isHovered, setIsHovered] = React.useState(false)
	const Icon = section.icon

	// Alterna animazione: pari da destra, dispari da sinistra
	const isEven = index % 2 === 0
	const mobileInitialX = isEven ? 100 : -100

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, y: 50, scale: 0.9 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{
				type: 'spring',
				stiffness: 200,
				damping: 20,
				delay: shouldReduceMotion ? 0 : index * 0.1
			}}
			whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="h-full"
		>
			<Card className="h-full group relative overflow-hidden border-2 border-border/50 hover:border-brand-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col">
				{/* Animated Background Gradient on Hover */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? [0, 0.5, 0] : 0,
					}}
					transition={{
						duration: 0.6,
						repeat: isHovered ? Infinity : 0,
						repeatDelay: 3,
						delay: index * 0.2
					}}
					className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 pointer-events-none"
				/>

				<CardHeader className="text-center pb-4 relative z-10 flex-shrink-0">
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
						className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300"
					>
						<Icon className="h-8 w-8 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
					</motion.div>

					{/* Title with Playfair Display */}
					<motion.h3
						initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1 }}
						className="font-playfair font-bold text-xl text-foreground group-hover:text-brand-primary transition-colors duration-300"
					>
						{section.title}
					</motion.h3>
				</CardHeader>

				<CardContent className="text-center space-y-4 relative z-10 flex flex-col flex-grow pb-6">
					<div className="flex flex-col space-y-4 flex-grow">
						<motion.p
							initial={shouldReduceMotion ? false : { opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1 }}
							className="text-muted-foreground leading-relaxed"
						>
							{section.description}
						</motion.p>

						{section.email && (
							<motion.div
								initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: shouldReduceMotion ? 0 : 0.4 + index * 0.1 }}
								className="bg-brand-light rounded-lg p-4"
							>
								<Link
									href={`mailto:${section.email}`}
									className="font-bold text-brand-primary hover:underline text-lg transition-all duration-300"
								>
									{section.email}
								</Link>
							</motion.div>
						)}

						{section.extraInfo && (
							<motion.p
								initial={shouldReduceMotion ? false : { opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: shouldReduceMotion ? 0 : 0.5 + index * 0.1 }}
								className="text-muted-foreground text-sm"
							>
								{section.extraInfo}
							</motion.p>
						)}

						{section.hours && (
							<motion.div
								initial={shouldReduceMotion ? false : { opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: shouldReduceMotion ? 0 : 0.7 + index * 0.1 }}
								className="bg-muted rounded-lg p-4"
							>
								<div className="flex items-center justify-center space-x-2 text-muted-foreground">
									<Clock className="h-4 w-4" />
									<span className="text-sm">{section.hours}</span>
								</div>
							</motion.div>
						)}
					</div>

					{/* Button sempre in fondo con mt-auto */}
					{section.cta && (
						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: shouldReduceMotion ? 0 : 0.6 + index * 0.1 }}
							className="mt-auto pt-4"
						>
							<Button asChild className="btn-primary w-full min-h-[48px]">
								<Link
									href={section.cta.href}
									{...(section.cta.external && {
										target: '_blank',
										rel: 'noopener noreferrer',
									})}
								>
									{section.cta.text}
								</Link>
							</Button>
						</motion.div>
					)}
				</CardContent>

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
			</Card>
		</motion.div>
	)
}

const ContactSections = () => {
	const contactSections: ContactSection[] = [
		{
			icon: Mail,
			title: 'INFO & SPEDIZIONI',
			description:
				'Per assistenza su ordini, spedizioni o pagamenti invia una mail a',
			email: 'shop@lashesmood.com',
			extraInfo:
				"Se hai qualche difficoltà nell'applicazione, scrivici su IG:",
			cta: {
				text: 'Chatta con noi 💖',
				href: 'https://ig.me/m/lashesmood',
				external: true,
			},
			hours:
				'Rispondiamo alle vostre email dal lunedì al venerdì dalle 9:30 alle 18:30',
		},
		{
			icon: Users,
			title: 'COLLABORAZIONI',
			description:
				"Sei un'influencer o UGC Creator e ti piacerebbe collaborare con Lashesmood?",
			email: 'marketing@lashesmood.com',
			cta: {
				text: 'Contattaci subito! 📩',
				href: 'mailto:marketing@lashesmood.com',
				external: false,
			},
		},
		{
			icon: Store,
			title: 'RIVENDITORI',
			description:
				"Sei un'estetista o una Lash Maker interessata a introdurre Lashesmood nel tuo salone? Oppure rappresenti un punto vendita e desideri vendere i nostri prodotti?",
			email: 'shop@lashesmood.com',
			cta: {
				text: 'Contattaci subito! 📩',
				href: 'mailto:shop@lashesmood.com',
				external: false,
			},
			extraInfo:
				'Siamo qui per rispondere a ogni tua domanda e offrirti un supporto personalizzato. 💌',
		},
	]

	return (
		<section className="section-padding bg-white">
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
							Come possiamo <span className="text-brand-primary">aiutarti</span>?
						</motion.h2>
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
						>
							Scegli l&apos;area di interesse per ricevere l&apos;assistenza che ti serve
						</motion.p>
					</div>
				</ScrollReveal>

				{/* Cards Grid */}
				<ScrollReveal>
					<motion.div
						className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
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
						{contactSections.map((section, index) => (
							<ContactCard
								key={index}
								section={section}
								index={index}
							/>
						))}
					</motion.div>
				</ScrollReveal>
			</div>
		</section>
	)
}

export default ContactSections

