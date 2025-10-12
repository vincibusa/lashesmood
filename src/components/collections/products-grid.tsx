import React from 'react'
import Link from 'next/link'
import ProductCard from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ShopifyProduct } from '@/types/shopify'

interface ProductsGridProps {
	products: ShopifyProduct[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
	return (
		<section className="section-padding">
			<div className="container-custom">
				{/* Filters & Sort */}
				<div className="flex items-center justify-between mb-8">
					<p className="text-gray-600">
						{products.length} prodott{products.length === 1 ? 'o' : 'i'}
					</p>
					<div className="flex items-center space-x-4">
						<Button variant="outline" size="sm">
							Filtri
						</Button>
						<Button variant="outline" size="sm">
							Ordina per
						</Button>
					</div>
				</div>

				{/* Products Grid */}
				{products.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Nessun prodotto trovato
						</h3>
						<p className="text-gray-600 mb-8">
							Non ci sono prodotti in questa collezione al momento.
						</p>
						<Button asChild>
							<Link href="/">Torna alla Home</Link>
						</Button>
					</div>
				)}
			</div>
		</section>
	)
}

export default ProductsGrid

