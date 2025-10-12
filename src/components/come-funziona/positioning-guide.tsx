import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

const PositioningGuide = () => {
	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<Image
							src="https://ciglissime.com/cdn/shop/files/clean_girl_press.jpg?v=1750417193&width=1500"
							alt="Guida posizionamento ciuffetti"
							width={800}
							height={400}
							className="w-full rounded-xl shadow-lg"
						/>
					</div>

					<div className="text-center">
						<h2 className="text-3xl font-bold mb-6">
							La <em className="italic text-brand-primary">magia</em> è nel
							posizionarle bene
						</h2>
						<p className="text-xl text-gray-700 mb-8">
							La durata dipende tutta da <em className="italic">come</em> le
							applichi!
						</p>

						<div className="grid md:grid-cols-2 gap-8 text-left">
							<Card className="p-6">
								<h3 className="font-bold text-lg mb-3 flex items-center">
									<span className="text-brand-primary mr-2">✨</span>
									Con le Regular
								</h3>
								<p className="text-gray-700">
									Posiziona i ciuffetti a circa{' '}
									<strong>1-2 mm dalla rima cigliare</strong>.
								</p>
							</Card>

							<Card className="p-6">
								<h3 className="font-bold text-lg mb-3 flex items-center">
									<span className="text-brand-primary mr-2">✨</span>
									Con le Press&Go
								</h3>
								<p className="text-gray-700">
									Appoggiali <strong>esattamente sulla rima</strong>: niente
									spazi, devono fondersi con le tue ciglia naturali.
								</p>
							</Card>
						</div>

						<p className="text-gray-600 mt-6 italic">
							Ricorda: se sono messe bene non sentirai alcun fastidio 💖
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PositioningGuide

