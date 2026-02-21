import React from 'react'
import HeroSection from '@/components/home/hero-section'

import StyleQuizSection from '@/components/home/style-quiz-section'
import WhyUsSection from '@/components/home/why-us-section'
import BeforeAfterSection from '@/components/home/before-after-section'
import CollectionGallery from '@/components/home/collection-gallery'
import ShoppableUGCSection from '@/components/home/shoppable-ugc-section'
import { getCollections } from '@/lib/shopify'

export default async function Home() {
	const collections = await getCollections()
	

	return (
		<>
			<HeroSection />
			<section id="collections">
				<CollectionGallery collections={collections} />
			</section>
			<BeforeAfterSection />
			<WhyUsSection />
			{/* <StyleQuizSection /> */}
			{/* <ShoppableUGCSection /> */}
		</>
	)
}
