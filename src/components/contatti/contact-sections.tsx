import React from 'react'
import Link from 'next/link'
import { Mail, Users, Store, Clock, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ContactSection {
	icon: LucideIcon
	title: string
	description: string
	email?: string
	extraInfo?: string
	cta?: {
		text: string
		href: string
		external: boolean
	}
	hours?: string
}

const ContactSections = () => {
	const contactSections: ContactSection[] = [
		{
			icon: Mail,
			title: 'INFO & SPEDIZIONI',
			description:
				'Per assistenza su ordini, spedizioni o pagamenti invia una mail a',
			email: 'shop@ciglissime.com',
			extraInfo:
				"Se hai qualche difficoltà nell'applicazione, scrivici su IG:",
			cta: {
				text: 'Chatta con noi 💖',
				href: 'https://ig.me/m/ciglissime',
				external: true,
			},
			hours:
				'Rispondiamo alle vostre email dal lunedì al venerdì dalle 9:30 alle 18:30',
		},
		{
			icon: Users,
			title: 'COLLABORAZIONI',
			description:
				"Sei un'influencer o UGC Creator e ti piacerebbe collaborare con Ciglissime?",
			email: 'marketing@ciglissime.com',
			cta: {
				text: 'Contattaci subito! 📩',
				href: 'mailto:marketing@ciglissime.com',
				external: false,
			},
		},
		{
			icon: Store,
			title: 'RIVENDITORI',
			description:
				"Sei un'estetista o una Lash Maker interessata a introdurre Ciglissime nel tuo salone? Oppure rappresenti un punto vendita e desideri vendere i nostri prodotti?",
			email: 'shop@ciglissime.com',
			cta: {
				text: 'Contattaci subito! 📩',
				href: 'mailto:shop@ciglissime.com',
				external: false,
			},
			extraInfo:
				'Siamo qui per rispondere a ogni tua domanda e offrirti un supporto personalizzato. 💌',
		},
	]

	return (
		<section className="section-padding bg-white">
			<div className="container-custom">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{contactSections.map((section, index) => {
						const Icon = section.icon
						return (
							<Card
								key={index}
								className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-brand-primary/20"
							>
								<CardHeader className="text-center pb-4">
									<div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center">
										<Icon className="h-8 w-8 text-brand-primary" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900">
										{section.title}
									</CardTitle>
								</CardHeader>

								<CardContent className="text-center space-y-4">
									<p className="text-gray-700 leading-relaxed">
										{section.description}
									</p>

									{section.email && (
										<div className="bg-brand-light rounded-lg p-4">
											<Link
												href={`mailto:${section.email}`}
												className="font-bold text-brand-primary hover:underline text-lg"
											>
												{section.email}
											</Link>
										</div>
									)}

									{section.extraInfo && (
										<p className="text-gray-600 text-sm">{section.extraInfo}</p>
									)}

									{section.cta && (
										<Button asChild className="btn-primary w-full">
											<Link
												href={section.cta.href}
												{...(section.cta.external && {
													target: '_blank',
													rel: 'noopener noreferrer',
												})}
											>
												{section.cta.text}
											</Link>
										</Button>
									)}

									{section.hours && (
										<div className="bg-gray-50 rounded-lg p-4 mt-4">
											<div className="flex items-center justify-center space-x-2 text-gray-600">
												<Clock className="h-4 w-4" />
												<span className="text-sm">{section.hours}</span>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default ContactSections

