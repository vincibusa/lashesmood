import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play } from 'lucide-react'

interface Tutorial {
	id: string
	title: string
	thumbnail: string
	duration: string
	description: string
}

interface VideoTutorialsProps {
	tutorials: Tutorial[]
}

const VideoTutorials = ({ tutorials }: VideoTutorialsProps) => {
	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{tutorials.map((tutorial) => (
						<Card
							key={tutorial.id}
							className="hover:shadow-lg transition-all duration-300"
						>
							<div className="relative">
								<div className="aspect-video overflow-hidden rounded-t-lg bg-gray-100">
									<Image
										src={tutorial.thumbnail}
										alt={tutorial.title}
										width={400}
										height={225}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>

								{/* Play Button Overlay */}
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-300">
									<div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
										<Play className="h-6 w-6 text-brand-primary ml-1" />
									</div>
								</div>

								{/* Duration Badge */}
								<Badge className="absolute bottom-3 right-3 bg-black/70 text-white border-0">
									{tutorial.duration}
								</Badge>
							</div>

							<CardContent className="p-6">
								<h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
								<p className="text-gray-600 text-sm">{tutorial.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default VideoTutorials

