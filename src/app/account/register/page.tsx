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

export default function AccountRegisterPage() {
	const router = useRouter()
	const { handleRegister, isLoggingIn } = useCustomer()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setError(null)

		if (password !== confirmPassword) {
			setError('Le password non coincidono')
			return
		}

		const success = await handleRegister(email, password)

		if (success) {
			// Redirect to account page on successful registration
			router.push('/account')
		} else {
			setError('Impossibile creare l\'account. Riprova.')
		}
	}

	return (
		<div className='min-h-screen  px-4 py-16 flex items-center justify-center'>
			<div className='max-w-md w-full'>
				<Card className='shadow-lg border border-gray-100'>
					<CardHeader className='text-center space-y-2'>
						<CardTitle className='text-3xl font-bold'>Crea il tuo account</CardTitle>
						<CardDescription>
							Registra un nuovo account per fare ordini più velocemente, salvare le preferenze e seguire le spedizioni.
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
								<Input
									id='password'
									type='password'
									required
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									className='border-gray-200 focus-visible:ring-brand-primary'
								/>
							</div>
							<div className='grid gap-2'>
								<label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>
									Conferma password
								</label>
								<Input
									id='confirmPassword'
									type='password'
									required
									value={confirmPassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
									className='border-gray-200 focus-visible:ring-brand-primary'
								/>
							</div>
							{error ? <p className='text-sm text-red-600'>{error}</p> : null}
						</CardContent>
						<CardFooter>
							<Button type='submit' className='w-full' disabled={isLoggingIn}>
								{isLoggingIn ? 'Registrazione...' : 'Crea account'}
							</Button>
						</CardFooter>
					</form>
				</Card>
				<p className='text-sm text-center mt-6 text-gray-600'>
					Hai già un account?{' '}
					<Link href='/account/login' className='text-brand-primary font-medium'>
						Accedi
					</Link>
				</p>
			</div>
		</div>
	)
}

