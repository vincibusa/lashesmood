import React from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProductSocialShare = () => {
	return (
		<section className="border-t border-gray-100 py-6">
			<div className="container-custom">
				<div className="flex items-center justify-center space-x-4">
					<span className="text-sm text-gray-600">Condividi:</span>
					<Button variant="ghost" size="sm">
						<Share2 className="h-4 w-4 mr-2" />
						Facebook
					</Button>
					<Button variant="ghost" size="sm">
						<Share2 className="h-4 w-4 mr-2" />
						WhatsApp
					</Button>
					<Button variant="ghost" size="sm">
						<Share2 className="h-4 w-4 mr-2" />
						Email
					</Button>
				</div>
			</div>
		</section>
	)
}

export default ProductSocialShare

