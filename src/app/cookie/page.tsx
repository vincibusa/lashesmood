'use client'

import { useState, useEffect } from 'react'
import { useCookieConsent, type CookiePreferences, defaultPreferences } from '@/context/cookie-consent-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const cookieCategories = [
	{
		id: 'necessary' as const,
		title: 'Cookie Necessari',
		description:
			'Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati. Includono cookie per la sicurezza, la gestione del carrello e altre funzionalità di base.',
		required: true,
	},
	{
		id: 'functional' as const,
		title: 'Cookie Funzionali',
		description:
			'Questi cookie permettono al sito di ricordare le tue scelte (come lingua o regione) per fornire funzionalità migliorate e personalizzate.',
		required: false,
	},
	{
		id: 'analytics' as const,
		title: 'Cookie Analitici',
		description:
			'Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo informazioni in forma anonima. Questo ci permette di migliorare il sito.',
		required: false,
	},
	{
		id: 'marketing' as const,
		title: 'Cookie Marketing',
		description:
			'Questi cookie vengono utilizzati per mostrarti annunci pubblicitari rilevanti e tracciare l\'efficacia delle campagne pubblicitarie.',
		required: false,
	},
]

export default function CookiePreferencesPage() {
	const { preferences, acceptAll, updatePreferences } = useCookieConsent()
	const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(defaultPreferences)
	const [saved, setSaved] = useState(false)

	useEffect(() => {
		if (preferences) {
			setLocalPreferences(preferences)
		} else {
			setLocalPreferences(defaultPreferences)
		}
	}, [preferences])

	const handleToggle = (category: keyof CookiePreferences) => {
		if (category === 'necessary') return // I cookie necessari non possono essere disattivati
		setLocalPreferences((prev) => ({
			...prev,
			[category]: !prev[category],
		}))
		setSaved(false)
	}

	const handleSave = () => {
		updatePreferences(localPreferences)
		setSaved(true)
		setTimeout(() => setSaved(false), 3000)
	}

	return (
		<div className="container-custom py-12">
			<Link
				href="/"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				Torna alla home
			</Link>

			<div className="max-w-3xl mx-auto">
				<h1 className="font-playfair text-4xl font-bold mb-4">Gestione Preferenze Cookie</h1>
				<p className="text-muted-foreground mb-8">
					Puoi scegliere quali categorie di cookie accettare. I cookie necessari sono sempre
					attivi perché essenziali per il funzionamento del sito.{' '}
					<Link href="/politiche/privacy-policy" className="underline hover:text-foreground">
						Leggi la nostra Privacy Policy
					</Link>
				</p>

				<div className="space-y-4 mb-8">
					{cookieCategories.map((category) => (
						<div key={category.id} className="border rounded-lg p-6 space-y-3">
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold text-lg">{category.title}</h3>
										{category.required && (
											<span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
												Sempre attivo
											</span>
										)}
									</div>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{category.description}
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
									<input
										type="checkbox"
										checked={localPreferences[category.id]}
										onChange={() => handleToggle(category.id)}
										disabled={category.required}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
								</label>
							</div>
						</div>
					))}
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<Button variant="outline" onClick={acceptAll} className="w-full sm:w-auto">
						Accetta tutto
					</Button>
					<Button onClick={handleSave} className="w-full sm:flex-1">
						{saved ? 'Preferenze salvate!' : 'Salva preferenze'}
					</Button>
				</div>
			</div>
		</div>
	)
}
