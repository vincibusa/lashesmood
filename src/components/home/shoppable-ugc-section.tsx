'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface UGCItem {
	id: string
	imageSrc: string
	alt: string
	username: string
	userAvatar: string
	products: {
		id: string
		name: string
		price: string
		link: string
	}[]
}

interface StoryItem {
	id: string
	username: string
	avatar: string
	imageSrc: string
}

const StoryBubble = ({ story, onOpen }: { story: StoryItem; onOpen: (story: StoryItem) => void }) => {
	const shouldReduceMotion = useReducedMotion()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ type: 'spring', stiffness: 200, damping: 15 }}
			whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
			className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
			onClick={() => onOpen(story)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				animate={shouldReduceMotion ? {} : {
					scale: isHovered ? [1, 1.05, 1] : 1,
				}}
				transition={{
					duration: 0.6,
					repeat: isHovered ? Infinity : 0,
					repeatDelay: 0.5
				}}
				className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-primary bg-white"
			>
				<Image
					src={story.avatar}
					alt={story.username}
					fill
					sizes="80px"
					className="object-cover"
				/>
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatDelay: 2
					}}
					className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent"
				/>
			</motion.div>
			<span className="text-xs font-medium text-foreground max-w-[80px] text-center truncate">
				{story.username}
			</span>
		</motion.div>
	)
}

const UGCCard = ({ item, index, onOpen }: { item: UGCItem; index: number; onOpen: (item: UGCItem) => void }) => {
	const shouldReduceMotion = useReducedMotion()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{
				type: 'spring',
				stiffness: 200,
				damping: 20,
				delay: shouldReduceMotion ? 0 : index * 0.1
			}}
			whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -3 }}
			className="group relative overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm cursor-pointer"
			onClick={() => onOpen(item)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Image Container */}
			<div className="relative aspect-[3/4] overflow-hidden">
				<motion.div
					animate={shouldReduceMotion ? {} : {
						scale: isHovered ? 1.05 : 1,
					}}
					transition={{ duration: 0.4 }}
					className="absolute inset-0"
				>
					<Image
						src={item.imageSrc}
						alt={item.alt}
						fill
						sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						className="object-cover"
					/>
				</motion.div>

				{/* Dark Overlay */}
				<motion.div
					animate={{ opacity: isHovered ? 0.6 : 0.2 }}
					className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
				/>

				{/* User Info */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						y: isHovered ? 0 : 10,
						opacity: isHovered ? 1 : 0.8
					}}
					className="absolute top-3 left-3 flex items-center gap-2"
				>
					<div className="w-6 h-6 rounded-full overflow-hidden border border-white/30">
						<Image
							src={item.userAvatar}
							alt={item.username}
							fill
							sizes="24px"
							className="object-cover"
						/>
					</div>
					<span className="text-white text-xs font-semibold drop-shadow-md">
						@{item.username}
					</span>
				</motion.div>

				{/* Shop Button - Desktop Only */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? 1 : 0,
						y: isHovered ? 0 : 10
					}}
					className="absolute bottom-3 right-3 hidden md:block"
				>
					<Button
						size="sm"
						className="bg-white/90 backdrop-blur-sm text-brand-primary hover:bg-white font-semibold shadow-lg"
					>
						<ShoppingBag className="h-4 w-4 mr-1" />
						Shop
					</Button>
				</motion.div>

				{/* Mobile Shop Indicator */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						scale: [1, 1.1, 1],
						opacity: [0.8, 1, 0.8]
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 2
					}}
					className="md:hidden absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full"
				>
					<ShoppingBag className="h-4 w-4 text-brand-primary" />
				</motion.div>

				{/* Product Count Badge */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? 0 : 1,
					}}
					className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg"
				>
					{item.products.length} prodotti
				</motion.div>

				{/* Hover Gradient Effect */}
				<motion.div
					animate={shouldReduceMotion ? {} : {
						opacity: isHovered ? 1 : 0,
					}}
					className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 to-transparent opacity-0 pointer-events-none"
				/>
			</div>

			{/* Content - Desktop Only */}
			<div className="hidden md:block p-4">
				<h3 className="font-semibold text-foreground mb-1 line-clamp-1">
					{item.alt}
				</h3>
				<p className="text-sm text-muted-foreground line-clamp-2">
					{item.products.map(p => p.name).join(', ')}
				</p>
			</div>
		</motion.div>
	)
}

