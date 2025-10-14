import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQ {
	question: string
	answer: string
}

const FAQSection = () => {
	const faqs: FAQ[] = [
		{
			question: "Cos'è LASHESMOOD?",
			answer:
				'Lashesmood è un sistema di Lash Extension semi-permanente che puoi applicare a casa da solə in meno di 2 minuti. Ogni set che crei dura dai 5-10 giorni, la scelta è tua! Il nostro sistema è rivoluzionario, non rovina le tue ciglia naturali e si adatta a tutte le forme degli occhi.',
		},
		{
			question: "Che differenza c'è tra tecnologia Regular e Press&GO?",
			answer:
				"La tecnologia Regular comprende l'uso di colla (Bond&Seal) e hanno una durata maggiore circa di 10 giorni. La tecnologia Press&GO! NON comprende la colla, quindi l'applicazione risulta essere di solo un passaggio e sarà più veloce con una tenuta dai 3-7 giorni. Tutti i modelli sono riutilizzabili con Bond&Seal",
		},
		{
			question: 'Lashesmood sono facili da applicare?',
			answer:
				'Lashesmood sono facili e veloci da applicare, ma sappiamo che ognuno ha la propria manualità e che le prime volte potrebbe volerci un pizzico di pratica. Come per qualsiasi cosa nel makeup, più le usi, più diventa naturale! 💕',
		},
		{
			question: 'Quanto durano?',
			answer:
				'Ogni paia dura dai 5-10 giorni o se preferisci, solo per un evento speciale. Dipende solo da te! Tutto sta nel modo in cui le applichi e da come le curi. La durata maggiore potrai ottenerla solo facendo pratica!',
		},
		{
			question: 'Quanto tempo ci vuole per applicarle?',
			answer: 'Solo pochissimi minuti, forse secondi!',
		},
		{
			question: 'Possono rovinare le ciglia naturali?',
			answer:
				'Assolutamente no. La tecnica di applicazione per LASHESMOOD permette di non intaccare minimamente la salute delle tue ciglia. Nessuna sensazione di pesantezza, ti sembrerà di non averle addosso. Prova per credere.',
		},
		{
			question: 'LASHESMOOD sono Waterproof?',
			answer:
				"Lashesmood sono resistenti all'acqua e al mare. Puoi fare la doccia, nuotare, fare sport acquatici e fare sport mentre indossi Lashesmood. L'unica raccomandazione è attendere 24 ore prima di bagnarle dopo l'applicazione e di stare attenta al vapore.",
		},
		{
			question: 'LASHESMOOD sono riutilizzabili?',
			answer: 'Lashesmood sono riutilizzabili sia con Bond&Seal o con Glue Pads',
		},
		{
			question: 'Come faccio ad iniziare?',
			answer:
				'Tutto ciò di cui hai bisogno per iniziare è disponibile nel nostro Kit che acquisterai SOLO una volta!',
		},
		{
			question: 'Le ciglia sono in plastica?',
			answer:
				'Assolutamente No. Le ciglia sono in PLA, che é una bioplastica biodegradabile e compostabile. Le ciglia come tutti i nostri altri prodotti sono Vegan & Cruelty Free.',
		},
	]

	return (
		<section className="section-padding bg-white">
			<div className="container-custom max-w-3xl">
				<h2 className="text-3xl font-bold text-center mb-12">
					Domande Frequenti
				</h2>

				<Accordion type="single" collapsible className="space-y-4">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="bg-brand-light rounded-lg border-0"
						>
							<AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
								<span className="font-semibold">{faq.question}</span>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4">
								<p className="text-gray-700 leading-relaxed">{faq.answer}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default FAQSection

