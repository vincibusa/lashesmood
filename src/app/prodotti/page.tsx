import React from 'react'
import { getProducts } from '@/lib/shopify'
import ProductsGrid from '@/components/collections/products-grid'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { motion } from 'framer-motion'

export default async function ProdottiPage() {
	const products = await getProducts(250) // Get all products (max 250)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="section-padding bg-gradient-to-br from-brand-light to-white">
				<div className="container-custom text-center">
					<ScrollReveal>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ type: 'spring', damping: 20 }}
							className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
						>
							Tutti i <span className="text-brand-primary">Prodotti</span>
						</motion.h1>
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
						>
							Scopri la nostra collezione completa di extension ciglia magnetiche
						</motion.p>
					</ScrollReveal>
				</div>
			</section>

			{/* Products Grid */}
			<ProductsGrid products={products} />
		</div>
	)
}