const LightboxModal = ({ item, onClose }: { item: UGCItem | null; onClose: () => void }) => {
	const shouldReduceMotion = useReducedMotion()
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	// Simulate multiple images for the same UGC item
	const images = [
		item?.imageSrc || '',
		item?.imageSrc || '',
		item?.imageSrc || ''
	].filter(Boolean)

	const handleNext = () => {
		setDirection(1)
		setCurrentImageIndex((prev) => (prev + 1) % images.length)
	}

	const handlePrev = () => {
		setDirection(-1)
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	if (!item) return null

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
				onClick={onClose}
			>
				<motion.div
					initial={shouldReduceMotion ? false : { scale: 0.9, opacity: 0, y: 20 }}
					animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1, y: 0 }}
					exit={shouldReduceMotion ? false : { scale: 0.9, opacity: 0, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 200 }}
					className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button */}
					<motion.button
						whileHover={{ scale: 1.1, rotate: 90 }}
						whileTap={{ scale: 0.9 }}
						onClick={onClose}
						className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
					>
						<X className="h-5 w-5 text-foreground" />
					</motion.button>

					{/* Image Section */}
					<div className="relative flex-1 bg-black/5 flex items-center justify-center overflow-hidden">
						{/* Navigation Arrows */}
						<motion.button
							whileHover={{ scale: 1.1 }}
							onClick={handlePrev}
							className="absolute left-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hidden md:block"
						>
							<ChevronLeft className="h-5 w-5" />
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.1 }}
							onClick={handleNext}
							className="absolute right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hidden md:block"
						>
							<ChevronRight className="h-5 w-5" />
						</motion.button>

						{/* Image */}
						<motion.div
							key={currentImageIndex}
							initial={shouldReduceMotion ? false : { x: direction * 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={shouldReduceMotion ? false : { x: direction * -100, opacity: 0 }}
							transition={{ type: 'spring', damping: 30, stiffness: 200 }}
							className="relative w-full h-[50vh] md:h-full"
						>
							<Image
								src={images[currentImageIndex]}
								alt={item.alt}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-contain"
							/>
						</motion.div>

						{/* Mobile Navigation Dots */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
							{images.map((_, idx) => (
								<motion.div
									key={idx}
									animate={{
										width: idx === currentImageIndex ? 24 : 8,
										opacity: idx === currentImageIndex ? 1 : 0.5
									}}
									transition={{ duration: 0.3 }}
									className="h-2 rounded-full bg-white cursor-pointer"
									onClick={() => setCurrentImageIndex(idx)}
								/>
							))}
						</motion.div>
					</div>

					{/* Product Info Section */}
					<div className="w-full md:w-96 bg-white p-6 overflow-y-auto">
						{/* User Info */}
						<div className="flex items-center gap-3 mb-6">
							<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary">
								<Image
									src={item.userAvatar}
									alt={item.username}
									fill
									sizes="40px"
									className="object-cover"
								/>
							</div>
							<div>
								<h3 className="font-bold text-lg">@{item.username}</h3>
								<p className="text-sm text-muted-foreground">Ha acquistato questi prodotti</p>
							</div>
						</div>

						{/* Products List */}
						<div className="space-y-4">
							<h4 className="font-semibold text-foreground flex items-center gap-2">
								<Heart className="h-4 w-4 text-brand-primary" />
								Prodotti in foto
							</h4>
							{item.products.map((product, idx) => (
								<motion.div
									key={product.id}
									initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: shouldReduceMotion ? 0 : 0.1 * idx }}
									whileHover={shouldReduceMotion ? {} : { x: 5 }}
									className="flex items-center justify-between p-3 bg-brand-light rounded-xl border border-border/50 hover:border-brand-primary/50 transition-colors"
								>
									<div className="flex-1">
										<p className="font-medium text-sm">{product.name}</p>
										<p className="text-brand-primary font-bold text-sm">{product.price}</p>
									</div>
									<Button
										size="sm"
										className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
									>
										Aggiungi
									</Button>
								</motion.div>
							))}
						</div>

						{/* CTA */}
						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="mt-6 pt-6 border-t border-border"
						>
							<Button
								size="lg"
								className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
							>
								<ShoppingBag className="h-5 w-5 mr-2" />
								Acquista il look completo
							</Button>
							<p className="text-xs text-muted-foreground text-center mt-3">
								Spedizione gratuita per ordini superiori a €50
							</p>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

const ShoppableUGCSection = () => {
	const shouldReduceMotion = useReducedMotion()
	const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null)
	const [selectedUGC, setSelectedUGC] = useState<UGCItem | null>(null)
	const scrollRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState(0)

	// Mock data - Stories (Instagram-style)
	const stories: StoryItem[] = [
		{
			id: 's1',
			username: 'giulia_m',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
			imageSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'
		},
		{
			id: 's2',
			username: 'laura_b',
			avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
			imageSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800'
		},
		{
			id: 's3',
			username: 'sofia_r',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
			imageSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800'
		},
		{
			id: 's4',
			username: 'martina_d',
			avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop',
			imageSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800'
		},
		{
			id: 's5',
			username: 'chiara_v',
			avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=200&h=200&fit=crop',
			imageSrc: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800'
		}
	]

	// Mock data - UGC Grid
	const ugcItems: UGCItem[] = [
		{
			id: 'u1',
			imageSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
			alt: 'Look naturale quotidiano con Clean Girl Kit',
			username: 'giulia_m',
			userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
			products: [
				{ id: 'p1', name: 'Clean Girl Kit', price: '€39,90', link: '#' },
				{ id: 'p2', name: 'Magnetico Base', price: '€24,90', link: '#' }
			]
		},
		{
			id: 'u2',
			imageSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
			alt: 'Effetto drammatico per serata speciale',
			username: 'laura_b',
			userAvatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
			products: [
				{ id: 'p3', name: 'Drama Queen', price: '€44,90', link: '#' },
				{ id: 'p4', name: 'Magnetico Extra', price: '€29,90', link: '#' }
			]
		},
		{
			id: 'u3',
			imageSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
			alt: 'Prima applicazione - risultato perfetto!',
			username: 'sofia_r',
			userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
			products: [
				{ id: 'p5', name: 'Starter Pack', price: '€49,90', link: '#' },
				{ id: 'p6', name: 'Adesivo Extra', price: '€9,90', link: '#' }
			]
		},
		{
			id: 'u4',
			imageSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
			alt: 'Look soft per il giorno',
			username: 'martina_d',
			userAvatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop',
			products: [
				{ id: 'p7', name: 'Press & Go', price: '€34,90', link: '#' }
			]
		},
		{
			id: 'u5',
			imageSrc: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
			alt: 'Perfette per le vacanze',
			username: 'chiara_v',
			userAvatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=200&h=200&fit=crop',
			products: [
				{ id: 'p8', name: 'Clean Girl Kit', price: '€39,90', link: '#' },
				{ id: 'p9', name: 'Travel Case', price: '€14,90', link: '#' }
			]
		},
		{
			id: 'u6',
			imageSrc: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800',
			alt: 'Mia mamma le adora!',
			username: 'anna_l',
			userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
			products: [
				{ id: 'p10', name: 'Duo Pack', price: '€69,90', link: '#' },
				{ id: 'p11', name: 'Adesivo', price: '€9,90', link: '#' }
			]
		}
	]

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (!scrollRef.current) return

		const scrollAmount = 160 // Approximate width of story bubble + gap
		const currentScroll = scrollRef.current.scrollLeft

		if (direction === 'left') {
			scrollRef.current.scrollTo({
				left: currentScroll - scrollAmount,
				behavior: 'smooth'
			})
			setCurrentIndex(prev => Math.max(0, prev - 1))
		} else {
			scrollRef.current.scrollTo({
				left: currentScroll + scrollAmount,
				behavior: 'smooth'
			})
			setCurrentIndex(prev => Math.min(stories.length - 1, prev + 1))
		}
	}

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				{/* Header */}
				<ScrollReveal>
					<div className="flex items-end justify-between mb-8 md:mb-12">
						<div>
							<motion.h2
								initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ type: 'spring', damping: 20 }}
								className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2"
							>
								Real <span className="text-brand-primary">Lashesmood</span>
							</motion.h2>
							<motion.p
								initial={shouldReduceMotion ? false : { opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="text-muted-foreground text-lg"
							>
								Come le nostre clienti vivono la loro esperienza
							</motion.p>
						</div>

						{/* Navigation Buttons (Desktop) */}
						<motion.div
							initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="hidden md:flex gap-2"
						>
							<Button
								variant="outline"
								size="icon"
								onClick={() => scrollCarousel('left')}
								disabled={currentIndex === 0}
								className="hover:bg-brand-primary hover:text-white transition-all disabled:opacity-30"
							>
								<ChevronLeft className="h-5 w-5" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => scrollCarousel('right')}
								disabled={currentIndex === stories.length - 1}
								className="hover:bg-brand-primary hover:text-white transition-all disabled:opacity-30"
							>
								<ChevronRight className="h-5 w-5" />
							</Button>
						</motion.div>
					</div>
				</ScrollReveal>

				{/* Stories Carousel */}
				<ScrollReveal>
					<div className="relative mb-12 md:mb-16">
						{/* Mobile Scroll Indicator */}
						<motion.div
							animate={shouldReduceMotion ? {} : {
								opacity: [0, 1, 0],
								x: [0, 20, 0]
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatDelay: 2
							}}
							className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-l-lg text-xs font-medium text-brand-primary shadow-lg z-10"
						>
							Swipe →
						</motion.div>

						<div
							ref={scrollRef}
							className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
							style={{ scrollbarWidth: 'none' } as React.CSSProperties}
						>
							{stories.map((story) => (
								<StoryBubble
									key={story.id}
									story={story}
									onOpen={setSelectedStory}
								/>
							))}
						</div>

						{/* Mobile Navigation Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="md:hidden flex justify-center gap-3 mt-4"
						>
							<Button
								variant="outline"
								size="sm"
								onClick={() => scrollCarousel('left')}
								disabled={currentIndex === 0}
								className="px-4 hover:bg-brand-primary hover:text-white transition-all disabled:opacity-30"
							>
								<ChevronLeft className="h-4 w-4 mr-1" />
								Precedente
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => scrollCarousel('right')}
								disabled={currentIndex === stories.length - 1}
								className="px-4 hover:bg-brand-primary hover:text-white transition-all disabled:opacity-30"
							>
								Successivo
								<ChevronRight className="h-4 w-4 ml-1" />
							</Button>
						</motion.div>
					</div>
				</ScrollReveal>

				{/* UGC Grid */}
				<ScrollReveal>
					<motion.div
						className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.1
								}
							}
						}}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-50px' }}
					>
						{ugcItems.map((item, index) => (
							<UGCCard
								key={item.id}
								item={item}
								index={index}
								onOpen={setSelectedUGC}
							/>
						))}
					</motion.div>
				</ScrollReveal>

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
								size="lg"
								className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-10 py-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
							>
								Scopri tutti i reali risultati
							</Button>
						</motion.div>
						<p className="text-sm text-muted-foreground mt-4">
							Tagga @lashesmood per apparire nella nostra gallery!
						</p>
					</motion.div>
				</ScrollReveal>

				{/* Modals */}
				<AnimatePresence>
					{selectedStory && (
						<LightboxModal
							item={{
								id: selectedStory.id,
								imageSrc: selectedStory.imageSrc,
								alt: `Story di @${selectedStory.username}`,
								username: selectedStory.username,
								userAvatar: selectedStory.avatar,
								products: [
									{ id: 'p1', name: 'Clean Girl Kit', price: '€39,90', link: '#' },
									{ id: 'p2', name: 'Press & Go', price: '€34,90', link: '#' }
								]
							}}
							onClose={() => setSelectedStory(null)}
						/>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{selectedUGC && (
						<LightboxModal
							item={selectedUGC}
							onClose={() => setSelectedUGC(null)}
						/>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
}

export default ShoppableUGCSection
