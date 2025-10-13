import React from 'react'
import { notFound } from 'next/navigation'
import CollectionHero from '@/components/collections/collection-hero'
import ProductsGrid from '@/components/collections/products-grid'
import PressGoDescription from '@/components/collections/press-go-description'
import { getCollectionByHandle } from '@/lib/shopify'
import { CiglissimeProduct } from '@/types/shopify'

interface CollectionPageProps {
	params: Promise<{ handle: string }>
}

export default async function CollectionPage({ params }: CollectionPageProps) {
	const { handle } = await params

	// Fetch the real collection from Shopify
	const collection = await getCollectionByHandle(handle)

	if (!collection) {
		notFound()
	}

	// Get products from collection (already transformed to CiglissimeProduct in getCollectionByHandle)
	const products = collection.products.edges.map(({ node }) => node) as CiglissimeProduct[]

	// Use collection image or fallback to first product image
	const heroImage = collection.image?.url || products[0]?.images?.[0]?.url || '/images/placeholder.jpg'

	return (
		<div className="min-h-screen">
			<CollectionHero
				title={collection.title}
				description={collection.description || `Scopri tutti i prodotti della collezione ${collection.title}`}
				image={heroImage}
			/>
			<ProductsGrid products={products} />
			{handle === 'press-go-kit-completo' && <PressGoDescription />}
		</div>
	)
}