import React from 'react'
import { getProducts } from '@/lib/shopify'
import ProductsGrid from '@/components/collections/products-grid'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export default async function ProdottiPage() {
	const products = await getProducts(250) // Get all products (max 250)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="section-padding bg-gradient-to-br from-brand-light via-white to-brand-cream/30">
				<div className="container-custom text-center">
					<ScrollReveal>
						<h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
							Tutti i <span className="text-brand-primary">Prodotti</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Scopri la nostra collezione completa di extension ciglia magnetiche
						</p>
					</ScrollReveal>
				</div>
			</section>

			{/* Products Grid */}
			<ProductsGrid products={products} />
		</div>
	)
}

