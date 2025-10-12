'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, Heart, LayoutGrid, Zap, Package, BookOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart, useCartActions } from '@/context/cart-context';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanners, setShowBanners] = useState(true);
  const { state } = useCart();
  const { toggleCart } = useCartActions();

  useEffect(() => {
    const handleScroll = () => {
      setShowBanners(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Collections', href: '/collections', icon: LayoutGrid },
    { label: 'Press&GO!', href: '/collections/press-go-kit-completo', icon: Zap },
    { label: 'Regular', href: '/collections/regular', icon: Package },
    { label: 'Tutorial', href: '/come-funziona', icon: BookOpen },
    { label: 'Contatti', href: '/contatti', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Banner - Flash Promo */}
      <div className={`banner-promo animate-pulse transition-all duration-300 ${showBanners ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
        <div className="container-custom">
          <p className="text-center py-2 px-4 font-medium text-sm">
            <span className="hidden sm:inline">FLASH PROMO 💕 Sconti esclusivi </span>
            <strong>SOLO PER OGGI</strong>
            <span className="hidden sm:inline"> 💕</span>
          </p>
        </div>
      </div>

      {/* Second Banner - Free Shipping */}
      <div className={`banner-shipping transition-all duration-300 ${showBanners ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
        <div className="container-custom">
          <p className="text-center py-2 px-4 font-medium text-sm">
            <strong>SPEDIZIONE GRATUITA</strong> 24-72h per ordini superiori a 49,99EUR
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Trigger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetTitle className="text-2xl font-bold text-brand-primary mb-8">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  CIGLISSIME
                </Link>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Menu di navigazione principale
              </SheetDescription>
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium hover:text-brand-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-1 lg:flex-none">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-brand-primary tracking-tight">
                CIGLISSIME
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-brand-primary transition-colors duration-200 relative"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-brand-primary scale-x-0 hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingBag className="h-5 w-5" />
              {state.itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-primary border-0"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden border-t border-gray-100">
        <div className="container-custom py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca prodotti..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;