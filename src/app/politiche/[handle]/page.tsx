import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getShopPolicyByHandle, getShopPolicies } from '@/lib/shopify'

interface PolicyPageProps {
	params: Promise<{
		handle: string
	}>
}

export async function generateStaticParams() {
	try {
		const policies = await getShopPolicies()
		
		// Map common policy handles
		const commonHandles = [
			'privacy-policy',
			'refund-policy',
			'shipping-policy',
			'terms-of-service',
		]

		// Combine Shopify policies with common handles
		const handles = [
			...commonHandles,
			...policies.map((policy) => policy.handle),
		]

		// Remove duplicates
		const uniqueHandles = [...new Set(handles)]

		return uniqueHandles.map((handle) => ({
			handle: handle.toLowerCase(),
		}))
	} catch (error) {
		console.error('Error generating static params for policies:', error)
		// Return at least the common handles as fallback
		return [
			{ handle: 'privacy-policy' },
			{ handle: 'refund-policy' },
			{ handle: 'shipping-policy' },
			{ handle: 'terms-of-service' },
		]
	}
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
	const { handle } = await params
	const policy = await getShopPolicyByHandle(handle)

	if (!policy) {
		return {
			title: 'Politica non trovata | LASHESMOOD',
		}
	}

	return {
		title: `${policy.title} | LASHESMOOD`,
		description: `Leggi la ${policy.title.toLowerCase()} di Lashesmood`,
	}
}

export default async function PolicyPage({ params }: PolicyPageProps) {
	const { handle } = await params
	const policy = await getShopPolicyByHandle(handle)

	if (!policy) {
		// Show a helpful message instead of 404
		const policyNames: Record<string, string> = {
			'privacy-policy': 'Informativa sulla Privacy',
			'refund-policy': 'Politica di Reso',
			'shipping-policy': 'Politica di Spedizione',
			'terms-of-service': 'Termini e Condizioni',
		}

		const policyName = policyNames[handle.toLowerCase()] || 'Politica'

		return (
			<div className="min-h-screen bg-white">
				<div className="bg-brand-light border-b border-gray-100">
					<div className="container-custom py-12 md:py-16">
						<h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-primary">
							{policyName}
						</h1>
					</div>
				</div>

				<div className="container-custom py-12 md:py-16">
					<div className="max-w-4xl mx-auto">
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
							<h2 className="font-playfair text-2xl font-semibold text-yellow-900 mb-3">
								Politica non ancora disponibile
							</h2>
							<p className="text-yellow-800 mb-4">
								La {policyName.toLowerCase()} non è ancora stata configurata nel tuo negozio Shopify.
							</p>
							<p className="text-yellow-800">
								Per aggiungere questa politica, vai su <strong>Impostazioni → Politiche</strong> nel tuo pannello di controllo Shopify e crea la pagina corrispondente.
							</p>
						</div>
						<div className="prose prose-lg max-w-none text-gray-700">
							<p>
								Questa pagina verrà aggiornata automaticamente una volta che avrai configurato la politica nel tuo negozio Shopify.
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<div className="bg-brand-light border-b border-gray-100">
				<div className="container-custom py-12 md:py-16">
					<h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-primary">
						{policy.title}
					</h1>
				</div>
			</div>

			{/* Policy Content */}
			<div className="container-custom py-12 md:py-16">
				<div className="max-w-4xl mx-auto">
					<div
						className="prose prose-lg max-w-none
							prose-headings:font-playfair prose-headings:text-brand-primary
							prose-p:text-gray-700 prose-p:leading-relaxed
							prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
							prose-strong:text-brand-primary
							prose-ul:text-gray-700 prose-ol:text-gray-700
							prose-li:my-2"
						dangerouslySetInnerHTML={{ __html: policy.body }}
					/>
				</div>
			</div>
		</div>
	)
}

