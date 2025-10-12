import React from 'react'
import HeroSection from '@/components/home/hero-section'
import FeaturedProductsSection from '@/components/home/featured-products-section'
import WhyUsSection from '@/components/home/why-us-section'
import CollectionGallery from '@/components/home/collection-gallery'
import BeforeAfterSection from '@/components/home/before-after-section'
import SocialProofSection from '@/components/home/social-proof-section'
import GiftThreshold from '@/components/gift-threshold'
import { getFeaturedProducts } from '@/lib/shopify'

export default async function Home() {
	const featuredProducts = await getFeaturedProducts()

	return (
		<>
			<HeroSection />
			<FeaturedProductsSection products={featuredProducts} />
			<WhyUsSection />
			<CollectionGallery />
			<BeforeAfterSection />
			<SocialProofSection />
			<GiftThreshold />
		</>
	)
}
