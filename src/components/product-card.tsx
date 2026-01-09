'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LashesmoodProduct } from '@/types/shopify';
import { formatPrice, formatDiscount } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cardTilt3D, fadeInUp, iconBounce } from '@/lib/animations';

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const hasMultipleImages = product.images.length > 1;

  const originalPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const salePrice = product.priceRange.minVariantPrice.amount;
  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(salePrice);
  const discountPercentage = hasDiscount ? formatDiscount(parseFloat(originalPrice!), parseFloat(salePrice)) : 0;

  // 3D Tilt Effect on Desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // Max 8deg rotation
    const rotateY = ((x - centerX) / centerX) * 8;

    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
    if (!shouldReduceMotion) {
      setCurrentImageIndex(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasMultipleImages && !shouldReduceMotion) {
      setCurrentImageIndex(1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

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

  // Animation variants
  const cardVariants = shouldReduceMotion ? {} : {
    rest: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    hover: {
      rotateX: mousePosition.x,
      rotateY: mousePosition.y,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  const overlayVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="rest"
      animate={isHovered ? 'hover' : 'rest'}
      variants={shouldReduceMotion ? undefined : cardVariants}
      style={shouldReduceMotion ? {} : {
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      } as React.CSSProperties}
    >
      <Card className="!bg-white !shadow-lg !border !border-border/50 overflow-hidden rounded-2xl">
        {/* Image Container */}
        <div className="relative aspect-product overflow-hidden">
          <Link href={`/products/${product.handle}`}>
            {/* Main Image */}
            {primaryImage && (
              <motion.div
                className="relative w-full h-full"
                animate={{ scale: isHovered && !shouldReduceMotion ? 1.05 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText || product.title}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    currentImageIndex === 1 && hasMultipleImages ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={product.featured}
                />

                {/* Secondary Image (on hover) */}
                {secondaryImage && (
                  <Image
                    src={secondaryImage.url}
                    alt={secondaryImage.altText || product.title}
                    fill
                    className={`object-cover absolute inset-0 transition-all duration-500 ${
                      currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}

                {/* Gradient Overlay - Enhanced on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  animate={{
                    opacity: isHovered && !shouldReduceMotion ? 0.8 : 0.4
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Quick Actions Overlay (Desktop: on hover, Mobile: always visible) */}
                <AnimatePresence>
                  {(isHovered || shouldReduceMotion) && (
                    <motion.div
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-2 pointer-events-none"
                    >
                      {/* Quick Add Button - Slide up from bottom */}
                      {showQuickAdd && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="pointer-events-auto w-full max-w-[200px]"
                        >
                          <Button
                            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                            onClick={handleQuickAdd}
                            disabled={isAdding}
                            size="lg"
                          >
                            <Zap className="h-4 w-4 mr-2 fill-white" />
                            {isAdding ? '...' : 'Quick Add'}
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Badges - Always Visible */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {hasDiscount && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Badge className="bg-red-500 text-white font-bold shadow-md">
                        -{discountPercentage}%
                      </Badge>
                    </motion.div>
                  )}
                  {product.featured && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Badge className="bg-brand-primary text-white shadow-md">
                        Bestseller
                      </Badge>
                    </motion.div>
                  )}
                </div>

                {/* Wishlist Button - Pulse Animation */}
                <motion.div
                  className="absolute top-3 right-3 z-10"
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all"
                    onClick={handleWishlistToggle}
                  >
                    <motion.div
                      animate={isWishlisted && !shouldReduceMotion ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4, repeat: isWishlisted ? Infinity : 0, repeatDelay: 2 }}
                    >
                      <Heart
                        className={`h-5 w-5 transition-all ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                      />
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Hover Indicator (Desktop only) */}
                {hasMultipleImages && !shouldReduceMotion && (
                  <motion.div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    Hover per vedere altro
                  </motion.div>
                )}
              </motion.div>
            )}
          </Link>
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3 bg-white">
          {/* Brand & Rating Row */}
          <div className="flex items-start justify-between gap-2">
            <Link href={`/collections/vendors?q=${product.vendor}`}>
              <p className="text-xs text-muted-foreground hover:text-brand-primary transition-colors font-medium">
                {product.vendor}
              </p>
            </Link>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                    : i === Math.floor(product.rating) && product.rating % 1 >= 0.5
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.handle}`}>
            <motion.h3
              className="font-playfair text-lg font-bold text-foreground leading-tight line-clamp-2 hover:text-brand-primary transition-colors"
              whileHover={shouldReduceMotion ? {} : { x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {product.title}
            </motion.h3>
          </Link>

          {/* Price Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <motion.span
                className="text-xl font-bold text-brand-primary"
                animate={isHovered && !shouldReduceMotion ? { scale: 1.05 } : {}}
                transition={{ duration: 0.2 }}
              >
                {formatPrice(parseFloat(salePrice), '€')}
              </motion.span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(parseFloat(originalPrice!), '€')}
                </span>
              )}
            </div>
          </div>

          {/* Kit Info */}
          {product.isKit && (
            <div className="flex items-center gap-1 text-xs text-brand-primary font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span>Kit completo • {product.duration}</span>
            </div>
          )}

          {/* Quick Add Button (Mobile: always visible, Desktop: hidden on hover) */}
          {showQuickAdd && (
            <motion.div
              className="pt-2"
              initial={false}
              animate={{
                opacity: shouldReduceMotion || !isHovered ? 1 : 0,
                y: shouldReduceMotion || !isHovered ? 0 : 10
              }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="w-full bg-brand-secondary hover:bg-brand-secondary/90 text-brand-accent font-semibold py-5 shadow-md hover:shadow-lg transition-all"
                onClick={handleQuickAdd}
                disabled={isAdding}
                size="lg"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {isAdding ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    Aggiunta...
                  </motion.span>
                ) : (
                  'Aggiungi al carrello'
                )}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;