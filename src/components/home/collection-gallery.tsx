'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import Link from 'next/link'
import { ShopifyCollection } from '@/types/shopify'

interface CollectionItem {
	id: string
	name: string
	description: string
	imageSrc: string
	alt: string
	collection: string
	link: string
}

interface CollectionGalleryProps {
	collections: ShopifyCollection[]
}

const ParallaxImage = ({ item, index }: { item: CollectionItem; index: number }) => {
	const shouldReduceMotion = useReducedMotion()
	const ref = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start']
	})

	// Parallax effect - different speeds for different items
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		shouldReduceMotion ? [0, 0] : [0, (index % 2 === 0 ? -60 : 60)]
	)

	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1])

	const [isHovered, setIsHovered] = React.useState(false)

	return (
		<motion.div
			ref={ref}
			initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{
				type: 'spring',
				stiffness: 150,
				damping: 20,
				delay: shouldReduceMotion ? 0 : index * 0.15
			}}
			className="group relative overflow-hidden rounded-2xl aspect-[3/4] md:aspect-square cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				style={{ y, scale }}
				className="absolute inset-0"
				transition={{ type: 'spring', stiffness: 100, damping: 30 }}
			>
				<Image
					src={item.imageSrc}
					alt={item.alt}
					fill
					sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
					className="object-cover transition-transform duration-700 group-hover:scale-110"
					priority={index < 2}
				/>

				{/* Gradient Overlay */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? 1 : 0.6,
					}}
					className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
				/>

				{/* Animated Border Glow */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? [0, 0.5, 0] : 0,
					}}
					transition={{
						duration: 1.5,
						repeat: isHovered ? Infinity : 0,
						repeatDelay: 1
					}}
					className="absolute inset-0 border-4 border-brand-primary/50 rounded-2xl pointer-events-none"
					style={{ opacity: 0 }}
				/>
			</motion.div>

			{/* Content Overlay */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					y: isHovered ? 0 : 20,
					opacity: isHovered ? 1 : 0
				}}
				className="absolute bottom-0 left-0 right-0 p-6 text-white z-10"
			>
				<motion.div
					animate={shouldReduceMotion ? {} : {
						scale: isHovered ? 1.05 : 1,
					}}
					transition={{ type: 'spring', stiffness: 300, damping: 15 }}
				>
					<p className="text-xs font-bold uppercase tracking-wider mb-1 text-brand-secondary">
						{item.collection}
					</p>
					<h3 className="font-playfair font-bold text-xl md:text-2xl mb-2 leading-tight">
						{item.name}
					</h3>
					<p className="text-sm text-gray-200 line-clamp-2 mb-3">
						{item.description}
					</p>

					<motion.div
						animate={shouldReduceMotion ? {} : {
							x: isHovered ? [0, 5, 0] : 0,
							opacity: isHovered ? 1 : 0
						}}
						className="flex items-center gap-2 text-sm font-semibold text-brand-secondary"
					>
						Scopri di più
						<ArrowRight className="h-4 w-4" />
					</motion.div>
				</motion.div>
			</motion.div>

			{/* Hover Indicator - Mobile Only */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					opacity: isHovered ? 1 : 0,
					scale: isHovered ? 1.1 : 0.9
				}}
				className="md:hidden absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full"
			>
				<ShoppingBag className="h-5 w-5 text-brand-primary" />
			</motion.div>
		</motion.div>
	)
}

interface FeaturedCollectionBannerProps {
	collection: ShopifyCollection | null
}

const FeaturedCollectionBanner = ({ collection }: FeaturedCollectionBannerProps) => {
	const shouldReduceMotion = useReducedMotion()

	if (!collection) {
		return null
	}

	// Get image: prefer collection image, fallback to first product image
	const collectionImage = collection.image?.url
	// Handle both raw and transformed product formats
	const firstProduct = collection.products?.edges?.[0]?.node as any
	const firstProductImage = firstProduct?.images?.[0]?.url || 
		firstProduct?.images?.edges?.[0]?.node?.url
	const imageSrc = collectionImage || firstProductImage || '/images/placeholder.png'
	
	// Extract description (remove HTML tags if present)
	const description = collection.description
		? collection.description.replace(/<[^>]*>/g, '').substring(0, 150)
		: 'Scopri la collezione che ha conquistato tutte.'

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ type: 'spring', stiffness: 200, damping: 20 }}
			className="relative overflow-hidden rounded-3xl bg-lashesmood-gradient p-8 md:p-12 text-white"
		>
			{/* Animated Background Pattern */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					opacity: [0.1, 0.2, 0.1],
					rotate: [0, 5, 0]
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
					backgroundSize: '40px 40px'
				}}
			/>

			<div className="relative z-10 max-w-2xl">
				<motion.p
					initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className="text-sm font-bold uppercase tracking-widest mb-2 text-brand-secondary"
				>
					Nuova Collezione
				</motion.p>
				<motion.h3
					initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
				>
					{collection.title}
				</motion.h3>
				<motion.p
					initial={shouldReduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="text-lg md:text-xl mb-6 text-white/90"
				>
					{description}
				</motion.p>
				<motion.div
					initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
				>
					<Button
						asChild
						size="lg"
						className="bg-white text-brand-primary hover:bg-brand-secondary font-semibold shadow-xl hover:shadow-2xl transition-all"
					>
						<Link href={`/collections/${collection.handle}`}>
							Scopri la collezione
							<ArrowRight className="h-5 w-5 ml-2" />
						</Link>
					</Button>
				</motion.div>
			</div>

			{/* Floating Product Image (Desktop Only) */}
			{imageSrc && (
				<motion.div
					animate={shouldReduceMotion ? {} : {
						y: [0, -15, 0],
						rotate: [0, 5, 0]
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						repeatDelay: 1,
						ease: 'easeInOut'
					}}
					className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
				>
					<Image
						src={imageSrc}
						alt={collection.image?.altText || collection.title}
						fill
						sizes="192px"
						className="object-cover"
					/>
				</motion.div>
			)}
		</motion.div>
	)
}

