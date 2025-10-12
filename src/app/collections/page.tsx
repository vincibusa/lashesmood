import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CollectionsPage() {
	const collections = [
		{
			handle: 'press-go-kit-completo',
			title: 'Starter Kit Press&GO!',
			description: 'Applicazione veloce senza colla. Durata 3-7 giorni.',
			image:
				'https://ciglissime.com/cdn/shop/files/CLEAN_GIRLKit_Press.jpg?v=1750413845&width=1500',
			badge: 'Più venduto',
		},
		{
			handle: 'regular',
			title: 'Kit Regular',
			description: 'Con Bond&Seal per una durata fino a 10 giorni.',
			image:
				'https://ciglissime.com/cdn/shop/files/CLEAN_GIRLKit_Regular.jpg?v=1750413810&width=1500',
			badge: 'Lunga durata',
		},
		{
			handle: 'accessori',
			title: 'Accessori',
			description: 'Pinze, piegaciglia e tutto per le tue Ciglissime.',
			image:
				'https://ciglissime.com/cdn/shop/files/Clean_Girl_4b943c04-4570-4118-af4a-80c653792089.jpg?v=1750413037&width=1500',
			badge: 'Essenziali',
		},
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="section-padding bg-gradient-to-br from-brand-light to-white">
				<div className="container-custom text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Le nostre <em className="italic text-brand-primary">Collezioni</em>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Scopri la collezione perfetta per te. Dalle Press&GO super veloci ai
						Kit Regular per una tenuta prolungata.
					</p>
				</div>
			</section>

			{/* Collections Grid */}
			<section className="section-padding bg-white">
				<div className="container-custom">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{collections.map((collection) => (
							<Link key={collection.handle} href={`/collections/${collection.handle}`}>
								<Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
									<div className="relative aspect-square overflow-hidden">
										<Image
											src={collection.image}
											alt={collection.title}
											width={500}
											height={500}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
										{collection.badge && (
											<div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-medium">
												{collection.badge}
											</div>
										)}
									</div>
									<CardContent className="p-6">
										<h3 className="text-2xl font-bold mb-2 group-hover:text-brand-primary transition-colors">
											{collection.title}
										</h3>
										<p className="text-gray-600 mb-4">
											{collection.description}
										</p>
										<Button className="w-full btn-primary">
											Scopri la collezione
										</Button>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Info Section */}
			<section className="section-padding bg-brand-light">
				<div className="container-custom max-w-4xl text-center">
					<h2 className="text-3xl font-bold mb-6">
						Quale collezione fa per te?
					</h2>
					<div className="grid md:grid-cols-2 gap-8 text-left mt-12">
						<Card className="p-6">
							<h3 className="font-bold text-xl mb-3 text-brand-primary">
								✨ Press&GO!
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Applicazione in secondi</li>
								<li>✓ Nessuna colla necessaria</li>
								<li>✓ Durata 3-7 giorni</li>
								<li>✓ Perfette per iniziare</li>
							</ul>
						</Card>

						<Card className="p-6">
							<h3 className="font-bold text-xl mb-3 text-brand-primary">
								✨ Regular
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Con Bond&Seal professionale</li>
								<li>✓ Durata fino a 10 giorni</li>
								<li>✓ Massima tenuta</li>
								<li>✓ Riutilizzabili</li>
							</ul>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section-padding bg-gradient-to-r from-brand-primary to-brand-secondary">
				<div className="container-custom text-center">
					<h2 className="text-3xl font-bold text-white mb-6">
						Non sai quale scegliere?
					</h2>
					<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
						Guarda i nostri tutorial per scoprire come applicare le Ciglissime e
						quale collezione si adatta meglio al tuo stile
					</p>
					<Button
						asChild
						size="lg"
						className="bg-white text-brand-primary hover:bg-gray-100 font-medium px-8 py-4"
					>
						<Link href="/come-funziona">Vai ai Tutorial</Link>
					</Button>
				</div>
			</section>
		</div>
	)
}

