'use client'

import React, { useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/product-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Button } from '@/components/ui/button'
import { LashesmoodProduct } from '@/types/shopify'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface FeaturedProductsSectionProps {
	products: LashesmoodProduct[]
}

const FeaturedProductsSection = ({ products }: FeaturedProductsSectionProps) => {
	const shouldReduceMotion = useReducedMotion()
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		skipSnaps: false,
		dragFree: true,
		containScroll: 'trimSnaps',
	})

	// Limit to 4 products for featured
	const featuredProducts = products.slice(0, 4)

	// Scroll handlers for carousel
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	// Mobile: Carousel | Desktop: Grid with stagger
	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				{/* Header Section */}
				<ScrollReveal>
					<div className="flex items-end justify-between mb-8 md:mb-12">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="max-w-xl"
						>
							<h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-2">
								Prodotti in evidenza
							</h2>
							<p className="text-muted-foreground text-base md:text-lg">
								Scopri i nostri bestseller per il tuo look perfetto
							</p>
						</motion.div>

						{/* Desktop: CTA Button */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="hidden md:block"
						>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
							>
								<Link href="/collections/press-go-kit-completo">
									Vedi tutti i prodotti
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</motion.div>
					</div>
				</ScrollReveal>

				{/* Mobile: Carousel */}
				<div className="md:hidden relative">
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex gap-4 touch-pan-y">
							{featuredProducts.map((product, index) => (
								<div
									key={product.id}
									className="flex-[0_0_85%] min-w-0"
								>
									<motion.div
										initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, amount: 0.2 }}
										transition={{
											duration: 0.5,
											delay: shouldReduceMotion ? 0 : index * 0.1,
											ease: [0.22, 1, 0.36, 1]
										}}
									>
										<ProductCard product={product} className="w-full" />
									</motion.div>
								</div>
							))}
						</div>
					</div>

					{/* Carousel Controls */}
					<div className="flex justify-center gap-2 mt-6">
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-full border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all"
							onClick={scrollPrev}
						>
							<ChevronLeft className="h-5 w-5" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-full border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all"
							onClick={scrollNext}
						>
							<ChevronRight className="h-5 w-5" />
						</Button>
					</div>

					{/* Mobile CTA */}
					<div className="mt-4 text-center">
						<Button
							asChild
							size="lg"
							className="bg-brand-secondary text-brand-accent hover:bg-brand-secondary/90 shadow-lg hover:shadow-xl transition-all"
						>
							<Link href="/collections/press-go-kit-completo">
								Vedi tutti i prodotti
							</Link>
						</Button>
					</div>
				</div>

				{/* Desktop: Grid with Stagger Animation */}
				<div className="hidden md:block">
					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{featuredProducts.map((product) => (
							<motion.div key={product.id} variants={fadeInUp}>
								<ProductCard product={product} />
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}

export default FeaturedProductsSection