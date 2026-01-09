import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PolicyNotFound() {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center">
			<div className="container-custom py-12 text-center">
				<h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-primary mb-4">
					Politica non trovata
				</h1>
				<p className="text-muted-foreground mb-8 max-w-md mx-auto">
					La politica che stai cercando non è disponibile. Potrebbe essere stata rimossa o il link potrebbe essere errato.
				</p>
				<Link href="/">
					<Button>Torna alla Home</Button>
				</Link>
			</div>
		</div>
	)
}

