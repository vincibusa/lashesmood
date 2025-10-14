import React from 'react'
import Link from 'next/link'
import { MessageCircle, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const QuickLinks = () => {
	return (
		<section className="section-padding bg-brand-light">
			<div className="container-custom">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-8">Collegamenti Rapidi</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="p-6 hover:shadow-lg transition-shadow duration-300">
							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
									<MessageCircle className="h-6 w-6 text-brand-primary" />
								</div>
								<div className="text-left">
									<h3 className="font-bold mb-1">Tutorial e Guide</h3>
									<p className="text-gray-600 text-sm mb-3">
										Scopri come applicare le tue Lashesmood
									</p>
									<Button asChild variant="outline" size="sm">
										<Link href="/come-funziona">Vai ai Tutorial</Link>
									</Button>
								</div>
							</div>
						</Card>

						<Card className="p-6 hover:shadow-lg transition-shadow duration-300">
							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
									<Instagram className="h-6 w-6 text-brand-primary" />
								</div>
								<div className="text-left">
									<h3 className="font-bold mb-1">Seguici su Instagram</h3>
									<p className="text-gray-600 text-sm mb-3">
										Tips, tutorial e novità ogni giorno
									</p>
									<Button asChild variant="outline" size="sm">
										<Link
											href="https://instagram.com/lashesmood"
											target="_blank"
											rel="noopener noreferrer"
										>
											@lashesmood
										</Link>
									</Button>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	)
}

export default QuickLinks

