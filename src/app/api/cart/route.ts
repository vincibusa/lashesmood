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
	cartId?: string
	variantId?: string
	quantity?: number
	lineId?: string
}

export async function POST(request: NextRequest) {
	const body = (await request.json().catch(() => ({}))) as CartRequestBody
	const { variantId, quantity = 1 } = body

	if (!variantId) {
		return Response.json({ error: 'variantId richiesto' }, { status: 400 })
	}

	try {
		const cart = await createCart(variantId, quantity)
		return Response.json(cart)
	} catch (error) {
		console.error('Errore creazione carrello', error)
		return Response.json({ error: 'Errore creazione carrello' }, { status: 500 })
	}
}

export async function PUT(request: NextRequest) {
	const body = (await request.json().catch(() => ({}))) as CartRequestBody
	const { cartId, variantId, quantity = 1, lineId } = body

	if (!cartId) {
		return Response.json({ error: 'cartId richiesto' }, { status: 400 })
	}

	try {
		let cart
		if (variantId && !lineId) {
			cart = await addToCart(cartId, variantId, quantity)
		} else if (lineId) {
			cart = await updateCartLines(cartId, lineId, quantity)
		} else {
			return Response.json(
				{ error: 'variantId o lineId richiesti per aggiornare' },
				{ status: 400 },
			)
		}

		return Response.json(cart)
	} catch (error) {
		console.error('Errore aggiornamento carrello', error)
		return Response.json({ error: 'Errore aggiornamento carrello' }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest) {
	const body = (await request.json().catch(() => ({}))) as CartRequestBody & {
		lineIds?: string[]
	}
	const { cartId, lineIds } = body

	if (!cartId || !lineIds || lineIds.length === 0) {
		return Response.json(
			{ error: 'cartId e lineIds richiesti' },
			{ status: 400 },
		)
	}

	try {
		const cart = await removeFromCart(cartId, lineIds)
		return Response.json(cart)
	} catch (error) {
		console.error('Errore rimozione linee carrello', error)
		return Response.json({ error: 'Errore rimozione elementi' }, { status: 500 })
	}
}

export async function GET(request: NextRequest) {
	const cartId = request.nextUrl.searchParams.get('cartId')

	if (!cartId) {
		return Response.json({ error: 'cartId richiesto' }, { status: 400 })
	}

	try {
		const cart = await getCart(cartId)
		return Response.json(cart)
	} catch (error) {
		console.error('Errore recupero carrello', error)
		return Response.json({ error: 'Errore recupero carrello' }, { status: 500 })
	}
}

