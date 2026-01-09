'use client'

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
	category: string
}

const FAQSection = () => {
	const faqs: FAQ[] = [
		// Categoria: Informazioni Generali
		{
			category: 'Informazioni Generali',
			question: "Cos'è LASHESMOOD?",
			answer:
				'Lashesmood è un sistema di Lash Extension semi-permanente che puoi applicare a casa da solə in meno di 2 minuti. Ogni set che crei dura dai 5-10 giorni, la scelta è tua! Il nostro sistema è rivoluzionario, non rovina le tue ciglia naturali e si adatta a tutte le forme degli occhi.',
		},
		{
			category: 'Informazioni Generali',
			question: 'Le ciglia sono in plastica?',
			answer:
				'Assolutamente No. Le ciglia sono in PLA, che é una bioplastica biodegradabile e compostabile. Le ciglia come tutti i nostri altri prodotti sono Vegan & Cruelty Free.',
		},
		{
			category: 'Informazioni Generali',
			question: 'Come faccio ad iniziare?',
			answer:
				'Tutto ciò di cui hai bisogno per iniziare è disponibile nel nostro Kit che acquisterai SOLO una volta!',
		},
		// Categoria: Tecnologie
		{
			category: 'Tecnologie',
			question: "Che differenza c'è tra tecnologia Regular e Press&GO?",
			answer:
				"La tecnologia Regular comprende l'uso di colla (Bond&Seal) e hanno una durata maggiore circa di 10 giorni. La tecnologia Press&GO! NON comprende la colla, quindi l'applicazione risulta essere di solo un passaggio e sarà più veloce con una tenuta dai 3-7 giorni. Tutti i modelli sono riutilizzabili con Bond&Seal",
		},
		{
			category: 'Tecnologie',
			question: 'LASHESMOOD sono riutilizzabili?',
			answer: 'Lashesmood sono riutilizzabili sia con Bond&Seal o con Glue Pads',
		},
		// Categoria: Applicazione
		{
			category: 'Applicazione',
			question: 'Lashesmood sono facili da applicare?',
			answer:
				'Lashesmood sono facili e veloci da applicare, ma sappiamo che ognuno ha la propria manualità e che le prime volte potrebbe volerci un pizzico di pratica. Come per qualsiasi cosa nel makeup, più le usi, più diventa naturale! 💕',
		},
		{
			category: 'Applicazione',
			question: 'Quanto tempo ci vuole per applicarle?',
			answer: 'Solo pochissimi minuti, forse secondi!',
		},
		{
			category: 'Applicazione',
			question: 'Possono rovinare le ciglia naturali?',
			answer:
				'Assolutamente no. La tecnica di applicazione per LASHESMOOD permette di non intaccare minimamente la salute delle tue ciglia. Nessuna sensazione di pesantezza, ti sembrerà di non averle addosso. Prova per credere.',
		},
		// Categoria: Durata e Cura
		{
			category: 'Durata e Cura',
			question: 'Quanto durano?',
			answer:
				'Ogni paia dura dai 5-10 giorni o se preferisci, solo per un evento speciale. Dipende solo da te! Tutto sta nel modo in cui le applichi e da come le curi. La durata maggiore potrai ottenerla solo facendo pratica!',
		},
		{
			category: 'Durata e Cura',
			question: 'LASHESMOOD sono Waterproof?',
			answer:
				"Lashesmood sono resistenti all'acqua e al mare. Puoi fare la doccia, nuotare, fare sport acquatici e fare sport mentre indossi Lashesmood. L'unica raccomandazione è attendere 24 ore prima di bagnarle dopo l'applicazione e di stare attenta al vapore.",
		},
		{
			category: 'Durata e Cura',
			question: 'Come posso rimuoverle?',
			answer:
				'Per rimuovere le Lashesmood, puoi utilizzare il nostro Bond&Seal Remover o un olio delicato. Applica il prodotto lungo la linea delle ciglia, attendi qualche minuto e poi rimuovi delicatamente le ciglia. Non forzare mai la rimozione per evitare di danneggiare le tue ciglia naturali.',
		},
		// Categoria: Ordini e Spedizioni
		{
			category: 'Ordini e Spedizioni',
			question: 'Quanto tempo impiega la spedizione?',
			answer:
				'Le spedizioni in Italia generalmente arrivano in 2-4 giorni lavorativi. Per le spedizioni internazionali, i tempi possono variare da 5 a 10 giorni lavorativi a seconda della destinazione.',
		},
		{
			category: 'Ordini e Spedizioni',
			question: 'Offrite spedizioni gratuite?',
			answer:
				'Sì! Offriamo spedizione gratuita per ordini superiori a una certa soglia. Controlla la pagina del carrello per vedere se il tuo ordine qualifica per la spedizione gratuita.',
		},
		{
			category: 'Ordini e Spedizioni',
			question: 'Posso modificare o cancellare il mio ordine?',
			answer:
				'Puoi modificare o cancellare il tuo ordine entro le prime 2 ore dalla conferma. Dopo questo periodo, contattaci direttamente via email e faremo del nostro meglio per aiutarti.',
		},
		// Categoria: Resi e Rimborsi
		{
			category: 'Resi e Rimborsi',
			question: 'Qual è la vostra politica di reso?',
			answer:
				'Accettiamo resi entro 14 giorni dalla data di ricevimento. I prodotti devono essere in condizioni originali, non utilizzati e nella confezione originale. Per maggiori dettagli, consulta la nostra pagina delle politiche di reso.',
		},
		{
			category: 'Resi e Rimborsi',
			question: 'Quanto tempo ci vuole per ricevere il rimborso?',
			answer:
				'Una volta ricevuto e verificato il prodotto reso, il rimborso verrà elaborato entro 5-7 giorni lavorativi. Il credito apparirà sul tuo metodo di pagamento originale entro 10-14 giorni lavorativi.',
		},
	]

	// Raggruppa le FAQ per categoria
	const faqsByCategory = faqs.reduce((acc, faq) => {
		if (!acc[faq.category]) {
			acc[faq.category] = []
		}
		acc[faq.category].push(faq)
		return acc
	}, {} as Record<string, FAQ[]>)

	const categories = Object.keys(faqsByCategory)

	return (
		<section className="section-padding bg-white">
			<div className="container-custom max-w-4xl">
				<div className="space-y-12">
					{categories.map((category) => (
						<div key={category}>
							<h2 className="text-2xl md:text-3xl font-bold text-brand-accent mb-6 text-center">
								{category}
							</h2>
							<Accordion type="single" collapsible className="space-y-4">
								{faqsByCategory[category].map((faq, index) => (
									<AccordionItem
										key={index}
										value={`${category}-${index}`}
										className="bg-brand-light rounded-lg border-0"
									>
										<AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
											<span className="font-semibold text-brand-accent">
												{faq.question}
											</span>
										</AccordionTrigger>
										<AccordionContent className="px-6 pb-4">
											<p className="text-gray-700 leading-relaxed">
												{faq.answer}
											</p>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default FAQSection

