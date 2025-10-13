'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		return (
			<div className="relative">
				<Input
					{...props}
					ref={ref}
					type={showPassword ? 'text' : 'password'}
					className={className}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? (
						<EyeOff className="h-4 w-4 text-gray-400" />
					) : (
						<Eye className="h-4 w-4 text-gray-400" />
					)}
					<span className="sr-only">
						{showPassword ? 'Nascondi password' : 'Mostra password'}
					</span>
				</Button>
			</div>
		)
	}
)

PasswordInput.displayName = 'PasswordInput'

