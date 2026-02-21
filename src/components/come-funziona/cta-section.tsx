import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { ProductType } from '@/components/come-funziona/types'

interface CTASectionProps {
	productType: ProductType
	collectionHandle?: string | null
	collectionTitle?: string | null
}

const CTASection = ({ productType, collectionHandle, collectionTitle }: CTASectionProps) => {
	const showPressGo = productType === 'all' || productType === 'press-go'
	const showRegular = productType === 'all' || productType === 'regular'

	return (
		<section
			id="cta"
			className="section-padding bg-gradient-to-r from-brand-primary to-brand-secondary"
			aria-labelledby="cta-title"
		>
			<div className="container-custom text-center">
				<h2 id="cta-title" className="text-3xl font-bold text-white mb-6">
					Pronta a provare le tue Lashesmood?
				</h2>
				<p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
					Scegli il tuo kit preferito e inizia subito la tua routine di bellezza
					quotidiana
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					{collectionHandle && (
						<Button
							asChild
							size="lg"
							className="min-h-[44px] bg-white text-brand-primary hover:bg-white/95 font-semibold px-8 shadow-md transition-shadow hover:shadow-lg"
						>
							<Link href={`/collections/${collectionHandle}`}>
								Vai a {collectionTitle ?? 'collezione'}
							</Link>
						</Button>
					)}
					{!collectionHandle && showPressGo && (
						<Button
							asChild
							size="lg"
							className="min-h-[44px] bg-white text-brand-primary hover:bg-white/95 font-semibold px-8 shadow-md transition-shadow hover:shadow-lg"
						>
							<Link href="/collections/press-go-kit-completo">
								Scopri Press&GO!
							</Link>
						</Button>
					)}
					{!collectionHandle && showRegular && (
						<Button
							asChild
							variant="outline"
							size="lg"
							className="min-h-[44px] border-2 border-white text-white hover:bg-white hover:text-brand-primary px-8 focus-visible:ring-white"
						>
							<Link href="/collections/regular">Scopri Regular</Link>
						</Button>
					)}
				</div>
			</div>
		</section>
	)
}

export default CTASection

