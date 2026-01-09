'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	slideInLeft,
	springUp,
	fadeInUp,
	staggerContainer,
} from '@/lib/animations'

const HeroSection = () => {

	return (
		<section className="relative overflow-hidden">
			{/* Hero Main - Mobile First Design */}
			<div className="relative w-full h-screen">
				{/* Background Image with subtle overlay */}
				<div className="absolute inset-0">
					<Image
						src="https://ciglissime.com/cdn/shop/files/IMG_1518_9X16-_2.jpg?v=1758388075&width=3840"
						alt="Lashesmood Hero - Ciglia magnetiche"
						fill
						className="object-cover"
						priority
					/>
					{/* Gradient overlay - more subtle for minimal look */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
				</div>

				{/* Hero Content - Centered on mobile, split on desktop */}
				<div className="relative h-full flex items-end md:items-center z-10">
					<div className="container-custom w-full">
						<motion.div
							initial="hidden"
							animate="visible"
							variants={staggerContainer}
							className="max-w-3xl mx-auto md:mx-0 md:max-w-xl lg:max-w-2xl"
						>
							{/* Badge animato */}
							<motion.div variants={slideInLeft}>
								<Badge className="mb-4 bg-brand-primary text-white font-medium tracking-wide">
									#backtowork
								</Badge>
							</motion.div>

							{/* Titolo principale - Playfair Display */}
							<motion.h1
								variants={springUp}
								className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight"
							>
								LASHESMOOD
							</motion.h1>

							{/* Sottotitolo elegante */}
							<motion.p
								variants={fadeInUp}
								className="text-xl md:text-2xl lg:text-3xl text-white/95 font-light mb-6 md:mb-8 leading-relaxed"
							>
								Uno sguardo <em className="italic font-serif text-white">dice tutto,</em> sempre
							</motion.p>

							{/* CTA Buttons - Mobile: stacked, Desktop: inline */}
							<motion.div
								variants={staggerContainer}
								className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-start"
							>
								<motion.div variants={fadeInUp}>
									<Button
										asChild
										size="lg"
										className="btn-primary w-full sm:w-auto min-h-[56px] text-lg px-6 md:px-8 shadow-lg hover:shadow-xl"
									>
										<Link href="/collections/press-go-kit-completo">
											Scopri le press&go
										</Link>
									</Button>
								</motion.div>

								<motion.div variants={fadeInUp}>
									<Button
										asChild
										variant="outline"
										size="lg"
										className="w-full sm:w-auto min-h-[56px] text-lg px-6 md:px-8 bg-white/95 hover:bg-white text-brand-accent border-2 border-white/50 hover:border-white transition-all"
									>
										<Link href="/come-funziona">
											PROVA ORA
										</Link>
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection