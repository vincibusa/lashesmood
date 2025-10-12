'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CiglissimeProduct } from '@/types/shopify';
import { formatPrice, formatDiscount } from '@/lib/utils';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: CiglissimeProduct;
  showQuickAdd?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showQuickAdd = true,
  className = ""
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  console.log('🎴 PRODUCT CARD:', {
    title: product.title,
    images: product.images,
    imagesLength: product.images?.length,
    firstImage: product.images?.[0],
  });

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const hasMultipleImages = product.images.length > 1;

  const originalPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const salePrice = product.priceRange.minVariantPrice.amount;
  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(salePrice);
  const discountPercentage = hasDiscount ? formatDiscount(parseFloat(originalPrice!), parseFloat(salePrice)) : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the first available variant
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
      // You could add a toast notification here
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className={`card-product !bg-none !shadow-none !border-none ${className}`}>
      <div className="relative">
        {/* Product Images */}
        <Link href={`/products/${product.handle}`}>
          <div 
            className="relative aspect-product overflow-hidden"
            onMouseEnter={() => hasMultipleImages && setCurrentImageIndex(1)}
            onMouseLeave={() => setCurrentImageIndex(0)}
          >
            {primaryImage && (
              <>
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText || product.title}
                  fill
                  className={`object-cover transition-opacity duration-300 ${
                    currentImageIndex === 1 && hasMultipleImages ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {secondaryImage && (
                  <Image
                    src={secondaryImage.url}
                    alt={secondaryImage.altText || product.title}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}
              </>
            )}

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {hasDiscount && (
                <Badge variant="destructive" className="bg-red-500 text-white font-bold">
                  -{discountPercentage}%
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-brand-secondary text-white">
                  Bestseller
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white opacity-0 hover:opacity-100 transition-all duration-300"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>

            {/* Quick Add Button */}
            {showQuickAdd && (
              <div className="absolute bottom-3 left-3 right-3 opacity-0 hover:opacity-100 transition-all duration-300 transform translate-y-2 hover:translate-y-0">
                <Button
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
                  onClick={handleQuickAdd}
                  disabled={isAdding}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {isAdding ? 'Aggiunta...' : 'Aggiungi al carrello'}
                </Button>
              </div>
            )}
          </div>
        </Link>
      </div>

      <CardContent className="p-4">
        {/* Brand */}
        <Link href={`/collections/vendors?q=${product.vendor}`}>
          <p className="text-xs text-gray-500 hover:text-brand-primary transition-colors mb-1">
            {product.vendor}
          </p>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {product.rating}/5 ({product.reviewCount} Recensioni)
          </span>
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-medium text-gray-900 hover:text-brand-primary transition-colors line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(parseFloat(salePrice), '€')}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(parseFloat(originalPrice!), '€')}
              </span>
            )}
          </div>
        </div>

        {/* Quick Info */}
        {product.isKit && (
          <p className="text-xs text-brand-primary mt-1 font-medium">
            Kit completo • {product.duration}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;