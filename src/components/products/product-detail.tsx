'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Truck, Shield, HeadphonesIcon, ShoppingBag, BookOpen, ChevronLeft, ChevronRight, ZoomIn, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from '@/components/ui/dialog'
import { LashesmoodProduct } from '@/types/shopify'
import { formatPrice, formatDiscount } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { ProductSchema, BreadcrumbSchema } from '@/components/seo/product-schema'

interface ProductDetailProps {
	product: LashesmoodProduct
}

const ProductDetail = ({ product }: ProductDetailProps) => {
	const [isAdding, setIsAdding] = useState(false)
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [lightboxIndex, setLightboxIndex] = useState(0)
	const { addToCart } = useCart()
	const originalPrice = product.compareAtPriceRange?.minVariantPrice.amount
	const salePrice = product.priceRange.minVariantPrice.amount
	const hasDiscount =
		originalPrice && parseFloat(originalPrice) > parseFloat(salePrice)
	const discountPercentage = hasDiscount
		? formatDiscount(parseFloat(originalPrice!), parseFloat(salePrice))
		: 0

	const images = product.images
	const openLightbox = (index: number) => {
		setLightboxIndex(index)
		setLightboxOpen(true)
	}
	const goPrev = () => setLightboxIndex((i) => (i <= 0 ? images.length - 1 : i - 1))
	const goNext = () => setLightboxIndex((i) => (i >= images.length - 1 ? 0 : i + 1))

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
		<>
			<ProductSchema product={product} />
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://lashesmood.com' },
					{ name: 'Press&GO!', url: 'https://lashesmood.com/collections/press-go-kit-completo' },
					{ name: product.title, url: `https://lashesmood.com/products/${product.handle}` },
				]}
			/>
			<section className="section-padding">
			<div className="container-custom">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Product Images */}
					<div className="space-y-4">
						{/* Main Image - click to open lightbox */}
						<div
							className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg cursor-zoom-in relative group"
							onClick={() => openLightbox(0)}
							onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
							role="button"
							tabIndex={0}
							aria-label="Apri immagine a schermo intero"
						>
							{product.images[0] && (
								<>
									<Image
										src={product.images[0].url}
										alt={product.images[0].altText || product.title}
										width={600}
										height={600}
										className="w-full h-full object-cover transition-transform group-hover:scale-105"
										priority
									/>
									<div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
										<ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" aria-hidden />
									</div>
								</>
							)}
						</div>

						{/* Thumbnail Images */}
						<div className="grid grid-cols-4 gap-3">
							{product.images.slice(0, 4).map((image, index) => (
								<div
									key={image.id}
									className="aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer hover:opacity-90 transition-all hover:scale-105 border-2 border-transparent hover:border-brand-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
									onClick={() => openLightbox(index)}
									onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
									role="button"
									tabIndex={0}
									aria-label={`Visualizza immagine ${index + 1}`}
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

					{/* Lightbox */}
					<Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
						<DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 border-0 bg-black/95 overflow-hidden [&>button]:text-white [&>button]:hover:bg-white/20 [&>button]:right-2 [&>button]:top-2">
							<DialogTitle className="sr-only">
								{product.title} - Immagine {lightboxIndex + 1}
							</DialogTitle>
							<div className="relative flex items-center justify-center min-h-[70vh] py-4">
								{images[lightboxIndex] && (
									<Image
										src={images[lightboxIndex].url}
										alt={images[lightboxIndex].altText || `${product.title} ${lightboxIndex + 1}`}
										width={1200}
										height={1200}
										className="max-h-[70vh] w-auto object-contain"
										unoptimized={false}
									/>
								)}
								{images.length > 1 && (
									<>
										<button
											type="button"
											onClick={(e) => { e.stopPropagation(); goPrev() }}
											className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
											aria-label="Immagine precedente"
										>
											<ChevronLeft className="h-8 w-8" />
										</button>
										<button
											type="button"
											onClick={(e) => { e.stopPropagation(); goNext() }}
											className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
											aria-label="Immagine successiva"
										>
											<ChevronRight className="h-8 w-8" />
										</button>
									</>
								)}
							</div>
							<p className="text-center text-white/80 text-sm pb-4">
								{lightboxIndex + 1} / {images.length}
							</p>
						</DialogContent>
					</Dialog>

					{/* Product Info */}
					<div className="space-y-6">
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

						{/* Description under title */}
						{product.description && (
							<p className="text-lg leading-relaxed text-muted-foreground">
								{product.description}
							</p>
						)}

						{/* Price */}
						<div className="flex items-baseline gap-4 pt-2">
							<span className="font-playfair text-4xl font-bold text-brand-primary">
								{formatPrice(parseFloat(salePrice), '€')}
							</span>
							{hasDiscount && (
								<>
									<span className="text-xl text-muted-foreground strike-diagonal inline-block">
										{formatPrice(parseFloat(originalPrice!), '€')}
									</span>
									<Badge className="bg-red-500 text-white font-bold px-3 py-1">
										-{discountPercentage}%
									</Badge>
								</>
							)}
						</div>

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

						{(product.category === 'press-go' || product.category === 'regular') && (
							<p className="text-center">
								<Link
									href={`/come-funziona?tipo=${product.category}`}
									className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
								>
									<BookOpen className="h-4 w-4 shrink-0" aria-hidden />
									Come si applica?
								</Link>
							</p>
						)}

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
								<HeadphonesIcon className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
								<div>
									<p className="font-semibold text-sm text-foreground">Assistenza 24/7</p>
								</div>
							</div>
						</div>

						{/* Vantaggi */}
						<div className="pt-6">
							<h3 className="font-playfair text-xl font-bold text-foreground mb-4">Vantaggi</h3>
							<ul className="space-y-3">
								{(product.benefits || [
									'Applicazione facile e veloce',
									'Lunga durata',
									'Aspetto naturale',
									'Riutilizzabili',
								]).map((benefit, index) => (
									<li key={index} className="flex items-start gap-3">
										<div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
											<Check className="h-3 w-3 text-brand-primary" />
										</div>
										<span className="text-muted-foreground text-sm leading-relaxed">{benefit}</span>
									</li>
								))}
							</ul>
						</div>

					</div>
				</div>

				{/* Accessori omaggio - primi 50 pezzi */}
				<div className="mt-16 pt-12 border-t border-border">
					<div className="max-w-2xl mx-auto text-center mb-8">
						<h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-2">
							Accessori omaggio
						</h3>
						<p className="text-muted-foreground text-sm md:text-base">
							Per i primi <strong className="text-foreground">50 pezzi</strong> venduti
							riceverai in regalo questi accessori per la cura e l’applicazione delle tue ciglia.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
						<div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
							<Image
								src={encodeURI('/FRA_9997-Modifica (1).jpg')}
								alt="Accessorio omaggio: box Lashesmood con pennello per ciglia"
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, 50vw"
							/>
						</div>
						<div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
							<Image
								src={encodeURI('/FRA_9998-Modifica (1).jpg')}
								alt="Accessorio omaggio: box Lashesmood con pinzetta"
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, 50vw"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
		</>
	)
}

export default ProductDetail

