import React from 'react'
import TutorialHero from '@/components/come-funziona/tutorial-hero'
import VideoTutorials from '@/components/come-funziona/video-tutorials'
import PositioningGuide from '@/components/come-funziona/positioning-guide'
import HowItWorks from '@/components/come-funziona/how-it-works'
import TipsSection from '@/components/come-funziona/tips-section'
import FAQSection from '@/components/come-funziona/faq-section'
import CTASection from '@/components/come-funziona/cta-section'

export default function ComeFunzionaPage() {
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
			title: 'Come Riutilizzare Ciglissime',
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
		<div className="min-h-screen">
			<TutorialHero />
			<VideoTutorials tutorials={tutorials} />
			<PositioningGuide />
			<HowItWorks />
			<TipsSection />
			<FAQSection />
			<CTASection />
		</div>
	)
}