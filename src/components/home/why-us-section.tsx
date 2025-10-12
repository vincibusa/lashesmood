import React from 'react'
import { Eye, Heart, Sparkles, Clock, LucideIcon } from 'lucide-react'

interface FeatureCardProps {
	icon: LucideIcon
	title: string
	description: string
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
	return (
		<div className="text-center group">
			<div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-all duration-300 group-hover:scale-110">
				<Icon className="h-8 w-8 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
			</div>
			<h3 className="font-bold mb-2 text-gray-900 group-hover:text-brand-primary transition-colors duration-300">
				{title}
			</h3>
			<p className="text-gray-600 text-sm leading-relaxed">{description}</p>
		</div>
	)
}

const WhyUsSection = () => {
	const features = [
		{
			icon: Eye,
			title: 'Leggere & Naturali',
			description:
				'Così comode che ti dimentichi di averle, così naturali che tutti noteranno solo il tuo sguardo.',
		},
		{
			icon: Clock,
			title: 'Applicazione in pochi secondi',
			description:
				'Zero stress, zero attese: ciglia perfette in un attimo, anche se vai sempre di corsa',
		},
		{
			icon: Sparkles,
			title: 'Come truccata, anche appena sveglia',
			description:
				'Uno sguardo sempre curato anche nei tuoi giorni più "make-up free"',
		},
		{
			icon: Heart,
			title: 'Setole in PLA',
			description:
				'Clean and natural skincare with safe and transparent ingredients',
		},
	]

	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
					Perchè Noi?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default WhyUsSection

