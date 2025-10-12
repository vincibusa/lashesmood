'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Video, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerSections = [
    {
      title: 'Prodotti',
      links: [
        { label: 'Press&GO! Kit', href: '/collections/press-go-kit-completo' },
        { label: 'Kit Regular', href: '/collections/regular' },
        { label: 'Accessori', href: '/collections/accessori' },
        { label: 'Carte Regalo', href: '/products/carta-regalo' },
      ],
    },
    {
      title: 'Supporto',
      links: [
        { label: 'Come Funziona', href: '/come-funziona' },
        { label: 'Tutorial Video', href: '/come-funziona#tutorial' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contatti', href: '/contatti' },
      ],
    },
    {
      title: 'Azienda',
      links: [
        { label: 'Chi Siamo', href: '/chi-siamo' },
        { label: 'Collaborazioni', href: '/collaborazioni' },
        { label: 'Rivenditori', href: '/rivenditori' },
        { label: 'Affiliate Program', href: '/affiliate' },
      ],
    },
    {
      title: 'Informazioni',
      links: [
        { label: 'Spedizioni e Resi', href: '/spedizioni' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Termini e Condizioni', href: '/termini' },
        { label: 'Cookie Policy', href: '/cookie' },
      ],
    },
  ];

  return (
    <footer className="bg-brand-light border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Resta aggiornata sulle novità! 💕
            </h3>
            <p className="mb-6 opacity-90">
              Iscriviti alla newsletter per ricevere sconti esclusivi, tutorial e tips di bellezza.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="bg-white text-brand-primary hover:bg-gray-100 font-medium px-6 py-3">
                Iscriviti
              </Button>
            </div>
            <p className="text-xs mt-3 opacity-75">
              Riceverai uno sconto del 10% sul tuo primo ordine! 🎁
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-brand-primary">
                CIGLISSIME
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Extension ciglia semipermanenti fai-da-te. Risultati da salone, 
              direttamente a casa tua in pochi minuti.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <Link 
                href="https://instagram.com/ciglissime" 
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Instagram className="h-5 w-5 text-brand-primary hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="https://tiktok.com/@ciglissime" 
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Video className="h-5 w-5 text-brand-primary hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="https://facebook.com/ciglissime" 
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Facebook className="h-5 w-5 text-brand-primary hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-brand-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>shop@ciglissime.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>Lun-Ven 9:30-18:30</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <img src="/payment-icons.png" alt="Metodi di pagamento" className="h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Ciglissime. Tutti i diritti riservati.
            </p>
            <p className="mt-2 md:mt-0">
              Made with 💕 in Italy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;