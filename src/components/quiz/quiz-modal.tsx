'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuizQuestion, QuizAnswers, QuizState, QuizResult, QuizOccasion, QuizEffect, QuizExperience } from '@/types/quiz'
import QuizQuestionComponent from './quiz-question'
import QuizResultComponent from './quiz-result'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface QuizModalProps {
	isOpen: boolean
	onClose: () => void
}

// Quiz Questions Data
const QUESTIONS: QuizQuestion[] = [
	{
		id: 1,
		type: 'occasion',
		question: 'Per quale occasione cerchi le ciglia?',
		description: 'Dove indosserai le tue nuove ciglia?',
		options: [
			{
				id: 'daily',
				label: 'Quotidiano',
				description: 'Perfette per ogni giorno',
				value: 'daily',
				icon: '☀️'
			},
			{
				id: 'evening',
				label: 'Serata',
				description: 'Per un look da sera',
				value: 'evening',
				icon: '🌙'
			},
			{
				id: 'special',
				label: 'Speciale',
				description: 'Eventi e occasioni speciali',
				value: 'special',
				icon: '✨'
			},
			{
				id: 'wedding',
				label: 'Matrimonio',
				description: 'Sposa o damigella',
				value: 'wedding',
				icon: '👰'
			}
		]
	},
	{
		id: 2,
		type: 'effect',
		question: 'Che effetto cerchi?',
		description: 'Il risultato che desideri ottenere',
		options: [
			{
				id: 'natural',
				label: 'Naturale',
				description: 'Effetto chic e discreto',
				value: 'natural',
				icon: '🌿'
			},
			{
				id: 'dramatic',
				label: 'Drammatico',
				description: 'Look intenso e impact',
				value: 'dramatic',
				icon: '🎭'
			},
			{
				id: 'lengthening',
				label: 'Allungante',
				description: 'Ciglia più lunghe e affusolate',
				value: 'lengthening',
				icon: '📏'
			},
			{
				id: 'volume',
				label: 'Volume',
				description: 'Più spessore e densità',
				value: 'volume',
				icon: '☁️'
			}
		]
	},
	{
		id: 3,
		type: 'experience',
		question: 'Hai già provato le ciglia magnetiche?',
		description: 'Per capire il tuo livello di comfort',
		options: [
			{
				id: 'first',
				label: 'Prima volta',
				description: 'Mai provate prima',
				value: 'first',
				icon: '👋'
			},
			{
				id: 'some',
				label: 'Qualche volta',
				description: 'Le ho provate ma non sono un esperta',
				value: 'some',
				icon: '💫'
			},
			{
				id: 'expert',
				label: 'Esperta',
				description: 'Le uso regolarmente',
				value: 'expert',
				icon: '👑'
			}
		]
	}
]

