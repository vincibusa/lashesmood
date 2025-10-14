import React from 'react'
import Image from 'next/image'

const SocialProofSection = () => {
	const socialImages = [
		'https://ciglissime.com/cdn/shop/files/Livello_1.jpg?v=1754665257&width=3840',
		'https://ciglissime.com/cdn/shop/files/Screenshot_2025-08-08_alle_16.58.25.jpg?v=1754665258&width=3840',
		'https://ciglissime.com/cdn/shop/files/Screenshot_2025-08-08_alle_16.59.13.jpg?v=1754665258&width=3840',
		'https://ciglissime.com/cdn/shop/files/Screenshot_2025-08-08_alle_16.58.53.jpg?v=1754665257&width=3840',
		'https://ciglissime.com/cdn/shop/files/Screenshot_2025-08-08_alle_17.02.10.jpg?v=1754665361&width=3840',
	]

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
					Esprimiti come vuoi, <em className="italic text-brand-primary">sempre</em>
				</h2>
				<p className="text-center text-brand-primary font-bold mb-12 text-xl">
					#lashesmood
				</p>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{socialImages.map((src, index) => (
						<div
							key={index}
							className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
						>
							<Image
								src={src}
								alt={`User photo ${index + 1}`}
								width={300}
								height={300}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default SocialProofSection

