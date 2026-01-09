'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight, X, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface Video {
	id: string
	title: string
	description: string
	thumbnail: string
	videoUrl: string
	duration: string
}

const VideoCard = ({ video, index, onPlay }: { video: Video; index: number; onPlay: (video: Video) => void }) => {
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
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
			onClick={() => onPlay(video)}
		>
			{/* Full Image Background */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
					scale: isHovered ? 1.05 : 1,
				}}
				transition={{
					backgroundPosition: {
						duration: 10,
						repeat: Infinity,
						ease: 'linear'
					},
					scale: {
						duration: 0.3,
						ease: 'easeOut'
					}
				}}
				className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-brand-primary/20 bg-[length:200%_200%]"
				style={{
					backgroundImage: `url(${video.thumbnail})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			/>

			{/* Gradient Overlay for Text Readability - Stronger on mobile */}
			<motion.div
				animate={{ opacity: isHovered ? 0.7 : 0.5 }}
				className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 md:from-black/80 md:via-black/50 md:to-black/30"
			/>

			{/* Content Overlay */}
			<div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10">
				{/* Top Section - Duration Badge */}
				<div className="flex justify-end">
					<motion.div
						initial={false}
						animate={{ opacity: isHovered ? 0 : 1 }}
						className="bg-black/80 backdrop-blur-sm text-white text-xs md:text-xs font-semibold px-2.5 py-1 rounded-lg"
					>
						{video.duration}
					</motion.div>
				</div>

				{/* Bottom Section - Text Content */}
				<div>
					<motion.h3
						animate={shouldReduceMotion ? {} : {
							y: isHovered ? -5 : 0,
						}}
						className="font-playfair font-bold text-lg md:text-xl lg:text-2xl mb-2 leading-tight text-white drop-shadow-lg"
					>
						{video.title}
					</motion.h3>
					<motion.p
						animate={shouldReduceMotion ? {} : {
							opacity: isHovered ? 1 : 0.95,
						}}
						className="text-sm md:text-sm text-white drop-shadow-md mb-3 md:mb-4 line-clamp-2"
					>
						{video.description}
					</motion.p>

					{/* Play Indicator */}
					<motion.div
						animate={shouldReduceMotion ? {} : {
							x: isHovered ? 5 : 0,
							opacity: isHovered ? 1 : 0.9
						}}
						className="flex items-center gap-2 text-sm md:text-sm font-semibold text-white drop-shadow-md"
					>
						<span>Guarda ora</span>
						<motion.span
							animate={shouldReduceMotion ? {} : {
								x: isHovered ? [0, 5, 0] : 0
							}}
							transition={{
								duration: 0.8,
								repeat: isHovered ? Infinity : 0,
								repeatDelay: 0.5
							}}
						>
							→
						</motion.span>
					</motion.div>
				</div>
			</div>

			{/* Play Button - Center */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					scale: isHovered ? 1.1 : 0.9,
					opacity: isHovered ? 1 : 0
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 15 }}
				className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
			>
				<motion.div
					animate={shouldReduceMotion ? {} : {
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 1.5,
						repeat: isHovered ? Infinity : 0,
						repeatDelay: 1
					}}
					className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
				>
					<Play className="h-8 w-8 text-brand-primary ml-1" />
				</motion.div>
			</motion.div>

			{/* Border Animation on Hover */}
			<motion.div
				animate={shouldReduceMotion ? {} : {
					opacity: isHovered ? 1 : 0,
				}}
				className="absolute inset-0 border-2 border-brand-primary rounded-2xl pointer-events-none"
				style={{ opacity: 0 }}
			/>
		</motion.div>
	)
}

const VideoPlayerModal = ({ video, onClose }: { video: Video | null; onClose: () => void }) => {
	const shouldReduceMotion = useReducedMotion()
	const [isMuted, setIsMuted] = useState(true)

	if (!video) return null

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
				onClick={onClose}
			>
				<motion.div
					initial={shouldReduceMotion ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
					animate={shouldReduceMotion ? { scale: 1, opacity: 1, y: 0 } : { scale: 1, opacity: 1, y: 0 }}
					exit={shouldReduceMotion ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 200 }}
					className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button */}
					<motion.button
						whileHover={{ scale: 1.1, rotate: 90 }}
						whileTap={{ scale: 0.9 }}
						onClick={onClose}
						className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
					>
						<X className="h-5 w-5 text-foreground" />
					</motion.button>

					{/* Video Placeholder */}
					<div className="relative aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
						{/* Simulated Video Player */}
						<div className="text-center">
							<motion.div
								animate={shouldReduceMotion ? {} : {
									scale: [1, 1.05, 1],
									opacity: [0.7, 1, 0.7]
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatDelay: 1
								}}
								className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
							>
								<Play className="h-10 w-10 text-brand-primary ml-1" />
							</motion.div>
							<p className="text-foreground font-semibold text-lg mb-2">
								{video.title}
							</p>
							<p className="text-muted-foreground text-sm">
								Video demo - funzionalità completa in produzione
							</p>

							{/* Mute Toggle */}
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsMuted(!isMuted)}
								className="mt-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium flex items-center gap-2 mx-auto hover:bg-white transition-all"
							>
								{isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
								{isMuted ? 'Attiva audio' : 'Muta'}
							</motion.button>
						</div>

						{/* Animated Background Pattern */}
						<motion.div
							animate={shouldReduceMotion ? {} : {
								opacity: [0.1, 0.2, 0.1],
								scale: [1, 1.1, 1]
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut'
							}}
							className="absolute inset-0 opacity-10"
							style={{
								backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
								backgroundSize: '32px 32px'
							}}
						/>
					</div>

					{/* Video Info */}
					<div className="p-6 bg-white">
						<h3 className="font-playfair font-bold text-2xl mb-2 text-foreground">
							{video.title}
						</h3>
						<p className="text-muted-foreground mb-4">
							{video.description}
						</p>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<span className="flex items-center gap-1">
								<span className="w-2 h-2 rounded-full bg-brand-primary" />
								{video.duration}
							</span>
							<span>•</span>
							<span>Guida completa</span>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

const VideoTutorialsSection = () => {
	const shouldReduceMotion = useReducedMotion()
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const scrollRef = useRef<HTMLDivElement>(null)

	// Mock video data
	const videos: Video[] = [
		{
			id: '1',
			title: 'Applicazione Base in 30 Secondi',
			description: 'Impara la tecnica fondamentale per applicare le ciglia magnetiche in meno di un minuto',
			thumbnail: '',
			videoUrl: '#',
			duration: '1:30'
		},
		{
			id: '2',
			title: 'Look da Sera: Volume Drammatico',
			description: 'Come ottenere un effetto intenso per le tue serate speciali',
			thumbnail: '',
			videoUrl: '#',
			duration: '2:15'
		},
		{
			id: '3',
			title: 'Cura e Manutenzione',
			description: 'Consigli per far durare le tue ciglia più a lungo',
			thumbnail: '',
			videoUrl: '#',
			duration: '1:45'
		},
		{
			id: '4',
			title: 'Tecnica per Principianti',
			description: 'Guida passo-passo per chi prova per la prima volta',
			thumbnail: '',
			videoUrl: '#',
			duration: '3:00'
		}
	]

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (!scrollRef.current) return

		const scrollAmount = scrollRef.current.offsetWidth * 0.8
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
			setCurrentIndex(prev => Math.min(videos.length - 1, prev + 1))
		}
	}

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				{/* Header */}
				<ScrollReveal>
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
							Video Tutorial
						</h2>
					</div>
				</ScrollReveal>

				{/* Video Carousel */}
				<ScrollReveal>
					<div className="relative -mx-4 md:-mx-6">
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
							className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-visible pt-4 pb-4 px-8 md:px-12 snap-x snap-mandatory hide-scrollbar"
							style={{ scrollbarWidth: 'none' } as React.CSSProperties}
						>
							{videos.map((video, index) => (
								<div
									key={video.id}
									className="flex-shrink-0 w-[90%] md:w-[50%] lg:w-[38%] snap-start"
								>
									<VideoCard
										video={video}
										index={index}
										onPlay={setSelectedVideo}
									/>
								</div>
							))}
						</div>
					</div>
				</ScrollReveal>

				{/* Bottom CTA */}
				<ScrollReveal>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-12 text-center"
					>
						<p className="text-muted-foreground mb-4">
							Hai ancora dubbi? Il nostro team è qui per aiutarti!
						</p>
						<Button
							variant="outline"
							size="lg"
							className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
						>
							Contatta il Supporto
						</Button>
					</motion.div>
				</ScrollReveal>

				{/* Video Player Modal */}
				<VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
			</div>
		</section>
	)
}

export default VideoTutorialsSection
