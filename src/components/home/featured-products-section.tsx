import React from 'react'
import ProductCard from '@/components/product-card'
import { LashesmoodProduct } from '@/types/shopify'

interface FeaturedProductsSectionProps {
	products: LashesmoodProduct[]
}

const FeaturedProductsSection = ({ products }: FeaturedProductsSectionProps) => {
	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.slice(0, 4).map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	)
}

export default FeaturedProductsSection

