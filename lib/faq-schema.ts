export type FAQ = { q: string; a: string }

export function buildFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

export function buildPlaceSchema(record: {
  BUILDING: string
  ADDRESS: string
  POSTAL: string
  LATITUDE: string
  LONGITUDE: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: record.BUILDING,
    address: {
      '@type': 'PostalAddress',
      streetAddress: record.ADDRESS,
      postalCode: record.POSTAL,
      addressCountry: 'SG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: record.LATITUDE,
      longitude: record.LONGITUDE,
    },
    url: `https://www.sgpostalcode.com/postal/${record.POSTAL}/`,
  }
}
