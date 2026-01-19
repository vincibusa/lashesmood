'use client'

import { useState, useEffect } from 'react'
import { useCookieConsent, type CookiePreferences } from '@/context/cookie-consent-context'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { defaultPreferences } from '@/context/cookie-consent-context'

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

export default function CookiePreferencesModal() {
	const { preferences, isPreferencesOpen, closePreferences, acceptAll, updatePreferences } = useCookieConsent()
	const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(defaultPreferences)

	useEffect(() => {
		if (preferences) {
			setLocalPreferences(preferences)
		} else {
			setLocalPreferences(defaultPreferences)
		}
	}, [preferences, isPreferencesOpen])

	const handleToggle = (category: keyof CookiePreferences) => {
		if (category === 'necessary') return // I cookie necessari non possono essere disattivati
		setLocalPreferences((prev) => ({
			...prev,
			[category]: !prev[category],
		}))
	}

	const handleSave = () => {
		updatePreferences(localPreferences)
	}

	return (
		<Dialog open={isPreferencesOpen} onOpenChange={closePreferences}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Gestione Preferenze Cookie</DialogTitle>
					<DialogDescription>
						Puoi scegliere quali categorie di cookie accettare. I cookie necessari sono sempre
						attivi perché essenziali per il funzionamento del sito.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					{cookieCategories.map((category) => (
						<div
							key={category.id}
							className="border rounded-lg p-4 space-y-2"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-1">
										<h4 className="font-semibold text-sm">{category.title}</h4>
										{category.required && (
											<span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
												Sempre attivo
											</span>
										)}
									</div>
									<p className="text-sm text-muted-foreground">{category.description}</p>
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

				<DialogFooter className="flex-col sm:flex-row gap-2">
					<Button variant="outline" onClick={closePreferences} className="w-full sm:w-auto">
						Annulla
					</Button>
					<Button variant="secondary" onClick={acceptAll} className="w-full sm:w-auto">
						Accetta tutto
					</Button>
					<Button onClick={handleSave} className="w-full sm:w-auto">
						Salva preferenze
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
