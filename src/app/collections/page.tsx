import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCollections } from '@/lib/shopify'

export default async function CollectionsPage() {
	const collections = await getCollections()

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
					{collections.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{collections.map((collection) => {
								const productCount = collection.products?.edges?.length || 0
								const firstProduct = collection.products?.edges?.[0]?.node
								
								return (
									<Link key={collection.id} href={`/collections/${collection.handle}`}>
										<Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
											<div className="relative aspect-square overflow-hidden">
												{collection.image ? (
													<Image
														src={collection.image.url}
														alt={collection.image.altText || collection.title}
														width={collection.image.width || 500}
														height={collection.image.height || 500}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
												) : firstProduct?.images?.[0] ? (
													<Image
														src={firstProduct.images[0].url}
														alt={firstProduct.images[0].altText || collection.title}
														width={500}
														height={500}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
												) : (
													<div className="w-full h-full bg-gray-200 flex items-center justify-center">
														<span className="text-gray-400">No image</span>
													</div>
												)}
												{productCount > 0 && (
													<Badge className="absolute top-4 right-4 bg-brand-primary text-white">
														{productCount} prodott{productCount === 1 ? 'o' : 'i'}
													</Badge>
												)}
											</div>
											<CardContent className="p-6">
												<h3 className="text-2xl font-bold mb-2 group-hover:text-brand-primary transition-colors">
													{collection.title}
												</h3>
												{collection.description && (
													<p className="text-gray-600 mb-4 line-clamp-2">
														{collection.description}
													</p>
												)}
												<Button className="w-full btn-primary">
													Scopri la collezione
												</Button>
											</CardContent>
										</Card>
									</Link>
								)
							})}
						</div>
					) : (
						<div className="text-center py-16">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Nessuna collezione disponibile
							</h3>
							<p className="text-gray-600 mb-8">
								Al momento non ci sono collezioni da mostrare.
							</p>
							<Button asChild>
								<Link href="/">Torna alla Home</Link>
							</Button>
						</div>
					)}
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

