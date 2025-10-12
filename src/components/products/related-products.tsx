import React from 'react'
import ProductCard from '@/components/product-card'
import { ShopifyProduct } from '@/types/shopify'

interface RelatedProductsProps {
	products: ShopifyProduct[]
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<h2 className="text-2xl font-bold text-center mb-8">
					Altri prodotti che potrebbero interessarti
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.slice(0, 4).map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	)
}

export default RelatedProducts