const CollectionGallery = ({ collections: shopifyCollections }: CollectionGalleryProps) => {
	const shouldReduceMotion = useReducedMotion()

	// Transform Shopify collections to CollectionItem format
	const collections: CollectionItem[] = shopifyCollections
		.filter((collection) => {
			// Filter out collections without images or products
			const hasImage = collection.image?.url
			// Check if products have images (handle raw format from GraphQL)
			const firstProduct = collection.products?.edges?.[0]?.node as any
			const hasProductImage = firstProduct?.images?.edges?.[0]?.node?.url ||
				firstProduct?.images?.[0]?.url // Fallback for transformed format
			return hasImage || hasProductImage
		})
		.slice(0, 4) // Limit to 4 collections for the gallery
		.map((collection) => {
			// Get image: prefer collection image, fallback to first product image
			const collectionImage = collection.image?.url
			// Handle raw format from GraphQL (images.edges[].node)
			const firstProduct = collection.products?.edges?.[0]?.node as any
			const firstProductImage = firstProduct?.images?.edges?.[0]?.node?.url ||
				firstProduct?.images?.[0]?.url // Fallback for transformed format
			const imageSrc = collectionImage || firstProductImage || '/images/placeholder.png'
			
			// Get alt text
			const altText = collection.image?.altText || collection.title || 'Collection image'
			
			// Extract description (remove HTML tags if present)
			const description = collection.description
				? collection.description.replace(/<[^>]*>/g, '').substring(0, 100)
				: 'Scopri la collezione'
			
			// Determine collection tag based on title or use a default
			const getCollectionTag = (title: string) => {
				const lowerTitle = title.toLowerCase()
				if (lowerTitle.includes('clean') || lowerTitle.includes('naturale')) return 'Best Seller'
				if (lowerTitle.includes('press') || lowerTitle.includes('go')) return 'Novità'
				if (lowerTitle.includes('drama') || lowerTitle.includes('volume')) return 'Volume'
				return 'Collezione'
			}

			return {
				id: collection.id,
				name: collection.title,
				description: description,
				imageSrc: imageSrc,
				alt: altText,
				collection: getCollectionTag(collection.title),
				link: `/collections/${collection.handle}`
			}
		})

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				{/* Header */}
				<ScrollReveal>
					<div className="text-center mb-12 md:mb-16">
						<motion.h2
							initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ type: 'spring', damping: 20 }}
							className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
						>
							Scopri le <span className="text-brand-primary">Collezioni</span>
						</motion.h2>
						<motion.p
							initial={shouldReduceMotion ? false : { opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
						>
							Dal naturale al drammatico, trova il set perfetto per te
						</motion.p>
					</div>
				</ScrollReveal>

				{/* Featured Collection Banner */}
				{shopifyCollections.length > 0 && (
					<ScrollReveal>
						<div className="mb-12 md:mb-16">
							<FeaturedCollectionBanner collection={shopifyCollections[0]} />
						</div>
					</ScrollReveal>
				)}

				{/* Collection Grid with Parallax */}
				{collections.length > 0 ? (
					<ScrollReveal>
						<motion.div
							className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.15
									}
								}
							}}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-50px' }}
						>
							{collections.map((item, index) => (
								<ParallaxImage key={item.id} item={item} index={index} />
							))}
						</motion.div>
					</ScrollReveal>
				) : (
					<div className="text-center py-12 text-muted-foreground">
						<p>Nessuna collezione disponibile al momento.</p>
					</div>
				)}

				{/* Bottom CTA */}
				<ScrollReveal>
					<motion.div
						initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ type: 'spring', stiffness: 200, damping: 15 }}
						className="mt-12 md:mt-16 text-center"
					>
						<motion.div
							animate={shouldReduceMotion ? {} : {
								y: [0, -8, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								repeatDelay: 3,
								ease: 'easeInOut'
							}}
							className="inline-block"
						>
							<Button
								asChild
								size="lg"
								className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-10 py-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
							>
								<Link href="/collections">
									Esplora tutte le collezioni
									<ArrowRight className="h-5 w-5 ml-2" />
								</Link>
							</Button>
						</motion.div>
						<p className="text-sm text-muted-foreground mt-4">
							Spedizione gratuita per ordini superiori a €50
						</p>
					</motion.div>
				</ScrollReveal>
			</div>
		</section>
	)
}

export default CollectionGallery
