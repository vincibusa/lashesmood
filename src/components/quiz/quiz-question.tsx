'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizQuestion as QuizQuestionType, QuizOccasion, QuizEffect, QuizExperience } from '@/types/quiz'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface QuizQuestionProps {
	question: QuizQuestionType
	onAnswer: (value: QuizOccasion | QuizEffect | QuizExperience) => void
}

const QuizQuestionComponent: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
	const shouldReduceMotion = useReducedMotion()

	const optionVariants = shouldReduceMotion ? undefined : {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.4,
				ease: [0.22, 1, 0.36, 1] as const
			}
		})
	}

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
			animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="space-y-6"
		>
			{/* Question Header */}
			<div className="text-center space-y-2">
				<h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground leading-tight">
					{question.question}
				</h2>
				{question.description && (
					<p className="text-muted-foreground text-base md:text-lg">
						{question.description}
					</p>
				)}
			</div>

			{/* Options Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
				<AnimatePresence>
					{question.options.map((option, index) => (
						<motion.button
							key={option.id}
							custom={index}
							variants={optionVariants}
							initial={shouldReduceMotion ? undefined : 'hidden'}
							animate={shouldReduceMotion ? {} : 'visible'}
							whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
							whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
							onClick={() => onAnswer(option.value)}
							className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-brand-primary/50 rounded-2xl p-4 md:p-5 text-left transition-all hover:shadow-lg hover:shadow-brand-primary/10"
						>
							{/* Hover Background Gradient */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
								initial={false}
								animate={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
								transition={{ duration: 0.2 }}
							/>

							{/* Content */}
							<div className="relative flex items-center gap-3 md:gap-4">
								{/* Icon */}
								{option.icon && (
									<motion.span
										animate={shouldReduceMotion ? {} : {
											scale: [1, 1.1, 1],
											rotate: [0, 5, 0]
										}}
										transition={{
											duration: 0.4,
											repeat: 0,
											ease: 'easeInOut'
										}}
										whileHover={shouldReduceMotion ? {} : { scale: 1.2, rotate: 10 }}
										className="text-2xl md:text-3xl"
									>
										{option.icon}
									</motion.span>
								)}

								<div className="flex-1">
									<motion.div
										className="font-semibold text-foreground text-base md:text-lg"
										whileHover={shouldReduceMotion ? {} : { x: 2 }}
									>
										{option.label}
									</motion.div>
									{option.description && (
										<motion.div
											className="text-sm text-muted-foreground mt-0.5"
											initial={false}
											animate={{ opacity: 0.7 }}
											whileHover={{ opacity: 1 }}
										>
											{option.description}
										</motion.div>
									)}
								</div>

								{/* Selection Indicator */}
								<motion.div
									className="w-2 h-2 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100"
									animate={{ scale: [0, 1] }}
									transition={{ duration: 0.2 }}
								/>
							</div>

							{/* Border Animation on Hover */}
							<motion.div
								className="absolute inset-0 border-2 border-brand-primary rounded-2xl"
								initial={false}
								animate={{ opacity: 0 }}
								whileHover={{ opacity: 0.3 }}
								transition={{ duration: 0.2 }}
								style={{ pointerEvents: 'none' }}
							/>
						</motion.button>
					))}
				</AnimatePresence>
			</div>

			{/* Tip */}
			<div className="text-center text-sm text-muted-foreground pt-2">
				💡 Scegli l&apos;opzione che ti rappresenta di più
			</div>
		</motion.div>
	)
}

export default QuizQuestionComponent