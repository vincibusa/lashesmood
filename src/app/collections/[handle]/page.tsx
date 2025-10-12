import React from 'react'
import { notFound } from 'next/navigation'
import CollectionHero from '@/components/collections/collection-hero'
import ProductsGrid from '@/components/collections/products-grid'
import PressGoDescription from '@/components/collections/press-go-description'
import { getFeaturedProducts } from '@/lib/shopify'

interface CollectionPageProps {
	params: Promise<{ handle: string }>
}

export default async function CollectionPage({ params }: CollectionPageProps) {
	const { handle } = await params

	// For demo purposes, use featured products for all collections
	const products = await getFeaturedProducts()

	// Mock collection data based on ciglissime.com
	const collections = {
		'press-go-kit-completo': {
			title: 'Starter Kit Press&GO!',
			description: 'Starter Kit Completo',
			image: '/images/collection-hero.jpg',
			products: products,
		},
		regular: {
			title: 'Kit Regular',
			description: 'Kit completi con Bond&Seal per una durata maggiore',
			image: '/images/regular-hero.jpg',
			products: products,
		},
		accessori: {
			title: 'Accessori',
			description: 'Pinze, piegaciglia e accessori per le tue Ciglissime',
			image: '/images/accessories-hero.jpg',
			products: products.slice(0, 2),
		},
	}

	const collection = collections[handle as keyof typeof collections]

	if (!collection) {
		notFound()
	}

	return (
		<div className="min-h-screen">
			<CollectionHero
				title={collection.title}
				description={collection.description}
				image={collection.image}
			/>
			<ProductsGrid products={collection.products} />
			{handle === 'press-go-kit-completo' && <PressGoDescription />}
		</div>
	)
}