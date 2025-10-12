import React from 'react'
import { Card } from '@/components/ui/card'
import { Droplets, Shield, Star, Clock, LucideIcon } from 'lucide-react'

interface Tip {
	icon: LucideIcon
	title: string
	description: string
}

const TipsSection = () => {
	const tips: Tip[] = [
		{
			icon: Droplets,
			title: 'Applica solo su ciglia pulite e struccate',
			description:
				'Applica le Extension solo su ciglia pulite, asciutte e senza makeup. Inoltre evita prodotti oleosi sugli occhi.',
		},
		{
			icon: Shield,
			title: 'Applica poco Bond',
			description:
				'Non utilizzare MAI troppo prodotto :) e usa il bond solo sulla base delle ciglia naturali',
		},
		{
			icon: Star,
			title: 'Posizionamento corretto',
			description:
				'Applica le ciglia Regular 1-2 mm lontano dalla rima cigliare. Mentre le Press&GO applicale sulla rima cigliare',
		},
		{
			icon: Clock,
			title: "Prediligi l'applicazione di mattina",
			description:
				"Prediligi la mattina come orario di applicazione, questo ti permetterà di avere più tempo di asciugatura",
		},
	]

	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				<h2 className="text-3xl font-bold text-center mb-12">
					Consigli per una{' '}
					<em className="italic text-brand-primary">maggior durata</em>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{tips.map((tip, index) => {
						const Icon = tip.icon
						return (
							<Card
								key={index}
								className="p-6 hover:shadow-lg transition-shadow duration-300"
							>
								<div className="flex items-start space-x-4">
									<div className="flex-shrink-0">
										<Icon className="h-6 w-6 text-brand-primary" />
									</div>
									<div>
										<h3 className="font-bold text-lg mb-2">{tip.title}</h3>
										<p className="text-gray-700">{tip.description}</p>
									</div>
								</div>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default TipsSection

