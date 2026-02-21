'use client'

import React from 'react'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Lashesmood',
    description: 'Extension ciglia semipermanenti fai-da-te. Risultati da salone, direttamente a casa tua.',
    url: 'https://lashesmood.com',
    logo: 'https://lashesmood.com/logo.png',
    image: 'https://lashesmood.com/og-image.jpg',
    telephone: '+39-XXX-XXXXXXX',
    email: 'info@lashesmood.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
      addressLocality: 'Italia',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Italia',
    },
    sameAs: [
      'https://www.instagram.com/lashesmood',
      'https://www.facebook.com/lashesmood',
      'https://www.tiktok.com/@lashesmood',
    ],
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
