---
description: Use this skill to optimize ECO RIDE vehicle images (next/image, AVIF/WebP, blur placeholders, responsive sizing, CDN) for fast loading on mobile and good Core Web Vitals.
---

# ECO RIDE Image Pipeline

## Mission

Vehicle images are 80% of the page weight. Optimize without losing premium feel.

## Use next/image everywhere

Never use raw `<img>`. Always `next/image` with:

- `alt` (descriptive, SEO-friendly)
- `sizes` (responsive)
- `priority` only for hero / above-the-fold
- `placeholder="blur"` + `blurDataURL` when possible

## next.config.ts

```ts
images: {
  formats: ["image/avif", "image/webp"],
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "**.unsplash.com" },
    // TODO_PROD: add Laravel storage CDN domain
  ],
  deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Vehicle card image

```tsx
<Image
  src={vehicle.images[0]}
  alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year} - ECO RIDE`}
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

## Vehicle detail hero

```tsx
<Image
  src={vehicle.images[0]}
  alt={...}
  fill
  priority
  sizes="100vw"
  className="object-cover"
/>
```

## Gallery — lazy by default

Only first image is `priority`. Others lazy. Use intersection observer for ultra-large galleries.

## Blur placeholders

For local images : `placeholder="blur"` automatic.

For remote (Unsplash, Laravel storage) :

- Generate a base64 tiny version at build (script `lib/blur.ts`)
- Or use `plaiceholder` package
- Stored in vehicle data: `vehicle.images[0].blurDataURL`

## Aspect ratios

- Cards : 4:3 (800×600)
- Hero : 16:9 (1600×900)
- Thumbnail : 1:1 (200×200)
- Gallery slide : 3:2 (1200×800)

Use `aspect-[4/3]` Tailwind utility on container to prevent CLS.

## Compression targets

- Hero AVIF : ≤ 80kb
- Card AVIF : ≤ 35kb
- Thumb AVIF : ≤ 12kb

next/image gère ça automatiquement avec quality (default 75). Pour véhicules premium, monter à 82.

## Lazy loading

`loading="lazy"` automatique sauf si `priority`. Vérifier que les images sous le pli (below the fold) ne sont PAS priority.

## Naming convention (for Laravel storage)

```
vehicles/{slug}/{index}-{size}.{format}
vehicles/peugeot-508-sw-2021/01-large.avif
vehicles/peugeot-508-sw-2021/01-medium.webp
```

## Admin upload checklist (Phase 1)

Quand Filament gère les uploads :

- Resize automatique 3 tailles (thumb 400px, card 800px, hero 1600px)
- Conversion AVIF + WebP fallback
- Stripping EXIF (privacy)
- Validation : max 10Mo input, accept JPG/PNG/HEIC
- Génération blurDataURL au moment de l'upload

## Avoid

- `<img src="...">` brut
- Images > 200kb après compression
- Hero sans `priority`
- Cards avec `priority` (cascade le rendu)
- Pas de `sizes` (force download du largest)
- Pas de `alt` (SEO + a11y KO)

## Mesurer

- Lighthouse LCP doit être < 2.5s mobile
- Total page weight < 1.5Mo
- Images doivent être ~60% du poids max

## Acceptance criteria

- Toutes les images via `next/image`.
- AVIF + WebP servis selon User-Agent.
- LCP image a `priority` + `fetchPriority="high"`.
- Aucune image > 200kb après build.
- `alt` descriptif sur toutes les images.
- Aspect ratio fixé → 0 layout shift.
