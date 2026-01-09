import React from 'react'
import { LashesmoodProduct } from '@/types/shopify'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Check } from 'lucide-react'

interface ProductDescriptionProps {
	product: LashesmoodProduct
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
	// Default benefits and kit contents if not provided
	const benefits = product.benefits || [
		'Applicazione facile e veloce',
		'Lunga durata',
		'Aspetto naturale',
		'Riutilizzabili',
	]

	const kitContents = product.kitContents || [
		'Ciglia Press&GO',
		'Applicatore',
		'Istruzioni dettagliate',
	]

	return (
		<section className="section-padding bg-gradient-to-br from-brand-light to-white">
			<div className="container-custom max-w-5xl">
				{/* Description */}
				<ScrollReveal>
					<div className="mb-12">
						<h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
							Descrizione
						</h2>
						<p className="text-lg leading-relaxed text-muted-foreground">{product.description}</p>
					</div>
				</ScrollReveal>

				<div className="grid md:grid-cols-2 gap-6 md:gap-8">
					{/* Vantaggi */}
					<ScrollReveal>
						<Card className="bg-white border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
							<CardContent className="p-6">
								<h3 className="font-playfair text-2xl font-bold text-foreground mb-6">Vantaggi</h3>
								<ul className="space-y-4">
									{benefits.map((benefit, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
												<Check className="h-3 w-3 text-brand-primary" />
											</div>
											<span className="text-muted-foreground leading-relaxed">{benefit}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</ScrollReveal>

					{/* Cosa trovi nel Kit */}
					{product.isKit && (
						<ScrollReveal>
							<Card className="bg-white border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
								<CardContent className="p-6">
									<h3 className="font-playfair text-2xl font-bold text-foreground mb-6">Cosa trovi nel Kit</h3>
									<ul className="space-y-4">
										{kitContents.map((item, index) => (
											<li key={index} className="flex items-start gap-3">
												<div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
													<Check className="h-3 w-3 text-brand-primary" />
												</div>
												<span className="text-muted-foreground leading-relaxed">{item}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</ScrollReveal>
					)}
				</div>

				{/* Ingredienti */}
				{product.ingredients && (
					<ScrollReveal>
						<Card className="bg-white border border-border/50 rounded-2xl shadow-sm mt-8">
							<CardContent className="p-6">
								<h3 className="font-playfair text-2xl font-bold text-foreground mb-4">Ingredienti</h3>
								<p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
							</CardContent>
						</Card>
					</ScrollReveal>
				)}
			</div>
		</section>
	)
}

export default ProductDescription

