import React from 'react'
import HeroSection from '@/components/home/hero-section'
import WhyUsSection from '@/components/home/why-us-section'
import CollectionGallery from '@/components/home/collection-gallery'
import BeforeAfterSection from '@/components/home/before-after-section'
import SocialProofSection from '@/components/home/social-proof-section'
import GiftThreshold from '@/components/gift-threshold'
import { getCollections } from '@/lib/shopify'

export default async function Home() {
	const collections = await getCollections()

	return (
		<>
			<HeroSection />
			<CollectionGallery collections={collections} />
			<WhyUsSection />
	
			<BeforeAfterSection />
			<SocialProofSection />
			<GiftThreshold />
		</>
	)
}
