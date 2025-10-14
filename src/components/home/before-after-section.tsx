import React from 'react'
import BeforeAfterSlider from '@/components/before-after-slider'

const BeforeAfterSection = () => {
	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
					Senza & con <em className="italic text-brand-primary">Lashesmood</em>
				</h2>
				<div className="max-w-2xl mx-auto">
					<BeforeAfterSlider
						beforeImage="https://ciglissime.com/cdn/shop/files/prima_4c4033af-0ac8-4bdf-b6d6-fa7391b691fa.jpg?v=1757260023&width=3840"
						afterImage="https://ciglissime.com/cdn/shop/files/dopo_5eb92ee6-462e-4bfa-8028-4e97cd16221f.jpg?v=1757260023&width=3840"
						beforeAlt="Prima - senza Lashesmood"
						afterAlt="Dopo - con Lashesmood"
					/>
				</div>
			</div>
		</section>
	)
}

export default BeforeAfterSection

