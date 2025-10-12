import React from 'react'

interface FeatureStepProps {
	number: number
	title: string
	description: string
}

const FeatureStep = ({ number, title, description }: FeatureStepProps) => {
	return (
		<div className="text-center">
			<div className="w-16 h-16 mx-auto mb-4 bg-brand-primary rounded-full flex items-center justify-center">
				<span className="text-white font-bold text-2xl">{number}</span>
			</div>
			<h3 className="font-bold mb-2">{title}</h3>
			<p className="text-gray-600 text-sm">{description}</p>
		</div>
	)
}

const PressGoDescription = () => {
	const features = [
		{
			number: 1,
			title: 'Sguardo WOW appena sveglia',
			description: 'Ciglia perfette 24/7 senza sforzo',
		},
		{
			number: 2,
			title: 'ADDIO COLLA E MAGNETI',
			description: 'Tecnologia adesiva innovativa',
		},
		{
			number: 3,
			title: 'Fino a 7 giorni di durata',
			description: 'Per una sera o per tutta la settimana',
		},
	]

	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom max-w-4xl text-center">
				<h2 className="text-3xl font-bold mb-6">
					Scopri la rivoluzione delle Press&amp;GO!
				</h2>
				<p className="text-lg text-gray-700 leading-relaxed mb-8">
					Stanca delle ciglia finte tradizionali che richiedono colla
					appiccicosa e troppa manualità? Scopri <strong>Press&GO</strong>,
					l&apos;innovativa soluzione per ciglia naturali e impeccabili in pochi
					secondi!
				</p>

				<div className="grid md:grid-cols-3 gap-8 mt-12">
					{features.map((feature) => (
						<FeatureStep
							key={feature.number}
							number={feature.number}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default PressGoDescription

