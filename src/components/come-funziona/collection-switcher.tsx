'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface CollectionForSwitcher {
	id: string
	title: string
	handle: string
}

interface CollectionSwitcherProps {
	collections: CollectionForSwitcher[]
	currentHandle: string
}

function CollectionSwitcher({ collections, currentHandle }: CollectionSwitcherProps) {
	const router = useRouter()

	if (collections.length === 0) return null

	function handleSelect(handle: string) {
		router.push(`/come-funziona?collezione=${encodeURIComponent(handle)}`)
	}

	return (
		<div className="border-b border-border bg-white/80 backdrop-blur-sm">
			<div className="container-custom py-4">
				<p className="text-center text-sm font-medium text-muted-foreground mb-3">
					Guida per collezione:
				</p>
				<div className="flex flex-wrap justify-center gap-2">
					{collections.map((col) => (
						<button
							key={col.id}
							type="button"
							onClick={() => handleSelect(col.handle)}
							className={cn(
								'min-h-[44px] min-w-[44px] rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
								currentHandle === col.handle
									? 'bg-brand-primary text-white shadow-md'
									: 'bg-brand-light text-foreground hover:bg-brand-light/80'
							)}
							aria-pressed={currentHandle === col.handle}
							aria-label={`Mostra guida ${col.title}`}
						>
							{col.title}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default CollectionSwitcher
