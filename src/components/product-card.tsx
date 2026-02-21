'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LashesmoodProduct } from '@/types/shopify';
import { formatPrice, formatDiscount } from '@/lib/utils';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: LashesmoodProduct;
  showQuickAdd?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showQuickAdd = true,
  className = ""
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];

  const originalPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const salePrice = product.priceRange.minVariantPrice.amount;
  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(salePrice);
  const discountPercentage = hasDiscount ? formatDiscount(parseFloat(originalPrice!), parseFloat(salePrice)) : 0;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const firstVariant = product.variants[0];
    if (!firstVariant) {
      console.error('No variants available for product:', product.title);
      return;
    }

    try {
      setIsAdding(true);
      await addToCart(firstVariant.id, 1);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={false}
      animate={{}}
    >
      <Card className="!bg-transparent !shadow-lg !border !border-border/50 overflow-hidden rounded-2xl relative">
        <Link href={`/products/${product.handle}`} className="block relative aspect-product overflow-hidden rounded-2xl group">
          {/* Full-bleed Image */}
          {primaryImage && (
            <>
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText || product.title}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={product.featured}
              />
              {secondaryImage && (
                <Image
                  src={secondaryImage.url}
                  alt={secondaryImage.altText || product.title}
                  fill
                  className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  aria-hidden
                />
              )}

              {/* Gradient overlay for text readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
                aria-hidden
              />

              {/* Badges - top */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
                {hasDiscount && (
                  <Badge className="bg-red-500 text-white font-bold shadow-md w-fit">
                    -{discountPercentage}%
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-brand-primary text-white shadow-md w-fit">
                    Bestseller
                  </Badge>
                )}
              </div>

              {/* Overlay content - bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 pt-12 flex flex-col justify-end z-10 text-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Link
                    href={`/collections/vendors?q=${product.vendor}`}
                    className="text-xs font-medium text-white/90 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.vendor}
                  </Link>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) || (i === Math.floor(product.rating) && product.rating % 1 >= 0.5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-playfair text-lg font-bold leading-tight line-clamp-2 text-white drop-shadow-sm">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                  <span className="text-xl font-bold text-white">
                    {formatPrice(parseFloat(salePrice), '€')}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-white/70 line-through">
                      {formatPrice(parseFloat(originalPrice!), '€')}
                    </span>
                  )}
                </div>
                {product.isKit && (
                  <p className="text-xs text-white/80 mt-1">
                    Kit completo • {product.duration}
                  </p>
                )}
                {showQuickAdd && (
                  <div className="mt-3" onClick={(e) => e.preventDefault()}>
                    <Button
                      className="w-full bg-white text-foreground hover:bg-white/90 font-semibold py-3 shadow-lg hover:shadow-xl transition-all rounded-xl border-0"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleQuickAdd(e)
                      }}
                      disabled={isAdding}
                      size="lg"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {isAdding ? 'Aggiunta...' : 'Aggiungi al carrello'}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;