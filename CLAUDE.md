# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lashesmood is an Italian e-commerce site for semi-permanent eyelash extensions, built with Next.js 15 and integrated with Shopify's Storefront GraphQL API.

## Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript (strict mode)
- **Shopify Storefront GraphQL API** (version 2025-01)
- **Tailwind CSS v4** with tw-animate-css
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (auth, cart, customer)
│   ├── account/           # Customer account pages
│   ├── collections/       # Collection and product listing pages
│   ├── products/          # Product detail pages
│   └── [static pages]     # come-funziona, contatti
├── components/
│   ├── ui/                # Shadcn-style UI primitives
│   ├── layout/            # Header, Footer, AppShell
│   ├── home/              # Homepage sections
│   ├── products/          # Product-related components
│   ├── collections/       # Collection-related components
│   └── [feature]/         # Feature-specific components
├── context/               # React Context providers
│   ├── cart-context.tsx   # Shopping cart state
│   └── customer-context.tsx # Authentication state
├── lib/
│   ├── shopify.ts         # Shopify API client functions
│   ├── shopify-queries.ts # GraphQL queries/mutations
│   └── utils.ts           # Utility functions (cn helper)
└── types/
    └── shopify.ts         # TypeScript interfaces for Shopify data
```

### Key Patterns

**Shopify Integration**: All Shopify data flows through `src/lib/shopify.ts` which provides typed wrapper functions around GraphQL queries. Products are transformed from Shopify's format to `LashesmoodProduct` with additional fields (category, benefits, kit contents).

**Shop Policies**: Shop policies (privacy, refund, shipping, terms) are fetched directly from Shopify's Shop Policies API via `shop.privacyPolicy`, `shop.refundPolicy`, etc. These are displayed at `/politiche/[handle]`.

**Cookie Banner**: The Shopify cookie consent banner is integrated via `src/components/cookie-banner.tsx` and automatically loads the Shopify privacy banner script. The banner is configured in Shopify Admin (Settings → Customer Privacy → Cookie banner). 

**Important**: For custom storefronts (headless), the cookie banner requires:
- Shopify Admin → Settings → Customer privacy → Cookie banner to be enabled
- Your custom domain (`www.lashesmood.com`) to be authorized for headless storefronts
- Proper configuration of `NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN` in `.env.local`

If you see a 401 error, verify these settings in Shopify Admin. The cookie banner may not be available for all Shopify plans or store configurations.

**State Management**: Uses React Context for global state:
- `CartProvider` - Cart operations via `/api/cart` route
- `CustomerProvider` - Authentication via `/api/auth/*` routes

**Layout System**: `AppShell` wraps pages with Header/Footer except for auth routes (`/account/login`, `/account/register`).

**Path Alias**: Use `@/*` to import from `src/*` (e.g., `@/components/ui/button`).

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SHOPIFY_DOMAIN` - Shopify store domain
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API token
- `NEXT_PUBLIC_SHOPIFY_COUNTRY` - Country code (default: IT)
- `NEXT_PUBLIC_SHOPIFY_LANGUAGE` - Language code (default: IT)

Optional (for cookie banner):
- `NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN` - Checkout domain (e.g., checkout.yourstore.com)
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN` - Storefront root domain (e.g., yourstore.com)

## Code Style

From `.cursor/rules/regole.mdc`:
- Use tabs for indentation
- Use single quotes for strings
- Omit semicolons
- Use PascalCase for components/types, kebab-case for files/directories, camelCase for variables/functions
- Prefix event handlers with `handle` (e.g., `handleClick`)
- Prefix booleans with verbs (e.g., `isLoading`, `hasError`)
- Prefer functional components with TypeScript interfaces
- Default to Server Components; use `'use client'` only when necessary
