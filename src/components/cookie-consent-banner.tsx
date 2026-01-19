'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCookieConsent } from '@/context/cookie-consent-context'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function CookieConsentBanner() {
	const { hasConsent, acceptAll, rejectAll, openPreferences } = useCookieConsent()
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Mostra il banner solo se non c'è ancora consenso
		if (!hasConsent) {
			// Delay per animazione
			setTimeout(() => setIsVisible(true), 100)
		}
	}, [hasConsent])

	if (hasConsent || !isVisible) {
		return null
	}

	return (
		<div
			className={`fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg transition-all duration-300 ease-out ${
				isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
			}`}
			role="dialog"
			aria-label="Cookie consent banner"
		>
			<div className="container-custom py-4 md:py-6">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className="flex-1">
						<h3 className="font-semibold text-lg mb-2">Utilizziamo i cookie</h3>
						<p className="text-sm text-gray-300 leading-relaxed">
							Utilizziamo i cookie per migliorare la tua esperienza di navigazione, analizzare il
							traffico del sito e personalizzare i contenuti. Puoi scegliere quali cookie accettare
							o rifiutare.{' '}
							<Link
								href="/politiche/privacy-policy"
								className="underline hover:text-white transition-colors"
							>
								Scopri di più
							</Link>
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
						<Button
							variant="outline"
							size="sm"
							onClick={rejectAll}
							className="bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-white"
						>
							Rifiuta tutto
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={openPreferences}
							className="bg-transparent text-white hover:bg-gray-800 hover:text-white"
						>
							Gestisci preferenze
						</Button>
						<Button
							size="sm"
							onClick={acceptAll}
							className="bg-white text-gray-900 hover:bg-gray-100"
						>
							Accetta tutto
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
