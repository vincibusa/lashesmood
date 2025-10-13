import { createCustomerAccessToken } from '@/lib/shopify'
import { clearCustomerAccessToken, setCustomerAccessToken } from '@/lib/customer-session'

export const dynamic = 'force-dynamic'

interface LoginPayload {
	email?: string
	password?: string
}

export async function POST(request: Request) {
	try {
		const body = (await request.json().catch(() => ({}))) as LoginPayload
		const email = body.email?.trim()
		const password = body.password

		console.log('🔐 [LOGIN] Request received:', {
			email,
			hasPassword: !!password,
		})

		if (!email || !password) {
			console.log('❌ [LOGIN] Validation failed: missing email or password')
			return Response.json(
				{ error: 'Email e password sono obbligatori' },
				{ status: 400 },
			)
		}

		console.log('🔄 [LOGIN] Creating customer access token...')
		const result = await createCustomerAccessToken(email, password)

		console.log('📊 [LOGIN] Access token result:', {
			hasToken: !!result.customerAccessToken,
			expiresAt: result.customerAccessToken?.expiresAt,
			errorsCount: result.customerUserErrors.length,
			errors: result.customerUserErrors,
		})

		if (result.customerUserErrors.length > 0 || !result.customerAccessToken) {
			await clearCustomerAccessToken()
			
			const firstError = result.customerUserErrors[0]
			let message = firstError?.message ?? 'Impossibile autenticare il cliente'
			
			// Handle specific error cases with better messages
			if (firstError?.code === 'UNIDENTIFIED_CUSTOMER') {
				message = 'Email o password non corretti. Se hai appena creato l\'account, controlla la tua email per il link di attivazione.'
			}
			
			console.log('❌ [LOGIN] Authentication failed:', {
				code: firstError?.code,
				message,
			})
			
			return Response.json({ error: message }, { status: 401 })
		}

		console.log('🔄 [LOGIN] Setting customer access token in cookie...')
		await setCustomerAccessToken(
			result.customerAccessToken.accessToken,
			result.customerAccessToken.expiresAt,
		)

		console.log('✅ [LOGIN] Login completed successfully')
		return Response.json({
			success: true,
			expiresAt: result.customerAccessToken.expiresAt,
		})
	} catch (error) {
		console.error('💥 [LOGIN] Unexpected error:', error)
		return Response.json(
			{ error: 'Errore inatteso durante il login' },
			{ status: 500 },
		)
	}
}

