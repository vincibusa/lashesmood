import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/products/product-detail'
import ProductFAQ from '@/components/products/product-faq'
import RelatedProducts from '@/components/products/related-products'
import { getProductByHandle, getFeaturedProducts } from '@/lib/shopify'

interface ProductPageProps {
	params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const { handle } = await params
	const product = await getProductByHandle(handle)

	if (!product) {
		return {
			title: 'Prodotto non trovato | Lashesmood',
		}
	}

	const canonicalUrl = `https://lashesmood.com/products/${handle}`
	const imageUrl = product.images[0]?.url

	return {
		title: `${product.title} | Lashesmood`,
		description: product.description.slice(0, 160),
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: product.title,
			description: product.description.slice(0, 160),
			type: 'website',
			locale: 'it_IT',
			url: canonicalUrl,
			siteName: 'Lashesmood',
			images: imageUrl ? [
				{
					url: imageUrl,
					width: 1200,
					height: 1200,
					alt: product.title,
				}
			] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title: product.title,
			description: product.description.slice(0, 160),
			images: imageUrl ? [imageUrl] : [],
		},
	}
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { handle } = await params
	const product = await getProductByHandle(handle)
	const relatedProducts = await getFeaturedProducts()

  if (!product) {
		notFound()
	}

  return (
    <div className="min-h-screen">
			<ProductDetail product={product} />
			<ProductFAQ />
			<RelatedProducts products={relatedProducts} />
              </div>
	)
}