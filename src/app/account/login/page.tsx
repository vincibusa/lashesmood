'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useCustomer } from '@/context/customer-context'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

export default function AccountLoginPage() {
	const router = useRouter()
	const { handleLogin, isLoggingIn } = useCustomer()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setError(null)

		const success = await handleLogin(email, password)

		if (success) {
			// Redirect to account page or home on successful login
			router.push('/account')
		} else {
			setError('Credenziali non valide. Riprova.')
		}
	}

	return (
		<div className='min-h-screen  px-4 py-16 flex items-center justify-center'>
			<div className='max-w-md w-full'>
			<Card className='shadow-lg border border-gray-100'>
				<CardHeader className='text-center space-y-2'>
					<CardTitle className='text-3xl font-bold'>Accedi al tuo account</CardTitle>
					<CardDescription>
						Inserisci le tue credenziali per gestire ordini, profilo e preferenze personali.
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className='space-y-4'>
						<div className='grid gap-2'>
							<label htmlFor='email' className='text-sm font-medium text-gray-700'>
								Email
							</label>
							<Input
								id='email'
								type='email'
								required
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className='border-gray-200 focus-visible:ring-brand-primary'
							/>
						</div>
						<div className='grid gap-2'>
							<label htmlFor='password' className='text-sm font-medium text-gray-700'>
								Password
							</label>
							<PasswordInput
								id='password'
								required
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className='border-gray-200 focus-visible:ring-brand-primary'
							/>
						</div>
						{error ? <p className='text-sm text-red-600'>{error}</p> : null}
					</CardContent>
					<CardFooter>
						<Button type='submit' className='w-full' disabled={isLoggingIn}>
							{isLoggingIn ? 'Accesso in corso...' : 'Accedi'}
						</Button>
					</CardFooter>
				</form>
			</Card>
			<p className='text-sm text-center mt-6 text-gray-600'>
				Non hai ancora un account?{' '}
				<Link href='/account/register' className='text-brand-primary font-medium'>
					Registrati
				</Link>
			</p>
			</div>
		</div>
	)
}

