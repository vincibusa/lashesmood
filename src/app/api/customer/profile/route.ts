import { getCustomerAccessToken } from '@/lib/customer-session'
import { getCustomerOrders } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const token = await getCustomerAccessToken()

		if (!token) {
			return Response.json({ customer: null }, { status: 200 })
		}

		const customer = await getCustomerOrders({
			customerAccessToken: token,
			first: 1,
		})

		return Response.json({ customer })
	} catch (error) {
		console.error('Errore recupero profilo cliente', error)
		return Response.json({ customer: null }, { status: 200 })
	}
}

