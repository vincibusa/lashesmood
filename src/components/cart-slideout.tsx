'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Gift, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart, useCartActions } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';

const CartSlideout = () => {
  const { state } = useCart();
  const { removeItem, updateQuantity, closeCart } = useCartActions();

  const giftThreshold = 42.00;
  const freeShippingThreshold = 49.99;
  const remainingForGift = Math.max(0, giftThreshold - state.total);
  const remainingForShipping = Math.max(0, freeShippingThreshold - state.total);
  const giftEligible = state.total >= giftThreshold;
  const freeShippingEligible = state.total >= freeShippingThreshold;

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-brand-primary" />
              <span>Carrello ({state.itemCount})</span>
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Il tuo carrello è vuoto
              </h3>
              <p className="text-gray-600 mb-6">
                Aggiungi i tuoi prodotti Ciglissime preferiti
              </p>
              <Button asChild className="btn-primary" onClick={closeCart}>
                <Link href="/collections/press-go-kit-completo">
                  Scopri i prodotti
                </Link>
              </Button>
            </div>
          ) : (
            /* Cart Items */
            <div className="p-6 space-y-6">
              {/* Progress Indicators */}
              <div className="space-y-4">
                {/* Gift Progress */}
                {!giftEligible && (
                  <div className="bg-brand-light rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gift className="h-4 w-4 text-brand-primary" />
                      <span className="text-sm font-medium">
                        Aggiungi {formatPrice(remainingForGift, '€')} per il regalo gratuito!
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-primary rounded-full h-2 transition-all duration-300"
                        style={{ width: `${Math.min(100, (state.total / giftThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {giftEligible && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Gift className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        🎉 Hai diritto al regalo gratuito!
                      </span>
                    </div>
                  </div>
                )}

                {/* Free Shipping Progress */}
                {!freeShippingEligible && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">
                        Aggiungi {formatPrice(remainingForShipping, '€')} per la spedizione gratuita!
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${Math.min(100, (state.total / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {freeShippingEligible && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Truck className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        ✅ Spedizione gratuita inclusa!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {state.items.map((item) => {
                  const originalPrice = item.product.compareAtPriceRange?.minVariantPrice.amount;
                  const salePrice = item.product.priceRange.minVariantPrice.amount;
                  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(salePrice);

                  return (
                    <div key={item.variantId} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                          {item.product.images[0] && (
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.title}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.product.vendor}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="font-bold text-gray-900">
                            {formatPrice(parseFloat(salePrice), '€')}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(parseFloat(originalPrice!), '€')}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 p-1"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Totale</span>
              <span>{formatPrice(state.total, '€')}</span>
            </div>

            {/* Checkout Button */}
            <Button className="w-full btn-primary py-3 text-lg font-medium">
              Procedi al Checkout
            </Button>

            {/* Continue Shopping */}
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={closeCart}
              asChild
            >
              <Link href="/collections/press-go-kit-completo">
                Continua Shopping
              </Link>
            </Button>

            {/* Trust Badges */}
            <div className="text-center text-xs text-gray-500 pt-2">
              <p>🔒 Pagamento sicuro • 📦 Spedizione veloce • 💯 Garanzia soddisfatti</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSlideout;