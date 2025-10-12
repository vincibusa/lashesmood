import React from 'react'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/products/product-detail'
import ProductDescription from '@/components/products/product-description'
import ProductSocialShare from '@/components/products/product-social-share'
import ProductFAQ from '@/components/products/product-faq'
import RelatedProducts from '@/components/products/related-products'
import { getProductByHandle, getFeaturedProducts } from '@/lib/shopify'

interface ProductPageProps {
	params: Promise<{ handle: string }>
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
			<ProductDescription product={product} />
			<ProductSocialShare />
			<ProductFAQ />
			<RelatedProducts products={relatedProducts} />
              </div>
	)
}