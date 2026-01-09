'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface QuickLinkCardProps {
	icon: React.ElementType
	title: string
	description: string
	href: string
	external?: boolean
	index: number
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ icon: Icon, title, description, href, external = false, index }) => {
	const shouldReduceMotion = useReducedMotion()
	const [isHovered, setIsHovered] = React.useState(false)

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				type: 'spring',
				stiffness: 200,
				damping: 20,
				delay: shouldReduceMotion ? 0 : index * 0.15
			}}
			whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card className="p-6 h-full group relative overflow-hidden border-2 border-border/50 hover:border-brand-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl">
				{/* Animated Background Gradient on Hover */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? [0, 0.3, 0] : 0,
					}}
					transition={{
						duration: 0.6,
						repeat: isHovered ? Infinity : 0,
						repeatDelay: 3
					}}
					className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 pointer-events-none"
				/>

				<div className="flex items-center space-x-4 relative z-10">
					{/* Icon with Animation */}
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
						className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300 flex-shrink-0"
					>
						<Icon className="h-6 w-6 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
					</motion.div>

					<div className="text-left flex-1">
						<motion.h3
							initial={shouldReduceMotion ? false : { opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: shouldReduceMotion ? 0 : 0.1 + index * 0.1 }}
							className="font-playfair font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors duration-300"
						>
							{title}
						</motion.h3>
						<motion.p
							initial={shouldReduceMotion ? false : { opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1 }}
							className="text-muted-foreground text-sm mb-3"
						>
							{description}
						</motion.p>
						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1 }}
						>
							<Button asChild variant="outline" size="sm" className="group/btn">
								<Link
									href={href}
									{...(external && {
										target: '_blank',
										rel: 'noopener noreferrer',
									})}
									className="flex items-center gap-2"
								>
									{external ? '@lashesmood' : 'Vai ai Tutorial'}
									<motion.div
										animate={shouldReduceMotion ? {} : {
											x: isHovered ? 5 : 0
										}}
										transition={{ type: 'spring', stiffness: 400, damping: 10 }}
									>
										<ArrowRight className="h-4 w-4" />
									</motion.div>
								</Link>
							</Button>
						</motion.div>
					</div>
				</div>

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

const QuickLinks = () => {
	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				<div className="max-w-3xl mx-auto">
					<ScrollReveal>
						<div className="text-center mb-12 md:mb-16">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ type: 'spring', damping: 20 }}
								className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
							>
								Collegamenti <span className="text-brand-primary">Rapidi</span>
							</motion.h2>
							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="text-muted-foreground text-lg md:text-xl"
							>
								Risorse utili per aiutarti a ottenere il massimo dalle tue Lashesmood
							</motion.p>
						</div>
					</ScrollReveal>

					<ScrollReveal>
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 gap-6"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.15
									}
								}
							}}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-50px' }}
						>
							<QuickLinkCard
								icon={MessageCircle}
								title="Tutorial e Guide"
								description="Scopri come applicare le tue Lashesmood"
								href="/come-funziona"
								index={0}
							/>
							<QuickLinkCard
								icon={Instagram}
								title="Seguici su Instagram"
								description="Tips, tutorial e novità ogni giorno"
								href="https://instagram.com/lashesmood"
								external
								index={1}
							/>
						</motion.div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	)
}

export default QuickLinks

