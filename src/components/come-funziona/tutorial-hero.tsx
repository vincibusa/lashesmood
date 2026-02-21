import React from 'react'
import type { ProductType } from '@/components/come-funziona/types'

const TAGLINES: Record<ProductType, string> = {
	all: 'Scopri come applicare le tue ciglia semi-permanenti a casa in pochi minuti: guida, posizionamento e consigli step-by-step',
	'press-go': 'Applica in un secondo, senza colla: premi sulla rima e sei pronta. Guida e consigli per le Press&GO!',
	regular: 'Durata fino a 10 giorni con Bond&Seal. Guida al posizionamento e consigli per le Regular',
}

interface TutorialHeroProps {
	productType: ProductType
	collectionTitle?: string | null
}

const TutorialHero = ({ productType, collectionTitle }: TutorialHeroProps) => {
	return (
		<section
			className="section-padding bg-gradient-to-br from-brand-light to-white"
			aria-labelledby="come-funziona-title"
		>
			<div className="container-custom text-center">
				<h1
					id="come-funziona-title"
					className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
				>
					Come funziona{' '}
					<em className="font-playfair italic text-brand-primary">
						{collectionTitle ?? 'Lashesmood'}
					</em>
				</h1>
				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
					{TAGLINES[productType]}
				</p>
				<div
					className="mx-auto h-1 w-16 rounded-full bg-brand-primary/30"
					aria-hidden
				/>
			</div>
		</section>
	)
}

export default TutorialHero

