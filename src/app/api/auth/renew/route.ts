import {
	clearCustomerAccessToken,
	getCustomerAccessToken,
	setCustomerAccessToken,
} from '@/lib/customer-session'
import { renewCustomerAccessToken } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export async function POST() {
	try {
		const token = await getCustomerAccessToken()

		if (!token) {
			return Response.json({ error: 'Token non presente' }, { status: 400 })
		}

		const result = await renewCustomerAccessToken(token)

		if (result.userErrors.length > 0 || !result.customerAccessToken) {
			await clearCustomerAccessToken()
			const message =
				result.userErrors[0]?.message ??
				'Impossibile rinnovare il token'
			return Response.json({ error: message }, { status: 401 })
		}

		await setCustomerAccessToken(
			result.customerAccessToken.accessToken,
			result.customerAccessToken.expiresAt,
		)

		return Response.json({
			success: true,
			expiresAt: result.customerAccessToken.expiresAt,
		})
	} catch (error) {
		console.error('Errore rinnovo token', error)
		return Response.json(
			{ error: 'Errore inatteso durante il rinnovo' },
			{ status: 500 },
		)
	}
}

