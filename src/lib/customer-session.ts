import { cookies } from 'next/headers'

const CUSTOMER_ACCESS_TOKEN_COOKIE = 'customerAccessToken'

const isSecure = process.env.NODE_ENV !== 'development'

export async function setCustomerAccessToken(accessToken: string, expiresAt: string) {
	const expires = new Date(expiresAt)
	const cookieStore = await cookies()

	cookieStore.set({
		name: CUSTOMER_ACCESS_TOKEN_COOKIE,
		value: accessToken,
		expires,
		httpOnly: true,
		sameSite: 'lax',
		secure: isSecure,
		path: '/',
	})
}

export async function clearCustomerAccessToken() {
	const cookieStore = await cookies()
	cookieStore.delete(CUSTOMER_ACCESS_TOKEN_COOKIE)
}

export async function getCustomerAccessToken(): Promise<string | undefined> {
	const cookieStore = await cookies()
	return cookieStore.get(CUSTOMER_ACCESS_TOKEN_COOKIE)?.value
}

export { CUSTOMER_ACCESS_TOKEN_COOKIE }

