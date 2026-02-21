import React from 'react'
import { redirect } from 'next/navigation'
import TutorialHero from '@/components/come-funziona/tutorial-hero'
import CollectionSwitcher from '@/components/come-funziona/collection-switcher'
import VideoTutorials from '@/components/come-funziona/video-tutorials'
import ApplicationSteps from '@/components/come-funziona/application-steps'
import PositioningGuide from '@/components/come-funziona/positioning-guide'
import ProductFAQ from '@/components/products/product-faq'
import CTASection from '@/components/come-funziona/cta-section'
import { getProductTypeFromCollectionHandle } from '@/components/come-funziona/types'
import { getCollections } from '@/lib/shopify'

const SHOW_VIDEO_TUTORIALS = false

export default async function ComeFunzionaPage({
	searchParams,
}: {
	searchParams: Promise<{ tipo?: string; collezione?: string }>
}) {
	const collections = await getCollections()
	const { tipo, collezione: collezioneParam } = await searchParams

	// Support legacy ?tipo= and new ?collezione=
	let currentHandle: string | null = null
	if (collezioneParam) {
		const exists = collections.some((c) => c.handle === collezioneParam)
		currentHandle = exists ? collezioneParam : null
	}
	if (!currentHandle && (tipo === 'press-go' || tipo === 'regular')) {
		const match = collections.find((c) =>
			tipo === 'press-go'
				? c.handle.toLowerCase().includes('press-go')
				: c.handle.toLowerCase().includes('regular')
		)
		currentHandle = match?.handle ?? null
	}
	if (!currentHandle && collections.length > 0) {
		currentHandle = collections[0].handle
		if (collezioneParam) {
			redirect(`/come-funziona?collezione=${collections[0].handle}`)
		}
	}

	const productType = currentHandle
		? getProductTypeFromCollectionHandle(currentHandle)
		: getProductTypeFromCollectionHandle('')

	const tutorials = [
		{
			id: 'tutorial-press-go',
			title: 'Tutorial Press&GO!',
			thumbnail: 'https://ciglissime.com/cdn/shop/files/CLEAN_GIRLKit_Press.jpg?v=1750413845&width=800',
			duration: '2:30',
			description: 'Scopri come applicare le Press&GO in pochi secondi',
		},
		{
			id: 'tutorial-riutilizzo',
			title: 'Come Riutilizzare Lashesmood',
			thumbnail: 'https://ciglissime.com/cdn/shop/files/clean_girl_press.jpg?v=1750417193&width=800',
			duration: '3:15',
			description: 'Impara a riutilizzare le tue ciglia con Bond&Seal',
		},
		{
			id: 'tutorial-regular',
			title: 'Tutorial Regular',
			thumbnail: 'https://ciglissime.com/cdn/shop/files/CLEAN_GIRLKit_Regular.jpg?v=1750413810&width=800',
			duration: '4:45',
			description: "Guida completa per l'applicazione delle Regular",
		},
	]

	return (
		<div className="min-h-screen scroll-smooth">
			<TutorialHero productType={productType} collectionTitle={collections.find((c) => c.handle === currentHandle)?.title} />
			<CollectionSwitcher collections={collections} currentHandle={currentHandle ?? ''} />
			{SHOW_VIDEO_TUTORIALS && <VideoTutorials tutorials={tutorials} />}
			<ApplicationSteps />
			<PositioningGuide productType={productType} />
			<div id="faq">
				<ProductFAQ />
			</div>
			<CTASection
				productType={productType}
				collectionHandle={currentHandle}
				collectionTitle={collections.find((c) => c.handle === currentHandle)?.title}
			/>
		</div>
	)
}