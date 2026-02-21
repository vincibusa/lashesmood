import React from 'react'
import Image from 'next/image'
import type { ProductType } from '@/components/come-funziona/types'

interface PositioningGuideProps {
	productType: ProductType
}

const PositioningGuide = (_props: PositioningGuideProps) => {
	return (
		<section id="posizionamento" className="section-padding bg-brand-light">
			<div className="container-custom">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12 max-w-xl mx-auto">
						<Image
							src="/images/FRA_9737-Modifica.jpg"
							alt="Guida al posizionamento dei ciuffetti sulla rima cigliare"
							width={800}
							height={400}
							className="w-full rounded-2xl shadow-md border border-border object-cover"
						/>
					</div>

					<div className="text-center">
						<h2 className="text-3xl font-bold mb-6">
							La <em className="italic text-brand-primary">magia</em> è nel
							posizionarle bene
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
							La durata dipende tutta da <em className="italic">come</em> le
							applichi!
						</p>

						<p className="text-muted-foreground mt-8 italic text-center max-w-md mx-auto">
							Ricorda: se sono messe bene non sentirai alcun fastidio
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PositioningGuide

