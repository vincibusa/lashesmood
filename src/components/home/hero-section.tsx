import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const HeroSection = () => {
	return (
		<section className="relative overflow-hidden">
			{/* Hero Carousel */}
			<div className="relative h-[70vh] md:h-[80vh]">
				{/* Background Video/Image */}
				<div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
					<Image
						src="https://ciglissime.com/cdn/shop/files/IMG_1518_9X16-_2.jpg?v=1758388075&width=3840"
						alt="Lashesmood Hero"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/20" />
				</div>

				{/* Hero Content */}
				<div className="relative h-full flex items-center z-10">
					<div className="container-custom">
						<div className="max-w-2xl">
							<Badge className="mb-4 bg-brand-secondary text-white animate-pulse">
								#backtowork
							</Badge>
							<h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
								<span className="bg-gradient-to-r from-brand-primary via-pink-400 to-brand-secondary bg-clip-text text-transparent">
									le tue lashesmood
								</span>
							</h1>
							<h2 className="text-2xl md:text-4xl text-white mb-8 font-light">
								Uno sguardo <em className="italic">dice tutto,</em> sempre
							</h2>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									asChild
									size="lg"
									className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
								>
									<Link href="/collections/press-go-kit-completo">
										Scopri le press&go
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="text-lg px-8 py-4 bg-white/90 hover:bg-white hover:scale-105 transition-all duration-300 w-full sm:w-auto"
								>
									<Link href="/come-funziona">PROVA ORA</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Slide Dots */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
					<div className="w-3 h-3 rounded-full bg-brand-primary scale-125 shadow-lg shadow-brand-primary/50"></div>
					<div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 cursor-pointer transition-all duration-300"></div>
				</div>
			</div>

			{/* Second Hero Message */}
			<div className="bg-brand-light py-12">
				<div className="container-custom text-center">
					<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
						la <em className="italic text-brand-primary">Routine</em> che ami
					</h3>
					<Button
						asChild
						size="lg"
						className="btn-secondary hover:scale-105 transition-all duration-300"
					>
						<Link href="/collections/press-go-kit-completo">PROVA ORA</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default HeroSection

