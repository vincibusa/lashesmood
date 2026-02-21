'use client'

import React from 'react'
import { BookOpen, MapPin, Lightbulb, HelpCircle, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
	{ href: '#guida', label: 'Guida', icon: BookOpen },
	{ href: '#posizionamento', label: 'Posizionamento', icon: MapPin },
	{ href: '#consigli', label: 'Consigli', icon: Lightbulb },
	{ href: '#faq', label: 'FAQ', icon: HelpCircle },
	{ href: '#cta', label: 'Shop', icon: ShoppingBag },
] as const

function ComeFunzionaNav({ className }: { className?: string }) {
	function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
		if (href.startsWith('#')) {
			e.preventDefault()
			const id = href.slice(1)
			const el = document.getElementById(id)
			el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<nav
			aria-label="Navigazione interna pagina Come funziona"
			className={cn(
				'sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
				className
			)}
		>
			<div className="container-custom">
				<ul className="flex flex-wrap items-center justify-center gap-1 py-3 md:gap-2">
					{links.map(({ href, label, icon: Icon }) => (
						<li key={href}>
							<a
								href={href}
								onClick={(e) => handleClick(e, href)}
								className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-brand-light hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
								aria-label={`Vai a ${label}`}
							>
								<Icon className="h-4 w-4 shrink-0" aria-hidden />
								<span className="hidden sm:inline">{label}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default ComeFunzionaNav
