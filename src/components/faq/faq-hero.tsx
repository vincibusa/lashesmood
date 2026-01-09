'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
	springUp,
	fadeInUp,
	staggerContainer,
} from '@/lib/animations'

const FAQHero = () => {
	return (
		<section className="section-padding bg-gradient-to-br from-brand-light to-white">
			<div className="container-custom text-center">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="max-w-3xl mx-auto"
				>
					<motion.h1
						variants={springUp}
						className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-accent"
					>
						Domande{' '}
						<em className="italic text-brand-primary">Frequenti</em>
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
					>
						Tutto quello che vuoi sapere su Lashesmood, le ciglia semi-permanenti
						facili da applicare a casa
					</motion.p>
				</motion.div>
			</div>
		</section>
	)
}

export default FAQHero

