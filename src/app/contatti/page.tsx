import React from 'react'
import ContactHero from '@/components/contatti/contact-hero'
import ContactSections from '@/components/contatti/contact-sections'
import QuickLinks from '@/components/contatti/quick-links'
import FAQQuickAccess from '@/components/contatti/faq-quick-access'
import ContactCTA from '@/components/contatti/contact-cta'

export default function ContattiPage() {
	return (
		<div className="min-h-screen">
			<ContactHero />
			<ContactSections />
			<QuickLinks />
			<FAQQuickAccess />
			<ContactCTA />
		</div>
	)
}