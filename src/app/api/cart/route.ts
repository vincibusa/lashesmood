import { NextRequest, NextResponse } from 'next/server'
import {
	createCart,
	addToCart as addToShopifyCart,
	updateCartLines,
	removeFromCart as removeFromShopifyCart,
	getCart,
} from '@/lib/shopify'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { action, cartId, variantId, quantity, lineId, lineIds } = body

		switch (action) {
			case 'create': {
				if (!variantId || !quantity) {
					return NextResponse.json(
						{ error: 'Missing required fields: variantId, quantity' },
						{ status: 400 }
					)
				}

				const cart = await createCart(variantId, quantity)
				return NextResponse.json({ cart })
			}

			case 'add': {
				if (!cartId || !variantId || !quantity) {
					return NextResponse.json(
						{ error: 'Missing required fields: cartId, variantId, quantity' },
						{ status: 400 }
					)
				}

				const cart = await addToShopifyCart(cartId, variantId, quantity)
				return NextResponse.json({ cart })
			}

			case 'update': {
				if (!cartId || !lineId || quantity === undefined) {
					return NextResponse.json(
						{ error: 'Missing required fields: cartId, lineId, quantity' },
						{ status: 400 }
					)
				}

				const cart = await updateCartLines(cartId, lineId, quantity)
				return NextResponse.json({ cart })
			}

			case 'remove': {
				if (!cartId || !lineId) {
					return NextResponse.json(
						{ error: 'Missing required fields: cartId, lineId' },
						{ status: 400 }
					)
				}

				const cart = await removeFromShopifyCart(cartId, lineIds || [lineId])
				return NextResponse.json({ cart })
			}

			case 'get': {
				if (!cartId) {
					return NextResponse.json(
						{ error: 'Missing required field: cartId' },
						{ status: 400 }
					)
				}

				const cart = await getCart(cartId)
				if (!cart) {
					return NextResponse.json(
						{ error: 'Cart not found' },
						{ status: 404 }
					)
				}

				return NextResponse.json({ cart })
			}

			default:
				return NextResponse.json(
					{ error: 'Invalid action' },
					{ status: 400 }
				)
		}
	} catch (error) {
		console.error('Cart API error:', error)
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Internal server error' },
			{ status: 500 }
		)
	}
}
