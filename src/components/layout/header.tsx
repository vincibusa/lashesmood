'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, LayoutGrid, Package, BookOpen, Mail, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCart } from '@/context/cart-context';
import { useCustomer } from '@/context/customer-context';
import { usePathname } from 'next/navigation';

const Header = () => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showBanners, setShowBanners] = useState(true);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const { itemCount, toggleCart } = useCart();
	const { isAuthenticated, isLoading, customerName, handleLogout } = useCustomer();

	// Assicurati che i componenti Radix UI vengano renderizzati solo sul client
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const isHomepage = pathname === '/';

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setShowBanners(scrollY < 50);
			setIsScrolled(scrollY > 20);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navigationItems = [
		{ label: 'Collezioni', href: '/#collections', icon: LayoutGrid },
		{ label: 'Prodotti', href: '/prodotti', icon: Package },
		{ label: 'Come funziona', href: '/#tutorials', icon: BookOpen },
		{ label: 'Contatti', href: '/contatti', icon: Mail },
	];

	// Determine header background and shadow based on homepage, scroll state, and search state
	const shouldBeTransparent = isHomepage && !isScrolled && !isSearchOpen;
	
	const headerClasses = shouldBeTransparent
		? 'fixed top-0 left-0 right-0 z-50 shadow-none'
		: 'sticky top-0 z-50 bg-white shadow-sm transition-all duration-300';

	const headerStyle = shouldBeTransparent
		? { backgroundColor: 'transparent', background: 'transparent' }
		: {};

	const iconColorClass = shouldBeTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100';

	return (
		<header className={headerClasses} style={headerStyle}>
			{/* Banner - Free Shipping (only one banner now) */}
			<div className={`banner-shipping transition-all duration-300 ${showBanners ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
				<div className={`container-custom ${shouldBeTransparent ? '!bg-transparent' : ''}`}>
					<p className="text-center py-2 px-4 font-medium text-sm">
						<strong>SPEDIZIONE GRATUITA</strong> 24-72h per ordini superiori a 49,99EUR
					</p>
				</div>
			</div>

			{/* Main Header */}
			<div
				className={`container-custom ${shouldBeTransparent ? '!bg-transparent' : ''}`}
				style={shouldBeTransparent ? { backgroundColor: 'transparent', background: 'transparent' } : {}}
			>
				<div
					className={`flex items-center justify-between py-4 ${shouldBeTransparent ? 'bg-transparent' : ''}`}
					style={shouldBeTransparent ? { backgroundColor: 'transparent', background: 'transparent' } : {}}
				>
					{/* Mobile Menu Trigger */}
					{isMounted ? (
						<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
							<SheetTrigger asChild className="lg:hidden">
								<Button
									variant="ghost"
									size="icon"
									className={`transition-colors duration-300 ${iconColorClass}`}
								>
									<Menu className="h-6 w-6" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-[300px]">
							<SheetTitle className="text-2xl font-bold text-brand-primary mb-8">
								<Link href="/" onClick={() => setIsMenuOpen(false)}>
									LASHESMOOD
								</Link>
							</SheetTitle>
								<SheetDescription className="sr-only">
									Menu di navigazione principale
								</SheetDescription>
								<div className="flex flex-col space-y-4 mt-8">
									{navigationItems.map((item) => {
										const Icon = item.icon
										const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
											if (item.href.startsWith('/#')) {
												const hash = item.href.substring(1)
												setIsMenuOpen(false)
												if (pathname === '/') {
													e.preventDefault()
													const element = document.querySelector(hash)
													if (element) {
														const headerHeight = 80
														const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
														const offsetPosition = elementPosition - headerHeight
														window.scrollTo({
															top: offsetPosition,
															behavior: 'smooth'
														})
													}
												}
											} else {
												setIsMenuOpen(false)
											}
										}
										return (
											<Link
												key={item.href}
												href={item.href}
												className="flex items-center space-x-3 text-lg font-medium hover:text-brand-primary transition-colors"
												onClick={handleClick}
											>
												<Icon className="h-5 w-5" />
												<span>{item.label}</span>
											</Link>
										)
									})}
								</div>
							</SheetContent>
						</Sheet>
					) : (
						<Button
							variant="ghost"
							size="icon"
							className={`lg:hidden transition-colors duration-300 ${iconColorClass}`}
							onClick={() => setIsMenuOpen(true)}
						>
							<Menu className="h-6 w-6" />
						</Button>
					)}

					{/* Logo */}
					<Link href="/" className="flex-1 lg:flex-none">
						<div className="text-center lg:text-left">
							<h1 className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
								shouldBeTransparent ? 'text-white' : 'text-brand-primary'
							}`}>
								LASHESMOOD
							</h1>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
						{navigationItems.map((item) => {
							const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
								if (item.href.startsWith('/#')) {
									const hash = item.href.substring(1)
									if (pathname === '/') {
										e.preventDefault()
										const element = document.querySelector(hash)
										if (element) {
											const headerHeight = 80
											const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
											const offsetPosition = elementPosition - headerHeight
											window.scrollTo({
												top: offsetPosition,
												behavior: 'smooth'
											})
										}
									}
								}
							}
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={handleClick}
									className={`text-sm font-medium transition-colors duration-200 relative ${
										shouldBeTransparent ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-brand-primary'
									}`}
								>
									{item.label}
									<span className={`absolute inset-x-0 -bottom-1 h-0.5 ${
										shouldBeTransparent ? 'bg-white' : 'bg-brand-primary'
									} scale-x-0 hover:scale-x-100 transition-transform duration-200`} />
								</Link>
							)
						})}
					</nav>

					{/* Right Actions */}
					<div className="flex items-center space-x-2">
						{/* Search */}
						<Button
							variant="ghost"
							size="icon"
							className={`hidden sm:flex ${iconColorClass}`}
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<Search className="h-5 w-5" />
						</Button>

						{/* Mobile Search Button */}
						<Button
							variant="ghost"
							size="icon"
							className={`sm:hidden ${iconColorClass}`}
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<Search className="h-5 w-5" />
						</Button>

						{/* Account */}
						{isLoading ? (
							<Button variant="ghost" size="icon" className={`animate-pulse ${iconColorClass}`}>
								<User className="h-5 w-5" />
							</Button>
						) : isAuthenticated ? (
							isMounted ? (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="relative">
											<Avatar className="h-8 w-8">
												<AvatarFallback className="bg-brand-primary text-white text-sm">
													{customerName?.charAt(0).toUpperCase() ?? 'U'}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-56">
										<DropdownMenuLabel>
											<div className="flex flex-col space-y-1">
												<p className="text-sm font-medium">
													Ciao, {customerName ?? 'Cliente'}!
												</p>
												<p className="text-xs text-gray-500">
													Il tuo account
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link href="/account" className="flex items-center cursor-pointer">
												<User className="mr-2 h-4 w-4" />
												<span>Profilo</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/account/orders" className="flex items-center cursor-pointer">
												<ShoppingCart className="mr-2 h-4 w-4" />
												<span>I miei ordini</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem 
											onClick={handleLogout}
											className="text-red-600 focus:text-red-600 cursor-pointer"
										>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Esci</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Button variant="ghost" size="icon" className="relative">
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-brand-primary text-white text-sm">
											{customerName?.charAt(0).toUpperCase() ?? 'U'}
										</AvatarFallback>
									</Avatar>
								</Button>
							)
						) : (
							<Link href="/account/login">
								<Button variant="ghost" size="icon" className={iconColorClass}>
									<User className="h-5 w-5" />
								</Button>
							</Link>
						)}

						{/* Cart */}
						<Button variant="ghost" size="icon" className={`relative ${iconColorClass}`} onClick={toggleCart}>
							<ShoppingBag className="h-5 w-5" />
							{itemCount > 0 && (
								<Badge
									variant="destructive"
									className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-primary border-0"
								>
									{itemCount}
								</Badge>
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Desktop Search Bar */}
			{isSearchOpen && (
				<div className="hidden lg:block border-t border-gray-100">
					<div className="container-custom py-3">
						<div className="relative max-w-2xl mx-auto">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Cerca prodotti..."
								className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-base"
								autoFocus
							/>
						</div>
					</div>
				</div>
			)}

			{/* Mobile Search Bar */}
			{isSearchOpen && (
				<div className="lg:hidden border-t border-gray-100">
					<div className="container-custom py-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder="Cerca prodotti..."
								className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
								autoFocus
							/>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;