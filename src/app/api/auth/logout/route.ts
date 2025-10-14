import { clearCustomerAccessToken } from '@/lib/customer-session'

export const dynamic = 'force-dynamic'

export async function POST() {
	try {
		// Simply clear the cookie - no need to invalidate on Shopify
		// The token will expire naturally based on Shopify's settings
		await clearCustomerAccessToken()

		return Response.json({ success: true })
	} catch (error) {
		console.error('Errore logout cliente', error)
		return Response.json(
			{ error: 'Errore inatteso durante il logout' },
			{ status: 500 },
		)
	}
}

