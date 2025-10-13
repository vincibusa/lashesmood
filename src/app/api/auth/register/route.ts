import { createCustomer, createCustomerAccessToken } from '@/lib/shopify'
import { clearCustomerAccessToken, setCustomerAccessToken } from '@/lib/customer-session'

export const dynamic = 'force-dynamic'

interface RegisterPayload {
	email?: string
	password?: string
	firstName?: string
	lastName?: string
}

export async function POST(request: Request) {
	try {
		const body = (await request.json().catch(() => ({}))) as RegisterPayload
		const email = body.email?.trim()
		const password = body.password
		const firstName = body.firstName?.trim()
		const lastName = body.lastName?.trim()

		console.log('📝 [REGISTER] Request received:', {
			email,
			hasPassword: !!password,
			firstName,
			lastName,
		})

		if (!email || !password) {
			console.log('❌ [REGISTER] Validation failed: missing email or password')
			return Response.json(
				{ error: 'Email e password sono obbligatori' },
				{ status: 400 },
			)
		}

		// Step 1: Create the customer account
		console.log('🔄 [REGISTER] Creating customer account...')
		const createResult = await createCustomer(email, password, firstName, lastName)
		
		console.log('📊 [REGISTER] Customer creation result:', {
			hasCustomer: !!createResult.customer,
			customerId: createResult.customer?.id,
			errorsCount: createResult.customerUserErrors.length,
			errors: createResult.customerUserErrors,
		})

		if (createResult.customerUserErrors.length > 0 || !createResult.customer) {
			await clearCustomerAccessToken()
			
			const firstError = createResult.customerUserErrors[0]
			
			// Handle specific error case: customer exists but is disabled
			if (firstError?.code === 'CUSTOMER_DISABLED') {
				console.log('⚠️ [REGISTER] Customer exists but is disabled (needs activation)')
				return Response.json({
					error: 'Account già esistente ma non ancora attivato. Controlla la tua email per il link di attivazione, oppure prova ad effettuare il login.',
					code: 'CUSTOMER_DISABLED',
				}, { status: 400 })
			}
			
			const message = firstError?.message ?? "Impossibile creare l'account"
			console.log('❌ [REGISTER] Customer creation failed:', message)
			return Response.json({ error: message }, { status: 400 })
		}

		console.log('✅ [REGISTER] Customer created successfully:', createResult.customer.id)

		// Step 2: Automatically login the customer by creating an access token
		console.log('🔄 [REGISTER] Creating access token for auto-login...')
		const loginResult = await createCustomerAccessToken(email, password)
		
		console.log('📊 [REGISTER] Access token creation result:', {
			hasToken: !!loginResult.customerAccessToken,
			expiresAt: loginResult.customerAccessToken?.expiresAt,
			errorsCount: loginResult.customerUserErrors.length,
			errors: loginResult.customerUserErrors,
		})

		if (loginResult.customerUserErrors.length > 0 || !loginResult.customerAccessToken) {
			// Customer was created but login failed
			console.log('⚠️ [REGISTER] Customer created but login failed')
			return Response.json({
				error: 'Account creato con successo, ma login fallito. Prova ad effettuare il login manualmente.',
			}, { status: 400 })
		}

		console.log('🔄 [REGISTER] Setting customer access token in cookie...')
		await setCustomerAccessToken(
			loginResult.customerAccessToken.accessToken,
			loginResult.customerAccessToken.expiresAt,
		)

		console.log('✅ [REGISTER] Registration and login completed successfully')
		return Response.json({
			success: true,
			expiresAt: loginResult.customerAccessToken.expiresAt,
		})
	} catch (error) {
		console.error('💥 [REGISTER] Unexpected error:', error)
		return Response.json(
			{ error: 'Errore inatteso durante la registrazione' },
			{ status: 500 },
		)
	}
}

