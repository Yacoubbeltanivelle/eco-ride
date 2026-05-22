---
description: Use this skill to build ECO RIDE mobile-first screens that feel like a native car rental app with bottom navigation, search, filters, sticky CTAs, vehicle cards and thumb-friendly interactions.
---

# ECO RIDE Mobile App Shell

## Mission

Build mobile screens as if ECO RIDE were a native app.

The mobile experience is more important than desktop.

## Required mobile structure

Every major user page should have:

- safe-area aware container;
- top app header;
- search or contextual title;
- horizontal chips when relevant;
- card-based content;
- sticky CTA when conversion matters;
- bottom navigation for main sections.

## Bottom navigation

Create a `MobileBottomNav` component.

Items:

```
Accueil
Catalogue
Simulateur
Favoris
Contact
```

Rules:

- Fixed at bottom on mobile.
- Hidden or transformed on desktop.
- Rounded floating dock.
- Glass or soft mint background.
- Icons from Lucide React.
- Active item clearly visible.
- Must not cover important content.

## Sticky CTA

Create `StickyMobileCTA`.

Variants:

- Vehicle detail:
  - Appeler
  - WhatsApp
  - Demander ce véhicule
- Location VTC:
  - Voir les véhicules
  - Être rappelé
- Lead form:
  - Continuer
  - Retour

Rules:

- Always readable.
- Thumb-friendly height: 56–68px.
- Fixed bottom, above nav if nav exists.
- Use clear pricing if relevant.

## Mobile home structure

The mobile homepage should include:

1. Cinematic welcome / hero.
2. Search bar.
3. Quick intent cards:
   - Louer pour VTC
   - Acheter occasion
   - Mandataire auto
4. Featured vehicles carousel.
5. Trust badges.
6. Process in 3 steps.
7. CTA contact.

## Vehicle cards mobile

Create `VehicleCardMobile`.

Must show:

- image;
- vehicle title;
- badge location/vente;
- price;
- year;
- mileage;
- fuel;
- availability;
- CTA.

Preferred layout:

- image top or left;
- rounded 24–28px;
- price in top or bottom right;
- favorite icon;
- quick CTA.

## Filter behavior

On mobile, filters must open in a bottom sheet.

Filters:

- Usage: location / vente / mandataire.
- Budget.
- Marque.
- Énergie.
- Boîte.
- VTC compatible.
- Disponible maintenant.

Do not show a heavy desktop sidebar on mobile.

## Touch targets

Minimum:

- Buttons: 44px height
- Chips: 36px height
- Bottom nav buttons: 48px
- Input: 48px

## Animation

Use Framer Motion lightly:

- page fade;
- cards slide-up;
- bottom sheet spring;
- CTA micro-interaction.

Avoid excessive animation.

## Mobile visual style

Use:

- pale mint backgrounds;
- white/mint cards;
- green/blue accents;
- soft shadows;
- rounded components;
- strong contrast.

## Acceptance criteria

The mobile UI is good when:

- It can be used comfortably with one thumb.
- Main actions are visible without searching.
- The catalogue feels fast and simple.
- The detail page has a clear next action.
- It feels more like an app than a basic website.
