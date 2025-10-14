import React from 'react'
import Link from 'next/link'
import { Mail, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ContactCTA = () => {
	return (
		<section className="section-padding bg-gradient-to-r from-brand-primary to-brand-secondary">
			<div className="container-custom text-center">
				<div className="max-w-2xl mx-auto text-white">
					<h2 className="text-3xl font-bold mb-6">
						Non hai trovato quello che cercavi?
					</h2>
					<p className="text-xl mb-8 opacity-90">
						Scrivici direttamente! Il nostro team è sempre pronto ad aiutarti
						con qualsiasi domanda o richiesta speciale.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							asChild
							size="lg"
							className="bg-white text-brand-primary hover:bg-gray-100 font-medium px-8 py-4"
						>
							<Link href="mailto:shop@lashesmood.com">
								<Mail className="h-5 w-5 mr-2" />
								Invia Email
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-brand-primary px-8 py-4"
						>
							<Link
								href="https://ig.me/m/lashesmood"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram className="h-5 w-5 mr-2" />
								Chat Instagram
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactCTA

