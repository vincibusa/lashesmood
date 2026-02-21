import React from 'react'
import Image from 'next/image'

const STEPS = [
	{
		step: 1,
		title: 'Velo di mascara',
		image: '/step1.jpg',
		body: (
			<>
				<p className="mb-3">
					Assicurati che le ciglia naturali siano pulite e ben pettinate, per
					creare una base ordinata e uniforme.
				</p>
				<p>
					Applica un leggero velo di mascara per aumentare l’aderenza e favorire
					una migliore stabilità delle ciglia magnetiche.
				</p>
			</>
		),
	},
	{
		step: 2,
		title: 'Preparazione delle ciglia magnetiche',
		image: '/step2.jpg',
		body: (
			<>
				<p className="mb-3">
					Preleva delicatamente il paio di ciglia iniziando dalle destre o
					sinistre.
				</p>
				<p>
					Se necessario, utilizza una pinzetta e separa con cura le due bande
					magnetiche, aiutandoti anche con le dita.
				</p>
			</>
		),
	},
	{
		step: 3,
		title: 'Posizionamento delle ciglia nell’applicatore',
		image: '/step3.jpg',
		body: (
			<>
				<p className="mb-3">
					Posiziona correttamente le ciglia nell’applicatore, seguendo le
					indicazioni colorate.
				</p>
				<p>
					In alternativa, fai riferimento alle fibre: la banda con ciglia più
					folte va sempre in “UP”, mentre la banda con ciglia più vuote va in
					“DOWN”.
				</p>
			</>
		),
	},
	{
		step: 'finale',
		title: 'Chiusura dell’applicatore',
		image: '/step4.jpg',
		body: (
			<>
				<p className="mb-3">
					Avvicina l’applicatore all’occhio corrispondente. Guardando in basso,
					allinea la clip superiore con la rima cigliare superiore.
				</p>
				<p className="mb-3">
					Avvicina le due parti dell’applicatore per far combaciare la parte UP
					con la parte DOWN, consentendo l’unione delle bande magnetiche in modo
					preciso e uniforme.
				</p>
				<p>
					Puoi aiutarti con una pinzetta per perfezionare la chiusura, se
					necessario.
				</p>
			</>
		),
	},
	{
		step: 5,
		title: 'Rimozione dopo l’utilizzo',
		image: null,
		body: (
			<p>
				Le ciglia finte si rimuovono facilmente con le dita, sfilandole
				delicatamente dall’occhio.
			</p>
		),
	},
]

function ApplicationSteps() {
	return (
		<section
			id="istruzioni"
			className="section-padding bg-white"
			aria-labelledby="istruzioni-title"
		>
			<div className="container-custom">
				<h2
					id="istruzioni-title"
					className="text-3xl font-bold text-center mb-12"
				>
					Istruzioni <em className="italic text-brand-primary">step by step</em>
				</h2>

				<div className="max-w-4xl mx-auto space-y-16">
					{STEPS.map((item, index) => (
						<article
							key={index}
							className="flex flex-col gap-6 md:gap-8"
							aria-labelledby={`step-${index}-title`}
						>
							<div className="flex items-center gap-3">
								<span
									className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary font-bold text-lg"
									aria-hidden
								>
									{item.step === 'finale' ? '✓' : item.step}
								</span>
								<h3
									id={`step-${index}-title`}
									className="text-xl md:text-2xl font-bold"
								>
									{item.step === 'finale' ? 'Step finale — ' : `Step ${item.step} — `}
									{item.title}
								</h3>
							</div>

							<div
								className={
									item.image
										? 'flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-8'
										: ''
								}
							>
								{item.image && (
									<div className="relative aspect-[4/3] md:w-[min(45%,320px)] shrink-0 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
										<Image
											src={item.image}
											alt={`Step ${item.step}: ${item.title}`}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 320px"
										/>
									</div>
								)}
								<div
									className={
										item.image ? 'md:max-w-md' : 'rounded-2xl border border-border bg-brand-light/30 p-6'
									}
								>
									<div className="text-muted-foreground leading-relaxed space-y-3">
										{item.body}
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default ApplicationSteps
