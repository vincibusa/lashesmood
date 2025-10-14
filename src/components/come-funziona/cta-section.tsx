import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CTASection = () => {
	return (
		<section className="section-padding bg-gradient-to-r from-brand-primary to-brand-secondary">
			<div className="container-custom text-center">
				<h2 className="text-3xl font-bold text-white mb-6">
					Pronta a provare le tue Lashesmood?
				</h2>
				<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
					Scegli il tuo kit preferito e inizia subito la tua routine di bellezza
					quotidiana
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						asChild
						size="lg"
						className="bg-white text-brand-primary hover:bg-gray-100 font-medium px-8 py-4"
					>
						<Link href="/collections/press-go-kit-completo">
							Scopri Press&GO!
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="border-white text-white hover:bg-white hover:text-brand-primary px-8 py-4"
					>
						<Link href="/collections/regular">Scopri Regular</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default CTASection

