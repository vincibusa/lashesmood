import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CollectionHeroProps {
	title: string
	description: string
	image: string
}

const CollectionHero = ({ title, description, image }: CollectionHeroProps) => {
	return (
		<section className="relative h-[50vh] overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/30" />
			</div>

			<div className="relative h-full flex items-center">
				<div className="container-custom">
					<div className="max-w-2xl text-white">
						<nav className="text-sm mb-4 opacity-90">
							<Link href="/" className="hover:underline">
								Home
							</Link>
							<span className="mx-2">/</span>
							<span>Collezione</span>
						</nav>
						<h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
						<p className="text-xl opacity-90">{description}</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CollectionHero

