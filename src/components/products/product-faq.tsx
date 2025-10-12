import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const ProductFAQ = () => {
	const faqs = [
		{
			question: "Cos'è CIGLISSIME?",
			answer:
				'Ciglissime è un sistema di Lash Extension semi-permanente che puoi applicare a casa da solə in meno di 2 minuti. Ogni paia di ciglia può avere una durata dai 5-10 giorni, la scelta è tua!',
		},
		{
			question: 'Possono rovinare le ciglia naturali?',
			answer:
				'Assolutamente no. CIGLISSIME permette di non intaccare minimamente la salute delle tue ciglia. Nessuna sensazione di pesantezza, ti sembrerà di non averle addosso.',
		},
		{
			question: 'CIGLISSIME sono Waterproof?',
			answer:
				"Ciglissime sono resistenti all'acqua. Puoi fare la doccia, nuotare, fare sport acquatici mentre indossi Ciglissime. L'unica raccomandazione è attendere 24 ore prima di bagnarle dopo l'applicazione.",
		},
	]

	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom max-w-3xl">
				<h2 className="text-2xl font-bold text-center mb-8">FAQs</h2>
				<Accordion type="single" collapsible className="space-y-4">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="bg-white rounded-lg border"
						>
							<AccordionTrigger className="px-6 py-4 hover:no-underline">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default ProductFAQ

