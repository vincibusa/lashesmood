/**
 * Types for the Style Quiz feature
 * Guida i clienti verso il prodotto perfetto basato sulle loro preferenze
 */

export type QuizOccasion = 'daily' | 'evening' | 'special' | 'wedding'
export type QuizEffect = 'natural' | 'dramatic' | 'lengthening' | 'volume'
export type QuizExperience = 'first' | 'some' | 'expert'

export interface QuizQuestion {
	id: number
	type: 'occasion' | 'effect' | 'experience'
	question: string
	description?: string
	options: QuizOption[]
}

export interface QuizOption {
	id: string
	label: string
	description?: string
	icon?: string
	value: QuizOccasion | QuizEffect | QuizExperience
}

export interface QuizAnswers {
	occasion?: QuizOccasion
	effect?: QuizEffect
	experience?: QuizExperience
}

export interface QuizResult {
	title: string
	description: string
	recommendations: ProductRecommendation[]
	emoji: string
	tip: string
}

export interface ProductRecommendation {
	productId: string
	name: string
	reason: string
	category: string
}

export interface QuizState {
	currentQuestion: number
	answers: QuizAnswers
	isComplete: boolean
	isOpen: boolean
}