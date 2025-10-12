import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const FAQQuickAccess = () => {
	return (
		<section className="section-padding bg-white">
			<div className="container-custom text-center">
				<h2 className="text-3xl font-bold mb-6">Hai una domanda frequente?</h2>
				<p className="text-xl text-gray-600 mb-8">
					Consulta la nostra sezione FAQ per trovare risposte immediate ai dubbi
					più comuni
				</p>
				<Button asChild size="lg" className="btn-primary">
					<Link href="/come-funziona#faq">Vai alle FAQ</Link>
				</Button>
			</div>
		</section>
	)
}

export default FAQQuickAccess

