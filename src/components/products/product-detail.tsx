import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Truck, Shield, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ShopifyProduct } from '@/types/shopify'
import { formatPrice, formatDiscount } from '@/lib/utils'

interface ProductDetailProps {
	product: ShopifyProduct
}

const ProductDetail = ({ product }: ProductDetailProps) => {
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

	return (
		<section className="section-padding">
			<div className="container-custom">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Images */}
					<div className="space-y-4">
						{/* Main Image */}
						<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
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
						<div className="grid grid-cols-4 gap-2">
							{product.images.slice(0, 4).map((image, index) => (
								<div
									key={image.id}
									className="aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
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
						<h1 className="text-3xl font-bold text-gray-900">
							{product.title}
						</h1>

						{/* Price */}
						<div className="flex items-baseline space-x-4">
							<span className="text-3xl font-bold text-gray-900">
								{formatPrice(parseFloat(salePrice), '€')}
							</span>
							{hasDiscount && (
								<>
									<span className="text-xl text-gray-500 line-through">
										{formatPrice(parseFloat(originalPrice!), '€')}
									</span>
									<Badge variant="destructive" className="bg-red-500">
										-{discountPercentage}%
									</Badge>
								</>
							)}
						</div>

						{/* Customer Review Highlight */}
						{customerReview && (
							<Card className="bg-brand-light border-brand-primary/20">
								<CardContent className="p-4">
									<div className="flex items-center space-x-2 mb-2">
										<div className="flex">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className="h-3 w-3 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>
										<span className="text-sm font-medium">
											{customerReview.name}
										</span>
									</div>
									<p className="text-sm text-gray-700 italic">
										&quot;{customerReview.text}&quot;
									</p>
								</CardContent>
							</Card>
						)}

						{/* Countdown Timer */}
						<div className="bg-red-50 border border-red-200 rounded-lg p-4">
							<div className="flex items-center space-x-2 text-red-600">
								<Clock className="h-5 w-5" />
								<span className="font-medium">
									L&apos;offerta termina in 09:56:43
								</span>
							</div>
						</div>

						{/* Add to Cart */}
						<Button size="lg" className="w-full btn-primary text-lg py-4">
							Aggiungi al carrello
						</Button>

						{/* Trust Badges */}
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div className="flex items-center space-x-2">
								<Truck className="h-5 w-5 text-brand-primary" />
								<div>
									<p className="font-medium">
										il Kit lo acquisti una volta sola!
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Shield className="h-5 w-5 text-brand-primary" />
								<div>
									<p className="font-medium">Paga anche alla consegna</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Shield className="h-5 w-5 text-brand-primary" />
								<div>
									<p className="font-medium">Garanzia di rimborso 15gg</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<HeadphonesIcon className="h-5 w-5 text-brand-primary" />
								<div>
									<p className="font-medium">Assistenza 24/7</p>
								</div>
							</div>
						</div>

						{/* Shipping Info */}
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
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

