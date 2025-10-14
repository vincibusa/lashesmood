import React from 'react'

const HowItWorks = () => {
	return (
		<section className="section-padding bg-white">
			<div className="container-custom max-w-4xl">
				<h2 className="text-3xl font-bold text-center mb-12">
					Come <em className="italic text-brand-primary">funziona</em>
				</h2>

				<div className="prose prose-lg max-w-none">
					<div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl p-8 mb-8">
						<h3 className="text-2xl font-bold mb-4 text-center">
							Cos&apos;è LASHESMOOD?
						</h3>
						<p className="text-lg leading-relaxed text-center">
							Lashesmood è un sistema di Lash Extension semi-permanente che puoi
							applicare a casa da solə in
							<strong className="text-brand-primary"> meno di 2 minuti</strong>.
							Ogni set che crei dura
							<strong className="text-brand-primary"> dai 5-10 giorni</strong>,
							la scelta è tua! Il nostro sistema è rivoluzionario, non rovina le
							tue ciglia naturali e si adatta a tutte le forme degli occhi.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks

