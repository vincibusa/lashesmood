'use client'

import React from 'react'
import { LashesmoodProduct } from '@/types/shopify'

interface ProductSchemaProps {
  product: LashesmoodProduct
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const price = product.priceRange.minVariantPrice.amount
  const currency = product.priceRange.minVariantPrice.currencyCode
  const originalPrice = product.compareAtPriceRange?.minVariantPrice.amount
  const imageUrl = product.images[0]?.url
  const productUrl = `https://lashesmood.com/products/${product.handle}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description.slice(0, 160),
    image: imageUrl,
    url: productUrl,
    sku: product.variants[0]?.id || product.id,
    brand: {
      '@type': 'Brand',
      name: product.vendor || 'Lashesmood',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: currency,
      price: price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.variants[0]?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Lashesmood',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
