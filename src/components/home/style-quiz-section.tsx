'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronRight, Award, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import QuizModal from '@/components/quiz/quiz-modal'

const StyleQuizSection = () => {
	const [isQuizOpen, setIsQuizOpen] = useState(false)
	const shouldReduceMotion = useReducedMotion()

	const handleOpenQuiz = () => {
		setIsQuizOpen(true)
	}

	const handleCloseQuiz = () => {
		setIsQuizOpen(false)
	}

	return (
		<>
			<section className="section-padding bg-gradient-to-br from-brand-cream to-white">
				<div className="container-custom">
					<ScrollReveal>
						<div className="relative overflow-hidden rounded-3xl bg-white border border-border/50 shadow-xl">
							{/* Background Pattern */}
							<div className="absolute inset-0 opacity-[0.03] pointer-events-none">
								<div className="absolute inset-0" style={{
									backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
									backgroundSize: '24px 24px'
								}} />
							</div>

							{/* Content */}
							<div className="relative z-10 p-6 md:p-12 lg:p-16">
								<div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
									{/* Title */}
									<motion.h2
										initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5 }}
										className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
									>
										Non sai quale ciglia scegliere?
									</motion.h2>

									{/* Description */}
									<motion.p
										initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.1 }}
										className="text-lg md:text-xl text-muted-foreground leading-relaxed"
									>
										Fai il nostro quiz di 30 secondi e scopri le ciglia perfette per il tuo stile,
										l&apos;occasione e il tuo livello di esperienza. Risultati personalizzati in tempo reale!
									</motion.p>

									{/* Features */}
									<motion.div
										initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.2 }}
										className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
									>
										<div className="flex items-center gap-2 justify-center text-sm font-medium text-foreground bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
											<Award className="h-4 w-4 text-brand-primary" />
											Consigli personalizzati
										</div>
										<div className="flex items-center gap-2 justify-center text-sm font-medium text-foreground bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
											<Heart className="h-4 w-4 text-brand-primary" />
											Perfetto per te
										</div>
										<div className="flex items-center gap-2 justify-center text-sm font-medium text-foreground bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
											<Zap className="h-4 w-4 text-brand-primary" />
											Risultati immediati
										</div>
									</motion.div>

									{/* CTA Button */}
									<motion.div
										initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
										className="pt-2"
									>
										<Button
											size="lg"
											onClick={handleOpenQuiz}
											className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
										>
											<Sparkles className="h-5 w-5 mr-2" />
											Fai il quiz ora
											<ChevronRight className="h-5 w-5 ml-2" />
										</Button>
									</motion.div>

									{/* Subtext */}
									<motion.p
										initial={shouldReduceMotion ? false : { opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 0.4 }}
										className="text-sm text-muted-foreground pt-2"
									>
										⏱️ Tempo stimato: 30 secondi • {''}
										<span className="text-brand-primary font-medium">100% gratuito</span>
									</motion.p>
								</div>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Quiz Modal */}
			<AnimatePresence>
				{isQuizOpen && (
					<QuizModal isOpen={isQuizOpen} onClose={handleCloseQuiz} />
				)}
			</AnimatePresence>
		</>
	)
}

export default StyleQuizSection
