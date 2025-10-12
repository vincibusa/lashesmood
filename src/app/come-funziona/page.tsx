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
			thumbnail: '/images/tutorial-press-go-thumb.jpg',
			duration: '2:30',
			description: 'Scopri come applicare le Press&GO in pochi secondi',
		},
		{
			id: 'tutorial-riutilizzo',
			title: 'Come Riutilizzare Ciglissime',
			thumbnail: '/images/tutorial-reuse-thumb.jpg',
			duration: '3:15',
			description: 'Impara a riutilizzare le tue ciglia con Bond&Seal',
		},
		{
			id: 'tutorial-regular',
			title: 'Tutorial Regular',
			thumbnail: '/images/tutorial-regular-thumb.jpg',
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