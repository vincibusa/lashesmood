import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import type { ProductType } from '@/components/come-funziona/types'

type FAQType = 'common' | 'press-go' | 'regular'

interface FAQ {
	question: string
	answer: string
	type: FAQType
}

const ALL_FAQS: FAQ[] = [
	{
		question: "Cos'è LASHESMOOD?",
		answer:
			'Lashesmood è un sistema di Lash Extension semi-permanente che puoi applicare a casa da solə in meno di 2 minuti. Ogni set che crei dura dai 5-10 giorni, la scelta è tua! Il nostro sistema è rivoluzionario, non rovina le tue ciglia naturali e si adatta a tutte le forme degli occhi.',
		type: 'common',
	},
	{
		question: "Che differenza c'è tra tecnologia Regular e Press&GO?",
		answer:
			"La tecnologia Regular comprende l'uso di colla (Bond&Seal) e hanno una durata maggiore circa di 10 giorni. La tecnologia Press&GO! NON comprende la colla, quindi l'applicazione risulta essere di solo un passaggio e sarà più veloce con una tenuta dai 3-7 giorni. Tutti i modelli sono riutilizzabili con Bond&Seal",
		type: 'common',
	},
	{
		question: 'Lashesmood sono facili da applicare?',
		answer:
			'Lashesmood sono facili e veloci da applicare, ma sappiamo che ognuno ha la propria manualità e che le prime volte potrebbe volerci un pizzico di pratica. Come per qualsiasi cosa nel makeup, più le usi, più diventa naturale!',
		type: 'common',
	},
	{
		question: 'Quanto durano?',
		answer:
			'Ogni paia dura dai 5-10 giorni o se preferisci, solo per un evento speciale. Dipende solo da te! Tutto sta nel modo in cui le applichi e da come le curi. La durata maggiore potrai ottenerla solo facendo pratica!',
		type: 'common',
	},
	{
		question: 'Quanto tempo ci vuole per applicarle?',
		answer: 'Solo pochissimi minuti, forse secondi!',
		type: 'common',
	},
	{
		question: 'Possono rovinare le ciglia naturali?',
		answer:
			'Assolutamente no. La tecnica di applicazione per LASHESMOOD permette di non intaccare minimamente la salute delle tue ciglia. Nessuna sensazione di pesantezza, ti sembrerà di non averle addosso. Prova per credere.',
		type: 'common',
	},
	{
		question: 'LASHESMOOD sono Waterproof?',
		answer:
			"Lashesmood sono resistenti all'acqua e al mare. Puoi fare la doccia, nuotare, fare sport acquatici e fare sport mentre indossi Lashesmood. L'unica raccomandazione è attendere 24 ore prima di bagnarle dopo l'applicazione e di stare attenta al vapore.",
		type: 'common',
	},
	{
		question: 'LASHESMOOD sono riutilizzabili?',
		answer: 'Lashesmood sono riutilizzabili sia con Bond&Seal o con Glue Pads',
		type: 'common',
	},
	{
		question: 'Come faccio ad iniziare?',
		answer:
			'Tutto ciò di cui hai bisogno per iniziare è disponibile nel nostro Kit che acquisterai SOLO una volta!',
		type: 'common',
	},
	{
		question: 'Le ciglia sono in plastica?',
		answer:
			'Assolutamente No. Le ciglia sono in PLA, che é una bioplastica biodegradabile e compostabile. Le ciglia come tutti i nostri altri prodotti sono Vegan & Cruelty Free.',
		type: 'common',
	},
	{
		question: 'Come si applicano le Press&GO!?',
		answer:
			'Senza colla: stacca il ciuffetto dal supporto e appoggialo sulla rima cigliare, premendo leggermente. Niente Bond&Seal per l’applicazione. Tenuta 3-7 giorni. Per riutilizzarle puoi usare Bond&Seal.',
		type: 'press-go',
	},
	{
		question: 'Come si applicano le Regular?',
		answer:
			'Applica una piccola quantità di Bond&Seal sulla base delle ciglia naturali, poi posiziona il ciuffetto a 1-2 mm dalla rima. Tieni qualche secondo. Durata fino a 10 giorni.',
		type: 'regular',
	},
]

function filterFaqs(productType: ProductType): FAQ[] {
	if (productType === 'all') return ALL_FAQS
	return ALL_FAQS.filter((f) => f.type === 'common' || f.type === productType)
}

interface FAQSectionProps {
	productType: ProductType
}

const FAQSection = ({ productType }: FAQSectionProps) => {
	const faqs = filterFaqs(productType)

	return (
		<section id="faq" className="section-padding bg-white" aria-labelledby="faq-title">
			<div className="container-custom max-w-3xl">
				<div className="text-center mb-10">
					<h2 id="faq-title" className="text-3xl font-bold mb-3">
						Domande Frequenti
					</h2>
					<p className="text-muted-foreground text-lg max-w-xl mx-auto">
						Risposte alle domande più richieste su applicazione, durata e cura delle Lashesmood
					</p>
				</div>

				<Accordion type="single" collapsible className="space-y-3">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={faq.question}
							value={`item-${index}`}
							className="rounded-xl border border-border bg-brand-light/50 data-[state=open]:bg-brand-light"
						>
							<AccordionTrigger className="min-h-[44px] px-6 py-4 hover:no-underline text-left rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=open]]:rounded-b-none">
								<span className="font-semibold text-left pr-2">{faq.question}</span>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-0">
								<p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default FAQSection

