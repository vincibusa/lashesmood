import React from 'react'
import { BookOpen } from 'lucide-react'
import type { ProductType } from '@/components/come-funziona/types'

const CONTENT: Record<
	ProductType,
	{ title: string; body: React.ReactNode }
> = {
	all: {
		title: "Cos'è LASHESMOOD?",
		body: (
			<>
				Lashesmood è un sistema di Lash Extension semi-permanente che puoi
				applicare a casa da solə in{' '}
				<strong className="text-foreground text-brand-primary">meno di 2 minuti</strong>.
				Ogni set che crei dura{' '}
				<strong className="text-foreground text-brand-primary">dai 5-10 giorni</strong>,
				la scelta è tua! Il nostro sistema è rivoluzionario, non rovina le
				tue ciglia naturali e si adatta a tutte le forme degli occhi.
			</>
		),
	},
	'press-go': {
		title: 'Come funzionano le Press&GO!',
		body: (
			<>
				Le Press&GO! <strong className="text-foreground text-brand-primary">non usano colla</strong>:
				hai già l’adesivo sulla base. Premi il ciuffetto sulla rima cigliare e
				sei pronta. Applicazione in pochi secondi, tenuta{' '}
				<strong className="text-foreground text-brand-primary">3-7 giorni</strong>.
				Ideali per chi vuole velocità e zero passaggi. Si possono riutilizzare
				con Bond&Seal quando vuoi prolungare la durata.
			</>
		),
	},
	regular: {
		title: 'Come funzionano le Regular',
		body: (
			<>
				Le Regular si applicano con <strong className="text-foreground text-brand-primary">Bond&Seal</strong>:
				un passaggio di colla sulla base delle ciglia naturali, poi appoggi il
				ciuffetto a 1-2 mm dalla rima. Durata fino a{' '}
				<strong className="text-foreground text-brand-primary">10 giorni</strong>.
				Un po’ più di pratica rispetto alle Press&GO!, ma risultati da salone
				e massima tenuta.
			</>
		),
	},
}

interface HowItWorksProps {
	productType: ProductType
}

const HowItWorks = ({ productType }: HowItWorksProps) => {
	const { title, body } = CONTENT[productType]
	return (
		<section id="guida" className="section-padding bg-white" aria-labelledby="guida-title">
			<div className="container-custom max-w-4xl">
				<h2 id="guida-title" className="text-3xl font-bold text-center mb-12">
					Come <em className="italic text-brand-primary">funziona</em>
				</h2>

				<div className="rounded-2xl border border-border bg-gradient-to-br from-brand-primary/5 to-brand-secondary/10 p-8 md:p-10 shadow-sm">
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/15">
							<BookOpen className="h-6 w-6 text-brand-primary" aria-hidden />
						</div>
						<h3 className="text-xl md:text-2xl font-bold mb-4">
							{title}
						</h3>
						<p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
							{body}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks

