'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import CartSlideout from '@/components/cart-slideout'

const AUTH_HIDDEN_ROUTES = ['/account/login', '/account/register']

export default function AppShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const hideShell = AUTH_HIDDEN_ROUTES.some((route) => pathname.startsWith(route))

	if (hideShell) {
		return <>{children}</>
	}

	return (
		<>
			<Header />
			<main className='flex-1'>{children}</main>
			<Footer />
			<CartSlideout />
		</>
	)
}

