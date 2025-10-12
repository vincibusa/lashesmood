import React from 'react'
import Image from 'next/image'

interface CollectionImage {
	src: string
	alt: string
}

const CollectionGallery = () => {
	const images: CollectionImage[] = [
		{
			src: 'https://ciglissime.com/cdn/shop/files/CLEAN_GIRLKit_Regular.jpg?v=1750413810&width=1500',
			alt: 'Clean Girl Kit Regular',
		},
		{
			src: 'https://ciglissime.com/cdn/shop/files/CLEAN_GIRLKit_Press.jpg?v=1750413845&width=1500',
			alt: 'Clean Girl Kit Press',
		},
		{
			src: 'https://ciglissime.com/cdn/shop/files/Clean_Girl_4b943c04-4570-4118-af4a-80c653792089.jpg?v=1750413037&width=1500',
			alt: 'Clean Girl Individual',
		},
		{
			src: 'https://ciglissime.com/cdn/shop/files/clean_girl_press.jpg?v=1750417193&width=1500',
			alt: 'Clean Girl Press Application',
		},
	]

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
					La nostra collezione
				</h2>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
					{images.map((image, index) => (
						<div
							key={index}
							className="aspect-square overflow-hidden rounded-lg group"
						>
							<Image
								src={image.src}
								alt={image.alt}
								width={400}
								height={400}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default CollectionGallery

