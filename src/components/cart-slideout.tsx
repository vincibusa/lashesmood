'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

const CartSlideout = () => {
  const { cart, isLoading, isOpen, itemCount, updateCartLine, removeFromCart, closeCart } = useCart();

  // Calculate total from cart
  const total = cart ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;

  const cartLines = cart?.lines.edges || [];
  const hasItems = cartLines.length > 0;

  // Checkout URL: force host to Shopify checkout domain so the link always opens on the correct store
  const checkoutDomain =
    typeof process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN === 'string'
      ? process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN
      : process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
  const rawCheckoutUrl = cart?.checkoutUrl ?? ''
  const checkoutUrl =
    rawCheckoutUrl && checkoutDomain
      ? rawCheckoutUrl.startsWith('/')
        ? `https://${checkoutDomain}${rawCheckoutUrl}`
        : (() => {
            try {
              const u = new URL(rawCheckoutUrl)
              return `https://${checkoutDomain}${u.pathname}${u.search}`
            } catch {
              return rawCheckoutUrl
            }
          })()
      : rawCheckoutUrl

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col ">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-border/50 bg-white">
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                Carrello
              </h2>
              <p className="text-sm text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'prodotto' : 'prodotti'}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!hasItems ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-32 h-32 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-full flex items-center justify-center mb-6"
              >
                <ShoppingBag className="h-16 w-16 text-brand-primary/50" />
              </motion.div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-3">
                Il tuo carrello è vuoto
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Aggiungi i tuoi prodotti Lashesmood preferiti
              </p>
              <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all" onClick={closeCart}>
                <Link href="/prodotti">
                  Scopri i prodotti
                </Link>
              </Button>
            </div>
          ) : (
            /* Cart Items */
            <div className="p-6 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartLines.map(({ node: line }, index) => {
                  const price = parseFloat(line.merchandise.price.amount);
                  const lineTotal = parseFloat(line.cost.totalAmount.amount);
                  const productImage = line.merchandise.product.images.edges[0]?.node;

                  return (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-white border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden border border-border/30">
                          {productImage && (
                            <Image
                              src={productImage.url}
                              alt={productImage.altText || line.merchandise.product.title}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${line.merchandise.product.handle}`}
                          onClick={closeCart}
                        >
                          <h3 className="font-playfair font-semibold text-foreground line-clamp-2 hover:text-brand-primary transition-colors mb-1">
                            {line.merchandise.product.title}
                          </h3>
                        </Link>
                        {line.merchandise.title !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {line.merchandise.title}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-playfair text-lg font-bold text-brand-primary">
                            € {price.toFixed(2)}
                          </span>
                          {line.quantity > 1 && (
                            <span className="text-xs text-muted-foreground">
                              x{line.quantity} = € {lineTotal.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-brand-light rounded-xl p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-white"
                              onClick={() => updateCartLine(line.id, line.quantity - 1)}
                              disabled={isLoading || line.quantity <= 1}
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Minus className="h-3 w-3" />
                              )}
                            </Button>
                            <span className="w-8 text-center text-sm font-semibold text-foreground">
                              {line.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-white"
                              onClick={() => updateCartLine(line.id, line.quantity + 1)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Plus className="h-3 w-3" />
                              )}
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                            onClick={() => removeFromCart(line.id)}
                            disabled={isLoading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {hasItems && cart && (
          <div className="border-t border-border/50 bg-white p-6 space-y-4">
            {/* Subtotal & Tax */}
            <div className="space-y-3 pb-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotale</span>
                <span className="font-semibold text-foreground">
                  € {subtotal.toFixed(2)}
                </span>
              </div>
              {cart.cost.totalTaxAmount && parseFloat(cart.cost.totalTaxAmount.amount) > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">IVA</span>
                  <span className="text-foreground">
                    € {parseFloat(cart.cost.totalTaxAmount.amount).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Spedizione</span>
                <span className="font-semibold text-foreground text-sm text-muted-foreground">
                  da calcolare al checkout
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border/50">
                <span className="font-playfair text-xl font-bold text-foreground">Totale</span>
                <span className="font-playfair text-2xl font-bold text-brand-primary">
                  € {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              asChild
              disabled={isLoading || !checkoutUrl}
            >
              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Caricamento...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Procedi al Checkout
                  </>
                )}
              </a>
            </Button>

            {/* Continue Shopping */}
            <Button
              variant="outline"
              className="w-full border-2 border-border/50 hover:bg-brand-light rounded-xl py-5"
              onClick={closeCart}
              asChild
            >
              <Link href="/prodotti">
                Continua Shopping
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSlideout;