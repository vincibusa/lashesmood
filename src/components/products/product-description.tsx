import React from 'react'
import { CiglissimeProduct } from '@/types/shopify'

interface ProductDescriptionProps {
	product: CiglissimeProduct
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
		<section className="section-padding bg-white">
			<div className="container-custom max-w-4xl">
				<div className="prose prose-lg max-w-none">
					<p className="text-lg leading-relaxed mb-6">{product.description}</p>

					<div className="grid md:grid-cols-2 gap-8 mt-8">
						{/* Vantaggi */}
						<div>
							<h3 className="text-xl font-bold mb-4">Vantaggi</h3>
							<ul className="space-y-2">
								{benefits.map((benefit, index) => (
									<li key={index} className="flex items-start space-x-2">
										<span className="text-brand-primary">•</span>
										<span>{benefit}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Cosa trovi nel Kit */}
						{product.isKit && (
							<div>
								<h3 className="text-xl font-bold mb-4">Cosa trovi nel Kit</h3>
								<ul className="space-y-2">
									{kitContents.map((item, index) => (
										<li key={index} className="flex items-start space-x-2">
											<span className="text-brand-primary">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Ingredienti */}
					{product.ingredients && (
						<div className="mt-8">
							<h3 className="text-xl font-bold mb-4">Ingredienti</h3>
							<p className="text-gray-700">{product.ingredients}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default ProductDescription

