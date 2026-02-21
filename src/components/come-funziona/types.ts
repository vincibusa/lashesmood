export type ProductType = 'press-go' | 'regular' | 'all'

/** Derive ProductType from Shopify collection handle for come-funziona content */
export function getProductTypeFromCollectionHandle(handle: string): ProductType {
	const h = handle.toLowerCase()
	if (h.includes('press-go') || h.includes('pressgo')) return 'press-go'
	if (h.includes('regular')) return 'regular'
	return 'all'
}
