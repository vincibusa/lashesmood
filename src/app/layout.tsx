import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { CustomerProvider } from "@/context/customer-context";
import AppShell from "@/components/layout/app-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIGLISSIME - Extension Ciglia Semipermanenti Fai-da-Te",
  description: "Extension ciglia semipermanenti fai-da-te. Risultati da salone, direttamente a casa tua in pochi minuti. Press&GO! e Regular Kit disponibili.",
  keywords: "extension ciglia, ciglia finte, press and go, ciglissime, bellezza, makeup",
  authors: [{ name: "Ciglissime" }],
  openGraph: {
    title: "CIGLISSIME - Extension Ciglia Semipermanenti",
    description: "Extension ciglia semipermanenti fai-da-te. Risultati da salone, direttamente a casa tua.",
    type: "website",
    locale: "it_IT",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}>
        <CustomerProvider>
          <CartProvider>
            <AppShell>
              {children}
            </AppShell>
          </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
