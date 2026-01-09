'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
	springUp,
	fadeInUp,
	staggerContainer,
} from '@/lib/animations'

const ContactHero = () => {
	return (
		<section className="relative overflow-hidden">
			{/* Hero Main - Mobile First Design */}
			<div className="relative w-full h-screen">
				{/* Background Image with subtle overlay */}
				<div className="absolute inset-0">
					<Image
						src="https://ciglissime.com/cdn/shop/files/IMG_1518_9X16-_2.jpg?v=1758388075&width=3840"
						alt="Lashesmood Contatti - Siamo qui per aiutarti"
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
							{/* Titolo principale - Playfair Display */}
							<motion.h1
								variants={springUp}
								className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight"
							>
								Ciao
							</motion.h1>

							{/* Sottotitolo elegante */}
							<motion.p
								variants={fadeInUp}
								className="text-xl md:text-2xl lg:text-3xl text-white/95 font-light mb-6 md:mb-8 leading-relaxed"
							>
								Siamo qui per <em className="italic font-serif text-white">aiutarti.</em> Scegli l&apos;area di interesse per ricevere l&apos;assistenza che ti serve.
							</motion.p>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactHero

