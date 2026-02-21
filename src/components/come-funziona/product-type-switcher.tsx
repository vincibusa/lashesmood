'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { ProductType } from '@/components/come-funziona/types'

interface ProductTypeSwitcherProps {
	currentType: ProductType
}

const TABS: { value: 'press-go' | 'regular'; label: string }[] = [
	{ value: 'press-go', label: 'Press&GO!' },
	{ value: 'regular', label: 'Regular' },
]

function ProductTypeSwitcher({ currentType }: ProductTypeSwitcherProps) {
	const router = useRouter()

	function handleSelect(tipo: 'press-go' | 'regular') {
		router.push(`/come-funziona?tipo=${tipo}`)
	}

	return (
		<div className="border-b border-border bg-white/80 backdrop-blur-sm">
			<div className="container-custom py-4">
				<p className="text-center text-sm font-medium text-muted-foreground mb-3">
					Guida per:
				</p>
				<div className="flex flex-wrap justify-center gap-2">
					{TABS.map((tab) => (
						<button
							key={tab.value}
							type="button"
							onClick={() => handleSelect(tab.value)}
							className={cn(
								'min-h-[44px] min-w-[44px] rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
								currentType === tab.value
									? 'bg-brand-primary text-white shadow-md'
									: 'bg-brand-light text-foreground hover:bg-brand-light/80'
							)}
							aria-pressed={currentType === tab.value}
							aria-label={`Mostra guida ${tab.label}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductTypeSwitcher
