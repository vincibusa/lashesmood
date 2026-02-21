import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { CustomerProvider } from "@/context/customer-context";
import { CookieConsentProvider } from "@/context/cookie-consent-context";
import AppShell from "@/components/layout/app-shell";
import CookieConsentBanner from "@/components/cookie-consent-banner";
import CookiePreferencesModal from "@/components/cookie-preferences-modal";
import { OrganizationSchema } from "@/components/seo/organization-schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LASHESMOOD - Extension Ciglia Semipermanenti Fai-da-Te",
    template: "%s | Lashesmood",
  },
  description: "Extension ciglia semipermanenti fai-da-te. Risultati da salone, direttamente a casa tua in pochi minuti. Press&GO! e Regular Kit disponibili.",
  keywords: "extension ciglia, ciglia finte, press and go, lashesmood, bellezza, makeup, extension ciglia fai da te",
  authors: [{ name: "Lashesmood" }],
  creator: "Lashesmood",
  publisher: "Lashesmood",
  metadataBase: new URL("https://lashesmood.com"),
  alternates: {
    canonical: "https://lashesmood.com",
    languages: {
      "it-IT": "https://lashesmood.com",
    },
  },
  openGraph: {
    title: "LASHESMOOD - Extension Ciglia Semipermanenti",
    description: "Extension ciglia semipermanenti fai-da-te. Risultati da salone, direttamente a casa tua.",
    url: "https://lashesmood.com",
    siteName: "Lashesmood",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://lashesmood.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lashesmood - Extension Ciglia Semipermanenti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LASHESMOOD - Extension Ciglia Semipermanenti",
    description: "Extension ciglia semipermanenti fai-da-te. Risultati da salone, direttamente a casa tua.",
    images: ["https://lashesmood.com/og-image.jpg"],
    creator: "@lashesmood",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <OrganizationSchema />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}>
        <CustomerProvider>
          <CartProvider>
            <CookieConsentProvider>
              <AppShell>
                {children}
              </AppShell>
              <CookieConsentBanner />
              <CookiePreferencesModal />
            </CookieConsentProvider>
          </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
