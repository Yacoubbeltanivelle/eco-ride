---
description: Use this skill to optimize ECO RIDE for local SEO in Neuilly-sur-Seine and Île-de-France, structured data for vehicles, dynamic sitemap, metadata patterns and Google Business Profile integration.
---

# ECO RIDE SEO Local

## Mission

Make ECO RIDE rank on local automotive queries:

- "location VTC Neuilly"
- "voiture occasion Neuilly-sur-Seine"
- "mandataire auto Île-de-France"
- "[marque] occasion 92"

## Page-level metadata rules

Every public page must export `Metadata` with:

- `title` — under 60 chars, includes city if relevant
- `description` — 140-160 chars, includes USP + city + CTA
- `keywords` — main keywords + local modifiers
- `openGraph` — title, description, image
- `alternates.canonical` — absolute URL
- `robots` — index/follow unless private

## Vehicle detail pages

Use `Vehicle` schema.org JSON-LD via `<Script type="application/ld+json">`:

```ts
{
  "@context": "https://schema.org",
  "@type": "Car",
  "name": `${brand} ${model} ${version}`,
  "brand": { "@type": "Brand", "name": brand },
  "vehicleModelDate": year,
  "mileageFromOdometer": { "@type": "QuantitativeValue", "value": mileageKm, "unitCode": "KMT" },
  "fuelType": fuel,
  "vehicleTransmission": transmission,
  "offers": {
    "@type": "Offer",
    "price": salePriceTtc,
    "priceCurrency": "EUR",
    "availability": status === "available" ? "InStock" : "OutOfStock",
    "areaServed": "Neuilly-sur-Seine"
  },
  "image": images
}
```

## Local Business JSON-LD

Add in `app/layout.tsx` (server side):

```ts
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "name": "ECO RIDE",
  "image": "/logo-full.png",
  "telephone": "+33100000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 bis Rue Louis Philippe",
    "postalCode": "92200",
    "addressLocality": "Neuilly-sur-Seine",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 48.8848, "longitude": 2.2685 },
  "areaServed": ["Neuilly-sur-Seine", "Île-de-France", "Paris"],
  "priceRange": "€€"
}
```

## Dynamic sitemap

`app/sitemap.ts` must include:

- static pages
- every vehicle detail (loop `vehicles.map(v => ({ url: ..., lastModified, changeFrequency: "weekly", priority: 0.8 }))`)
- catalog filtered variants (electric, hybrid, location, vente) with lower priority

## robots.ts

```ts
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin-demo", "/api"] }],
    sitemap: "https://ecoride.pro/sitemap.xml",
  };
}
```

## Local landing pages

Create city-specific landings:

- `/location-vtc-neuilly`
- `/voiture-occasion-92`
- `/mandataire-auto-paris`

Each must have unique copy (not duplicate). Min 600 words. Include phone, address, map, vehicles dispo localement.

## Image SEO

- Use `<Image alt="...">` always.
- Format alt: "Marque Modèle année - Eco Ride Neuilly".
- Use `next/image` with `priority` only on hero.

## Off-page

Recommend to client:

- Google Business Profile (verify address)
- Pages Jaunes pro
- Inscription annuaires VTC
- Avis Google fréquents

## Avoid

- Duplicate metadata across pages
- Missing canonical
- Keyword stuffing
- Hidden SEO content on mobile
- Empty H1
- Non-descriptive URLs

## Acceptance criteria

- Every page has unique title + meta description.
- Vehicle pages have JSON-LD Vehicle schema.
- Sitemap includes all dynamic vehicle URLs.
- robots.txt valid.
- Local intent covered (Neuilly, 92, IDF).