// Quiz Results Logic
const getQuizResult = (answers: QuizAnswers): QuizResult => {
	const { occasion, effect, experience } = answers

	// Logic to determine result based on answers
	if (occasion === 'wedding' && effect === 'dramatic') {
		return {
			title: 'Perfetto per il tuo gran giorno!',
			description: 'Le nostre ciglia "Bridal Glam" offrono un effetto drammatico ma elegante che dura tutto il giorno.',
			recommendations: [
				{ productId: 'bridal-glam', name: 'Bridal Glam', reason: 'Perfetto per matrimonio', category: 'Kit' },
				{ productId: 'volume-dramatic', name: 'Volume Dramatic', reason: 'Extra volume', category: 'Ciglia' }
			],
			emoji: '👰✨',
			tip: 'Prova le nostre ciglia con colla extra resistente per il giorno del matrimonio!'
		}
	}

	if (occasion === 'daily' && effect === 'natural') {
		return {
			title: 'Il tuo look quotidiano perfetto!',
			description: 'Le nostre ciglia "Daily Natural" sono leggere e comode per l\'uso quotidiano.',
			recommendations: [
				{ productId: 'daily-natural', name: 'Daily Natural', reason: 'Effetto naturale', category: 'Kit' },
				{ productId: 'soft-touch', name: 'Soft Touch', reason: 'Comfort massimo', category: 'Ciglia' }
			],
			emoji: '☀️🌿',
			tip: 'Applicale in 3 secondi per un effetto fresco ogni mattina!'
		}
	}

	if (effect === 'dramatic' && experience === 'expert') {
		return {
			title: 'Per chi cerca l\'impatto!',
			description: 'Le nostre ciglia "Drama Queen" per un look che non passa inosservato.',
			recommendations: [
				{ productId: 'drama-queen', name: 'Drama Queen', reason: 'Massimo impatto', category: 'Kit' },
				{ productId: 'volume-max', name: 'Volume Max', reason: 'Ultra volume', category: 'Ciglia' }
			],
			emoji: '🎭🔥',
			tip: 'Perfette per serate e eventi speciali. Prova il nostro trucco occhi coordinato!'
		}
	}

	if (experience === 'first') {
		return {
			title: 'Benvenuta nel mondo delle ciglia magnetiche!',
			description: 'Hai scelto il momento perfetto per iniziare. Le nostre ciglia "Easy Start" sono ideali per chi inizia.',
			recommendations: [
				{ productId: 'easy-start', name: 'Easy Start', reason: 'Facili da applicare', category: 'Kit Inizio' },
				{ productId: 'starter-kit', name: 'Starter Kit', reason: 'Tutto l\'essenziale', category: 'Kit' }
			],
			emoji: '👋💕',
			tip: 'Il nostro tutorial video ti guiderà passo dopo passo. Non preoccuparti, imparerai in 5 minuti!'
		}
	}

	// Default result
	return {
		title: 'Scopri la tua perfezione!',
		description: 'Abbiamo il set perfetto per te, basato sulle tue preferenze.',
		recommendations: [
			{ productId: 'best-seller', name: 'Best Seller', reason: 'Il preferito da tutte', category: 'Kit' }
		],
		emoji: '✨',
		tip: 'Tutte le nostre ciglia sono ipoallergeniche e cruelty-free!'
	}
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
	const [state, setState] = useState<QuizState>({
		currentQuestion: 0,
		answers: {},
		isComplete: false,
		isOpen: false
	})
	const [result, setResult] = useState<QuizResult | null>(null)
	const shouldReduceMotion = useReducedMotion()

	const [isMobile, setIsMobile] = useState(false)

	// Reset state when modal opens
	useEffect(() => {
		if (isOpen) {
			setState({
				currentQuestion: 0,
				answers: {},
				isComplete: false,
				isOpen: true
			})
			setResult(null)
		}
	}, [isOpen])

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const handleAnswer = (value: QuizOccasion | QuizEffect | QuizExperience) => {
		const currentQ = QUESTIONS[state.currentQuestion]
		const newAnswers = {
			...state.answers,
			[currentQ.type]: value
		}

		if (state.currentQuestion < QUESTIONS.length - 1) {
			setState(prev => ({
				...prev,
				currentQuestion: prev.currentQuestion + 1,
				answers: newAnswers
			}))
		} else {
			// Last question - show result
			const quizResult = getQuizResult(newAnswers)
			setResult(quizResult)
			setState(prev => ({
				...prev,
				answers: newAnswers,
				isComplete: true
			}))
		}
	}

	const handlePrevious = () => {
		if (state.currentQuestion > 0) {
			setState(prev => ({
				...prev,
				currentQuestion: prev.currentQuestion - 1
			}))
		}
	}

	const handleClose = () => {
		onClose()
		// Delay reset to allow animation
		setTimeout(() => {
			setState({
				currentQuestion: 0,
				answers: {},
				isComplete: false,
				isOpen: false
			})
			setResult(null)
		}, 300)
	}

	if (!isOpen) return null

	// Modal Variants
	const modalVariants = shouldReduceMotion ? undefined : {
		hidden: {
			opacity: 0,
			y: '100%',
			transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
		}
	}

	const desktopVariants = shouldReduceMotion ? undefined : {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, damping: 20 } }
	}

	const variants = shouldReduceMotion ? undefined : (isMobile ? modalVariants : desktopVariants)

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={handleClose}
			>
				{/* Mobile Bottom Sheet / Desktop Modal */}
				<motion.div
					className="w-full md:w-[90%] lg:w-[700px] max-h-[90vh] bg-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
					variants={variants}
					initial={shouldReduceMotion ? undefined : 'hidden'}
					animate={shouldReduceMotion ? {} : 'visible'}
					exit={shouldReduceMotion ? undefined : 'hidden'}
					onClick={(e) => e.stopPropagation()}
					style={{
						maxHeight: '90vh',
						...(isMobile ? { borderRadius: '1.5rem 1.5rem 0 0' } : { borderRadius: '1.5rem' })
					} as React.CSSProperties}
				>
					{/* Header */}
					<div className="flex items-center justify-between p-4 md:p-6 border-b border-border/50 bg-white">
						<div className="flex items-center gap-2">
							<Sparkles className="h-5 w-5 text-brand-primary" />
							<span className="font-playfair font-bold text-lg text-foreground">
								{state.isComplete ? 'Il tuo risultato' : `Quiz ${state.currentQuestion + 1}/3`}
							</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 hover:bg-gray-100"
							onClick={handleClose}
						>
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Progress Bar */}
					{!state.isComplete && (
						<div className="h-1 bg-gray-100 overflow-hidden">
							<motion.div
								className="h-full bg-brand-primary"
								initial={{ width: 0 }}
								animate={{ width: `${((state.currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
								transition={{ duration: 0.3 }}
							/>
						</div>
					)}

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
						{state.isComplete && result ? (
							<QuizResultComponent result={result} onRestart={() => {
								setState({
									currentQuestion: 0,
									answers: {},
									isComplete: false,
									isOpen: true
								})
								setResult(null)
							}} />
						) : (
							<QuizQuestionComponent
								question={QUESTIONS[state.currentQuestion]}
								onAnswer={handleAnswer}
							/>
						)}
					</div>

					{/* Footer - Navigation */}
					{!state.isComplete && (
						<div className="p-4 md:p-6 border-t border-border/50 bg-white flex justify-between items-center">
							<Button
								variant="outline"
								size="lg"
								onClick={handlePrevious}
								disabled={state.currentQuestion === 0}
								className={state.currentQuestion === 0 ? 'opacity-50' : ''}
							>
								<ChevronLeft className="h-5 w-5 mr-1" />
								Indietro
							</Button>

							<div className="text-sm text-muted-foreground">
								{state.currentQuestion + 1} di {QUESTIONS.length}
							</div>

							<Button
								size="lg"
								className="bg-brand-primary hover:bg-brand-primary/90 text-white"
								disabled={true}
							>
								Avanti
								<ChevronRight className="h-5 w-5 ml-1" />
							</Button>
						</div>
					)}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default QuizModal