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
						beforeImage="/images/FRA_9546-Modifica-Modifica.jpg"
						afterImage="/images/FRA_9737-Modifica.jpg"
						beforeAlt="Prima - senza Lashesmood"
						afterAlt="Dopo - con Lashesmood"
					/>
				</div>
			</div>
		</section>
	)
}

export default BeforeAfterSection

