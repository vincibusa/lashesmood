'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RefreshCw, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { QuizResult } from '@/types/quiz'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface QuizResultProps {
	result: QuizResult
	onRestart: () => void
}

const QuizResultComponent: React.FC<QuizResultProps> = ({ result, onRestart }) => {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
			animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-6"
		>
			{/* Result Header */}
			<div className="text-center space-y-4">
				<motion.div
					animate={shouldReduceMotion ? {} : {
						scale: [1, 1.1, 1],
						rotate: [0, 5, 0]
					}}
					transition={{
						duration: 0.6,
						repeat: 0,
						delay: 0.2
					}}
					className="text-5xl md:text-6xl mb-2"
				>
					{result.emoji}
				</motion.div>

				<motion.h2
					className="font-playfair text-2xl md:text-3xl font-bold text-foreground leading-tight"
					initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
					animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					{result.title}
				</motion.h2>

				<motion.p
					className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
					initial={shouldReduceMotion ? false : { opacity: 0 }}
					animate={shouldReduceMotion ? {} : { opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{result.description}
				</motion.p>
			</div>

			{/* Tip Box */}
			<motion.div
				initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
				animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
				transition={{ delay: 0.3 }}
				className="bg-gradient-to-r from-brand-secondary/30 to-brand-primary/20 border border-brand-primary/20 rounded-2xl p-4 md:p-5 flex items-start gap-3"
			>
				<Sparkles className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
				<div className="flex-1">
					<p className="font-medium text-brand-accent text-sm md:text-base">{result.tip}</p>
				</div>
			</motion.div>

			{/* Recommendations */}
			<motion.div
				initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
				animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="space-y-3"
			>
				<h3 className="font-semibold text-foreground text-lg">Prodotti consigliati per te:</h3>
				<div className="space-y-2">
					{result.recommendations.map((rec, index) => (
						<motion.div
							key={rec.productId}
							custom={index}
							initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
							animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
							transition={{
								delay: shouldReduceMotion ? 0 : 0.5 + index * 0.1,
								duration: 0.3
							}}
							whileHover={shouldReduceMotion ? {} : { x: 4 }}
							className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 md:p-4 hover:border-brand-primary/50 transition-colors"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-lg bg-brand-secondary/30 flex items-center justify-center text-sm font-bold text-brand-primary">
									{index + 1}
								</div>
								<div>
									<div className="font-semibold text-foreground">{rec.name}</div>
									<div className="text-xs text-muted-foreground">{rec.reason}</div>
								</div>
							</div>
							<span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600 font-medium">
								{rec.category}
							</span>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Actions */}
			<motion.div
				initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
				animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="flex flex-col gap-3 pt-2"
			>
				<Button
					asChild
					size="lg"
					className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
				>
					<Link href="/collections/press-go-kit-completo">
						<ShoppingBag className="h-5 w-5 mr-2" />
						Scopri i prodotti consigliati
					</Link>
				</Button>

				<Button
					variant="outline"
					size="lg"
					onClick={onRestart}
					className="w-full border-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
				>
					<RefreshCw className="h-5 w-5 mr-2" />
					Fai il quiz di nuovo
				</Button>
			</motion.div>

			{/* Mini Info */}
			<motion.div
				initial={shouldReduceMotion ? false : { opacity: 0 }}
				animate={shouldReduceMotion ? {} : { opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="text-center text-xs text-muted-foreground pt-2"
			>
				✨ Tutti i prodotti sono ipoallergenici e cruelty-free
			</motion.div>
		</motion.div>
	)
}

export default QuizResultComponent