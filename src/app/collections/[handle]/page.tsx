import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CollectionHero from '@/components/collections/collection-hero'
import ProductsGrid from '@/components/collections/products-grid'
import PressGoDescription from '@/components/collections/press-go-description'
import { getCollectionByHandle } from '@/lib/shopify'
import { LashesmoodProduct } from '@/types/shopify'

interface CollectionPageProps {
	params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
	const { handle } = await params
	const collection = await getCollectionByHandle(handle)

	if (!collection) {
		return {
			title: 'Collezione non trovata | Lashesmood',
		}
	}

	const canonicalUrl = `https://lashesmood.com/collections/${handle}`
	const imageUrl = collection.image?.url

	return {
		title: `${collection.title} | Lashesmood`,
		description: collection.description?.slice(0, 160) || `Scopri tutti i prodotti della collezione ${collection.title} su Lashesmood`,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: collection.title,
			description: collection.description?.slice(0, 160) || `Scopri tutti i prodotti della collezione ${collection.title}`,
			type: 'website',
			locale: 'it_IT',
			url: canonicalUrl,
			siteName: 'Lashesmood',
			images: imageUrl ? [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: collection.title,
				}
			] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title: collection.title,
			description: collection.description?.slice(0, 160),
			images: imageUrl ? [imageUrl] : [],
		},
	}
}

export default async function CollectionPage({ params }: CollectionPageProps) {
	const { handle } = await params

	// Fetch the real collection from Shopify
	const collection = await getCollectionByHandle(handle)

	if (!collection) {
		notFound()
	}

	// Get products from collection (already transformed to LashesmoodProduct in getCollectionByHandle)
	const products = collection.products.edges.map(({ node }) => node) as LashesmoodProduct[]

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