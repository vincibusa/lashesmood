import { NextRequest } from 'next/server'

import {
	addToCart,
	createCart,
	getCart,
	removeFromCart,
	updateCartLines,
} from '@/lib/shopify'

export const dynamic = 'force-dynamic'

interface CartRequestBody {
	action: 'create' | 'add' | 'update' | 'remove' | 'get'
	cartId?: string
	variantId?: string
	quantity?: number
	lineId?: string
}

export async function POST(request: NextRequest) {
	const body = (await request.json().catch(() => ({}))) as CartRequestBody
	const { action, cartId, variantId, quantity = 1, lineId } = body

	console.log('🛒 [CART API] Request:', { action, cartId, variantId, quantity, lineId })

	try {
		let cart

		switch (action) {
			case 'create':
				if (!variantId) {
					return Response.json({ error: 'variantId richiesto' }, { status: 400 })
				}
				cart = await createCart(variantId, quantity)
				console.log('✅ [CART API] Cart created:', cart?.id)
				return Response.json({ cart })

			case 'add':
				if (!cartId || !variantId) {
					return Response.json({ error: 'cartId e variantId richiesti' }, { status: 400 })
				}
				// Try to add to existing cart, if it fails due to cart not found, create a new one
				try {
					cart = await addToCart(cartId, variantId, quantity)
					console.log('✅ [CART API] Item added to cart:', cart?.id)
				} catch (addError: any) {
					if (addError.message.includes('Il carrello specificato non esiste') || 
						addError.message.includes('Cart not found') ||
						addError.message.includes('UNAUTHORIZED')) {
						console.warn('⚠️ [CART API] Cart not found, creating a new one.')
						cart = await createCart(variantId, quantity)
						console.log('✅ [CART API] New cart created after add failure:', cart?.id)
					} else {
						throw addError // Re-throw other errors
					}
				}
				return Response.json({ cart })

			case 'update':
				if (!cartId || !lineId) {
					return Response.json({ error: 'cartId e lineId richiesti' }, { status: 400 })
				}
				cart = await updateCartLines(cartId, lineId, quantity)
				console.log('✅ [CART API] Cart line updated:', cart?.id)
				return Response.json({ cart })

			case 'remove':
				if (!cartId || !lineId) {
					return Response.json({ error: 'cartId e lineId richiesti' }, { status: 400 })
				}
				cart = await removeFromCart(cartId, [lineId])
				console.log('✅ [CART API] Item removed from cart:', cart?.id)
				return Response.json({ cart })

			case 'get':
				if (!cartId) {
					return Response.json({ error: 'cartId richiesto' }, { status: 400 })
				}
				cart = await getCart(cartId)
				console.log('✅ [CART API] Cart retrieved:', cart?.id)
				return Response.json({ cart })

			default:
				return Response.json({ error: 'Azione non valida' }, { status: 400 })
		}
	} catch (error) {
		console.error('💥 [CART API] Error:', error)
		return Response.json({ error: 'Errore operazione carrello' }, { status: 500 })
	}
}


