import React from 'react'
import FAQHero from '@/components/faq/faq-hero'
import FAQSection from '@/components/faq/faq-section'
import FAQCTA from '@/components/faq/faq-cta'

export const metadata = {
	title: 'Domande Frequenti - Lashesmood',
	description: 'Trova risposte alle domande più frequenti su Lashesmood, le ciglia semi-permanenti facili da applicare a casa.',
}

export default function FAQPage() {
	return (
		<>
			<FAQHero />
			<FAQSection />
			<FAQCTA />
		</>
	)
}

