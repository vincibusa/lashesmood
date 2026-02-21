import React from 'react'
import { Card } from '@/components/ui/card'
import { Droplets, Shield, Star, Clock, LucideIcon } from 'lucide-react'
import type { ProductType } from '@/components/come-funziona/types'

interface Tip {
	icon: LucideIcon
	title: string
	description: string
	forType: 'all' | 'press-go' | 'regular'
}

const ALL_TIPS: Tip[] = [
	{
		icon: Droplets,
		title: 'Applica solo su ciglia pulite e struccate',
		description:
			'Applica le Extension solo su ciglia pulite, asciutte e senza makeup. Inoltre evita prodotti oleosi sugli occhi.',
		forType: 'all',
	},
	{
		icon: Shield,
		title: 'Applica poco Bond',
		description:
			'Non utilizzare MAI troppo prodotto :) e usa il bond solo sulla base delle ciglia naturali',
		forType: 'regular',
	},
	{
		icon: Star,
		title: 'Posizionamento corretto',
		description:
			'Applica le ciglia Regular 1-2 mm lontano dalla rima cigliare. Mentre le Press&GO applicale sulla rima cigliare',
		forType: 'all',
	},
	{
		icon: Clock,
		title: "Prediligi l'applicazione di mattina",
		description:
			"Prediligi la mattina come orario di applicazione, questo ti permetterà di avere più tempo di asciugatura",
		forType: 'all',
	},
]

function filterTips(productType: ProductType): Tip[] {
	if (productType === 'all') return ALL_TIPS
	return ALL_TIPS.filter(
		(t) => t.forType === 'all' || t.forType === productType
	)
}

interface TipsSectionProps {
	productType: ProductType
}

const TipsSection = ({ productType }: TipsSectionProps) => {
	const tips = filterTips(productType)

	return (
		<section id="consigli" className="section-padding bg-brand-light" aria-labelledby="consigli-title">
			<div className="container-custom">
				<h2 id="consigli-title" className="text-3xl font-bold text-center mb-12">
					Consigli per una{' '}
					<em className="italic text-brand-primary">maggior durata</em>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{tips.map((tip, index) => {
						const Icon = tip.icon
						return (
							<Card
								key={index}
								className="p-6 rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
							>
								<div className="flex items-start gap-4">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary font-bold text-sm">
										{index + 1}
									</div>
									<div className="min-w-0 flex-1">
										<h3 className="font-bold text-lg mb-2 flex items-center gap-2">
											<Icon className="h-5 w-5 shrink-0 text-brand-primary" aria-hidden />
											{tip.title}
										</h3>
										<p className="text-muted-foreground leading-relaxed">{tip.description}</p>
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

