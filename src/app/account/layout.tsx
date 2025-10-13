import React from 'react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container-custom py-12">
			<div className="max-w-5xl mx-auto">{children}</div>
		</div>
	)
}

