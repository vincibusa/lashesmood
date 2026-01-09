'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const FAQQuickAccess = () => {
	const shouldReduceMotion = useReducedMotion()
	const [isHovered, setIsHovered] = React.useState(false)

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<ScrollReveal>
					<div className="max-w-3xl mx-auto text-center">
						{/* Icon Animation */}
						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ type: 'spring', stiffness: 200, damping: 15 }}
							className="inline-block mb-6"
						>
							<motion.div
								animate={shouldReduceMotion ? {} : {
									rotate: [0, 10, -10, 0],
									scale: [1, 1.1, 1]
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatDelay: 3,
									ease: 'easeInOut'
								}}
								className="w-20 h-20 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center"
							>
								<HelpCircle className="h-10 w-10 text-brand-primary" />
							</motion.div>
						</motion.div>

						<motion.h2
							initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ type: 'spring', damping: 20 }}
							className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
						>
							Hai una <span className="text-brand-primary">domanda</span> frequente?
						</motion.h2>

						<motion.p
							initial={shouldReduceMotion ? false : { opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-muted-foreground text-lg md:text-xl mb-8"
						>
							Consulta la nostra sezione FAQ per trovare risposte immediate ai dubbi
							più comuni
						</motion.p>

						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							className="inline-block"
						>
							<Button
								asChild
								size="lg"
								className="btn-primary group/btn"
							>
								<Link href="/come-funziona#faq" className="flex items-center gap-2">
									Vai alle FAQ
									<motion.div
										animate={shouldReduceMotion ? {} : {
											x: isHovered ? 5 : 0
										}}
										transition={{ type: 'spring', stiffness: 400, damping: 10 }}
									>
										<ArrowRight className="h-5 w-5" />
									</motion.div>
								</Link>
							</Button>
						</motion.div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	)
}

export default FAQQuickAccess

