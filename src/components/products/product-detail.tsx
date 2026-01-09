'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Truck, Shield, HeadphonesIcon, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { LashesmoodProduct } from '@/types/shopify'
import { formatPrice, formatDiscount } from '@/lib/utils'
import { useCart } from '@/context/cart-context'

interface ProductDetailProps {
	product: LashesmoodProduct
}

const ProductDetail = ({ product }: ProductDetailProps) => {
	const [isAdding, setIsAdding] = useState(false)
	const { addToCart } = useCart()
	const originalPrice = product.compareAtPriceRange?.minVariantPrice.amount
	const salePrice = product.priceRange.minVariantPrice.amount
	const hasDiscount =
		originalPrice && parseFloat(originalPrice) > parseFloat(salePrice)
	const discountPercentage = hasDiscount
		? formatDiscount(parseFloat(originalPrice!), parseFloat(salePrice))
		: 0

	const customerReview = {
		name: 'Denise',
		text: "È già il secondo acquisto, le prime sono state le Clean Girl ed ogni applicazione è arrivata a durarmi anche due settimane, per cui soddisfatta ho deciso di provare un altro modello un po' più voluminoso, le Glamour Black. Le adoro",
		rating: 5,
		verified: true,
	}

	const handleAddToCart = async () => {
		// Get the first available variant
		const firstVariant = product.variants[0]
		if (!firstVariant) {
			console.error('No variants available for product:', product.title)
			return
		}

		try {
			setIsAdding(true)
			await addToCart(firstVariant.id, 1)
		} catch (error) {
			console.error('Error adding product to cart:', error)
		} finally {
			setIsAdding(false)
		}
	}

	return (
		<section className="section-padding">
			<div className="container-custom">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Product Images */}
					<div className="space-y-4">
						{/* Main Image */}
						<div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
							{product.images[0] && (
								<Image
									src={product.images[0].url}
									alt={product.images[0].altText || product.title}
									width={600}
									height={600}
									className="w-full h-full object-cover"
									priority
								/>
							)}
						</div>

						{/* Thumbnail Images */}
						<div className="grid grid-cols-4 gap-3">
							{product.images.slice(0, 4).map((image, index) => (
								<div
									key={image.id}
									className="aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer hover:opacity-80 transition-all hover:scale-105 border-2 border-transparent hover:border-brand-primary/30"
								>
									<Image
										src={image.url}
										alt={image.altText || `${product.title} ${index + 1}`}
										width={150}
										height={150}
										className="w-full h-full object-cover"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						{/* Breadcrumb */}
						<nav className="text-sm text-gray-500">
							<Link href="/" className="hover:text-brand-primary">
								Home
							</Link>
							<span className="mx-2">/</span>
							<Link
								href="/collections/press-go-kit-completo"
								className="hover:text-brand-primary"
							>
								Press&GO!
							</Link>
							<span className="mx-2">/</span>
							<span className="text-gray-900">{product.title}</span>
						</nav>

						{/* Vendor */}
						<Link href={`/collections/vendors?q=${product.vendor}`}>
							<p className="text-brand-primary font-medium hover:underline">
								{product.vendor}
							</p>
						</Link>

						{/* Rating */}
						<div className="flex items-center space-x-4">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${
											i < Math.floor(product.rating)
												? 'fill-yellow-400 text-yellow-400'
												: 'text-gray-300'
										}`}
									/>
								))}
							</div>
							<span className="text-sm text-gray-600">
								{product.rating}/5 ({product.reviewCount.toLocaleString()}{' '}
								Recensioni)
							</span>
						</div>

						{/* Product Title */}
						<h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight">
							{product.title}
						</h1>

						{/* Price */}
						<div className="flex items-baseline gap-4 pt-2">
							<span className="font-playfair text-4xl font-bold text-brand-primary">
								{formatPrice(parseFloat(salePrice), '€')}
							</span>
							{hasDiscount && (
								<>
									<span className="text-xl text-muted-foreground line-through">
										{formatPrice(parseFloat(originalPrice!), '€')}
									</span>
									<Badge className="bg-red-500 text-white font-bold px-3 py-1">
										-{discountPercentage}%
									</Badge>
								</>
							)}
						</div>

						{/* Customer Review Highlight */}
						{customerReview && (
							<Card className="bg-gradient-to-br from-brand-light to-white border border-brand-primary/20 rounded-2xl shadow-sm">
								<CardContent className="p-6">
									<div className="flex items-center gap-3 mb-3">
										<div className="flex">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className="h-4 w-4 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>
										<span className="font-playfair font-semibold text-foreground">
											{customerReview.name}
										</span>
									</div>
									<p className="text-sm text-muted-foreground italic leading-relaxed">
										&quot;{customerReview.text}&quot;
									</p>
								</CardContent>
							</Card>
						)}

						{/* Countdown Timer */}
						<div className="bg-red-50 border border-red-200 rounded-xl p-4">
							<div className="flex items-center gap-2 text-red-600">
								<Clock className="h-5 w-5" />
								<span className="font-medium">
									L&apos;offerta termina in 09:56:43
								</span>
							</div>
						</div>

						{/* Add to Cart */}
						<Button 
							size="lg" 
							className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
							onClick={handleAddToCart}
							disabled={isAdding}
						>
							<ShoppingBag className="h-5 w-5 mr-2" />
							{isAdding ? 'Aggiunta in corso...' : 'Aggiungi al carrello'}
						</Button>

						{/* Trust Badges */}
						<div className="grid grid-cols-2 gap-4 pt-2">
							<div className="flex items-start gap-3 p-4 bg-white border border-border/50 rounded-xl hover:shadow-md transition-shadow">
								<Truck className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
								<div>
									<p className="font-semibold text-sm text-foreground">
										il Kit lo acquisti una volta sola!
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3 p-4 bg-white border border-border/50 rounded-xl hover:shadow-md transition-shadow">
								<Shield className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
								<div>
									<p className="font-semibold text-sm text-foreground">Paga anche alla consegna</p>
								</div>
							</div>
							<div className="flex items-start gap-3 p-4 bg-white border border-border/50 rounded-xl hover:shadow-md transition-shadow">
								<Shield className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
								<div>
									<p className="font-semibold text-sm text-foreground">Garanzia di rimborso 15gg</p>
								</div>
							</div>
							<div className="flex items-start gap-3 p-4 bg-white border border-border/50 rounded-xl hover:shadow-md transition-shadow">
								<HeadphonesIcon className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
								<div>
									<p className="font-semibold text-sm text-foreground">Assistenza 24/7</p>
								</div>
							</div>
						</div>

						{/* Shipping Info */}
						<div className="bg-green-50 border border-green-200 rounded-xl p-4">
							<p className="text-green-700 font-medium">
								Pronto da spedire - Arrivo previsto gio 2 ottobre
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductDetail

