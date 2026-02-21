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
			question: "Cos'è LASHESMOOD?",
			answer:
				'LASHESMOOD nasce come brand di ciglia magnetiche di alta qualità (e non solo), creato per esaltare lo sguardo in modo elegante, confortevole e veloce. Una nuova idea di bellezza: raffinata e senza compromessi.',
		},
		{
			question: 'Qual è la differenza rispetto alle ciglia classiche?',
			answer:
				'Le ciglia classiche richiedono colla, applicazione precisa e tempi più lunghi. Le LASHESMOOD sono magnetiche, si applicano in pochi secondi, senza colla, e offrono comfort, riutilizzo ed eleganza in ogni momento.',
		},
		{
			question: 'Sono facili da applicare?',
			answer:
				'Sì. Le LASHESMOOD sono progettate per essere semplici e intuitive. Come per ogni gesto di make-up, è richiesta solo un minimo di pratica: dopo poche applicazioni diventano rapide, naturali e senza sforzo.',
		},
		{
			question: 'Sono riutilizzabili?',
			answer:
				"Si, sono riutilizzabili più volte per un lungo periodo. Con una corretta applicazione e una pulizia delicata che avviene semplicemente togliendo l'eccesso di mascara con un cotton-fioc dopo ogni utilizzo e riposte nel proprio pack mantengono forma ed eleganza a lungo nel tempo.",
		},
		{
			question: 'Quanto tempo richiede l\'applicazione?',
			answer:
				"All'inizio possono essere necessari alcuni minuti. Con un pizzico di manualità, come per tutte le ciglia sintetiche, l'applicazione diventa via via sempre più rapida, fino a richiedere solo pochi istanti.",
		},
		{
			question: 'Quanto durano durante la giornata?',
			answer:
				'Se applicate correttamente, le LASHESMOOD possono restare perfettamente in posizione per tutto il giorno, facendo attenzione a movimenti bruschi e rimuovendole prima di andare a dormire.',
		},
		{
			question: 'Come si possono rimuovere?',
			answer:
				'Si rimuovono facilmente con le dita sfilandole delicatamente dall\'occhio.',
		},
		{
			question: 'Possono rovinare le ciglia naturali?',
			answer:
				'No. Le LASHESMOOD non utilizzano colla e non esercitano trazione sulle ciglia naturali. Se applicate e rimosse correttamente, non interferiscono col ciglio naturale in nessun modo e garantiscono un utilizzo sicuro e delicato per chiunque le voglia indossare.',
		},
		{
			question: 'Contengono sostanze tossiche?',
			answer:
				'No. Le LASHESMOOD sono realizzate in fibre sintetiche cosmetiche, vegan e cruelty-free, prive di sostanze tossiche. I materiali sono selezionati per essere sicuri per il contatto con l\'area perioculare e conformi agli standard di utilizzo cosmetico.',
		},
		{
			question: 'Sono resistenti all\'acqua?',
			answer:
				'Sì. Le LASHESMOOD presentano una resistenza all\'umidità e agli schizzi, ma non sono progettate per l\'immersione in acqua. Per preservarne adesione, forma e durata, si consiglia l\'applicazione a make-up completato.',
		},
		{
			question: 'Come posso iniziare?',
			answer:
				'Semplicemente acquistando il tuo primo kit LASHESMOOD. Ogni prodotto è pensato per accompagnarti fin dal primo utilizzo, rendendo l\'esperienza intuitiva e immediata.',
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

