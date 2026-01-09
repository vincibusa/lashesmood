'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const FAQCTA = () => {
	const shouldReduceMotion = useReducedMotion()
	const [emailHovered, setEmailHovered] = React.useState(false)

	return (
		<section className="section-padding relative overflow-hidden">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-lashesmood-gradient" />

			{/* Animated Background Pattern */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					opacity: [0.1, 0.2, 0.1],
					rotate: [0, 5, 0]
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
					backgroundSize: '40px 40px'
				}}
			/>

			<div className="container-custom text-center relative z-10">
				<ScrollReveal>
					<div className="max-w-2xl mx-auto text-white">
						<motion.h2
							initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ type: 'spring', damping: 20 }}
							className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
						>
							Hai ancora <span className="text-brand-secondary">domande</span>?
						</motion.h2>

						<motion.p
							initial={shouldReduceMotion ? false : { opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-lg md:text-xl mb-8 text-white/95"
						>
							Il nostro team è sempre disponibile per aiutarti. Scrivici e ti risponderemo il prima possibile!
						</motion.p>

						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
							className="flex justify-center"
						>
							<motion.div
								onMouseEnter={() => setEmailHovered(true)}
								onMouseLeave={() => setEmailHovered(false)}
								whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 400, damping: 10 }}
							>
								<Button
									asChild
									size="lg"
									className="bg-white text-brand-primary hover:bg-brand-secondary hover:text-white font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
								>
									<Link href="/contatti" className="flex items-center gap-2">
										<Mail className="h-5 w-5" />
										Contattaci
										<motion.div
											animate={shouldReduceMotion ? {} : {
												x: emailHovered ? 5 : 0
											}}
											transition={{ type: 'spring', stiffness: 400, damping: 10 }}
										>
											<ArrowRight className="h-5 w-5" />
										</motion.div>
									</Link>
								</Button>
							</motion.div>
						</motion.div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	)
}

export default FAQCTA

