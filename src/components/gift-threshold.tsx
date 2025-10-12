'use client';

import React, { useState, useEffect } from 'react';
import { Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';

interface GiftThresholdProps {
  threshold?: number;
  giftTitle?: string;
  giftValue?: number;
  giftImage?: string;
}

const GiftThreshold: React.FC<GiftThresholdProps> = ({
  threshold = 42.00,
  giftTitle = "Specchietto CIGLISSIME",
  giftValue = 11.00,
  giftImage = "https://ciglissime.com/cdn/shop/files/Clean_Girl_4b943c04-4570-4118-af4a-80c653792089.jpg?v=1750413037&width=200"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { cart, isLoading } = useCart();

  // Calculate cart total from Shopify cart - safely handle null/undefined
  const cartTotal = cart?.cost?.subtotalAmount?.amount 
    ? parseFloat(cart.cost.subtotalAmount.amount) 
    : 0;
  const remaining = Math.max(0, threshold - cartTotal);
  const progress = Math.min(100, (cartTotal / threshold) * 100);
  const isEligible = cartTotal >= threshold;

  useEffect(() => {
    // Show the gift threshold after cart is loaded and a short delay
    if (isLoading) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Don't show while loading or if not visible
  if (isLoading || !isVisible) return null;

  return (
    <div className={`fixed right-4 bottom-4 z-50 transition-all duration-300 ${
      isMinimized ? 'transform scale-95' : ''
    }`}>
      <Card className="w-80 bg-white shadow-xl border-2 border-brand-primary/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-3 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5" />
              <span className="font-medium text-sm">Regalo Gratuito!</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isEligible ? (
            /* Gift Unlocked */
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-green-600 mb-1">
                🎉 Regalo Sbloccato!
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Hai diritto al regalo gratuito
              </p>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <img 
                  src={giftImage} 
                  alt={giftTitle}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{giftTitle}</p>
                  <p className="text-xs text-green-600 line-through">
                    €{giftValue.toFixed(2)}
                  </p>
                  <p className="text-xs font-bold text-green-600">Gratis</p>
                </div>
              </div>
            </div>
          ) : (
            /* Progress to Gift */
            <div>
              <div className="text-center mb-4">
                <p className="text-sm font-medium mb-1">
                  Spendi <span className="font-bold text-brand-primary">
                    €{remaining.toFixed(2)}
                  </span> per ricevere questo regalo!
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>€{cartTotal.toFixed(2)}</span>
                  <span>€{threshold.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Gift Preview */}
              <div className="flex items-center space-x-3 p-3 bg-brand-light rounded-lg">
                <img 
                  src={giftImage} 
                  alt={giftTitle}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{giftTitle}</p>
                  <p className="text-xs text-gray-500 line-through">
                    €{giftValue.toFixed(2)}
                  </p>
                  <p className="text-xs font-bold text-brand-primary">Gratis</p>
                </div>
              </div>

              {/* CTA */}
              <Button 
                className="w-full mt-3 bg-brand-primary hover:bg-brand-primary/90"
                size="sm"
              >
                Continua Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Minimize Toggle */}
        <div className="px-4 pb-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-gray-500 hover:text-gray-700"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? 'Espandi' : 'Riduci'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GiftThreshold;