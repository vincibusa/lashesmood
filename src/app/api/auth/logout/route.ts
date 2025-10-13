import { deleteCustomerAccessToken } from '@/lib/shopify'
import {
	clearCustomerAccessToken,
	getCustomerAccessToken,
} from '@/lib/customer-session'

export const dynamic = 'force-dynamic'

export async function POST() {
	try {
		const token = await getCustomerAccessToken()

		if (token) {
			await deleteCustomerAccessToken(token)
		}

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

