import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCustomerAccessToken } from '@/lib/customer-session'
import { getCustomerOrders } from '@/lib/shopify'

export default async function AccountPage() {
	const accessToken = await getCustomerAccessToken()

	if (!accessToken) {
		redirect('/account/login')
	}

	const customer = await getCustomerOrders({
		customerAccessToken: accessToken,
		first: 5,
	})

	if (!customer) {
		redirect('/account/login')
	}

	return (
		<div className="space-y-10">
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Ciao, {customer.displayName || 'Cliente'}
				</h1>
				<p className="text-gray-600">
					Benvenuta/o nella tua area personale Ciglissime. Qui puoi controllare lo stato dei tuoi ordini,
					gestire le informazioni del profilo e scoprire le ultime novità.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-900">Ultimi ordini</h2>
						<Link href="/account/orders" className="text-sm font-medium text-brand-primary">
							Vedi tutti
						</Link>
					</div>
					{customer.orders.edges.length === 0 ? (
						<p className="text-sm text-gray-500">Non hai ancora effettuato ordini.</p>
					) : (
						<ul className="space-y-4">
							{customer.orders.edges.map(({ node }) => (
								<li key={node.id} className="border border-gray-100 rounded-lg p-4">
									<div className="flex flex-wrap items-center justify-between gap-4">
										<div>
											<p className="text-sm font-semibold text-gray-900">Ordine {node.name}</p>
											<p className="text-xs text-gray-500">
												{new Date(node.processedAt).toLocaleDateString('it-IT')}
											</p>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium text-gray-900">
												€{Number(node.currentTotalPrice.amount).toFixed(2)}
											</p>
											<p className="text-xs text-gray-500">{node.financialStatus ?? 'In elaborazione'}</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
					<h2 className="text-xl font-semibold text-gray-900">Dettagli account</h2>
					<div className="space-y-2 text-sm text-gray-600">
						<p>
							<span className="font-medium">Email:</span> {customer.email ?? '—'}
						</p>
						<p>
							<span className="font-medium">Ordini totali:</span> {customer.numberOfOrders}
						</p>
					</div>
					<Link
						href="/account/orders"
						className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 transition"
					>
						Vai ai tuoi ordini
					</Link>
				</div>
			</div>
		</div>
	)
}

