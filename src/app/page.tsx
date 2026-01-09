import React from 'react'
import HeroSection from '@/components/home/hero-section'

import StyleQuizSection from '@/components/home/style-quiz-section'
import WhyUsSection from '@/components/home/why-us-section'
import BeforeAfterSection from '@/components/home/before-after-section'
import VideoTutorialsSection from '@/components/home/video-tutorials-section'
import CollectionGallery from '@/components/home/collection-gallery'
import ShoppableUGCSection from '@/components/home/shoppable-ugc-section'
import GiftThreshold from '@/components/gift-threshold'
import { getCollections } from '@/lib/shopify'

export default async function Home() {
	const collections = await getCollections()
	

	return (
		<>
			<HeroSection />
			<section id="collections">
				<CollectionGallery collections={collections} />
			</section>
			<WhyUsSection />
			<BeforeAfterSection />
			<section id="tutorials">
				<VideoTutorialsSection />
			</section>
			<StyleQuizSection />
			<ShoppableUGCSection />
			<GiftThreshold />
		</>
	)
}
