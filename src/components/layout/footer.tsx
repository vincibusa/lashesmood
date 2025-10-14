'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Video, Mail, Phone } from 'lucide-react';

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
            
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-xs">Accettiamo:</span>
              <div className="flex items-center gap-1 text-[10px] font-medium">
                <span className="px-2 py-1 bg-gray-100 rounded">VISA</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Mastercard</span>
                <span className="px-2 py-1 bg-gray-100 rounded">PayPal</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Klarna</span>
              </div>
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