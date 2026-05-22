---
description: Use this skill to build ECO RIDE catalogue and marketplace dashboard screens with filters, vehicle list, map/availability placeholder, comparison, sorting and desktop/mobile responsive behavior.
---

# ECO RIDE Catalogue Dashboard

## Mission

Build the ECO RIDE catalogue experience.

It must work as:

- mobile catalogue app;
- desktop marketplace dashboard;
- conversion system for vehicle leads.

## Desktop layout

Use a 3-zone layout when screen width allows:

```
Left: filters sidebar
Center: vehicle results
Right: map/details/availability panel
```

If a real map is not available in V0, create a premium placeholder panel showing:

- pickup zone;
- availability;
- nearest contact point;
- selected vehicle detail;
- CTA.

## Mobile layout

Mobile must not use desktop sidebar.

Use:

- top search;
- horizontal chips;
- filter bottom sheet;
- vehicle cards;
- sticky contact CTA.

## Filters

Required filters:

- Type d'offre: location / vente / mandataire
- Usage: VTC / pro / particulier / entreprise
- Budget
- Marque
- Énergie
- Boîte
- Année
- Kilométrage
- Disponible maintenant
- VTC compatible
- Éco / hybride / électrique

## Sorting

Sort options:

- Recommandés
- Prix croissant
- Prix décroissant
- Kilométrage croissant
- Année récente
- Disponible rapidement

## Vehicle result card

Each result card must show:

- image;
- title;
- price;
- offer type;
- location or sale badge;
- year;
- mileage;
- fuel;
- transmission;
- VTC compatibility;
- availability status;
- CTA.

## Selected vehicle drawer

On desktop, selecting a vehicle may open a side panel.

Panel content:

- large image;
- price;
- specs;
- services included;
- quick score;
- CTA "Demander ce véhicule".

## Map placeholder rules

Do not pretend to show live vehicle geolocation unless backend exists.

Use labels like:

- Zone de retrait indicative
- Disponibilité à confirmer

## Comparison

Allow user to compare up to 3 vehicles.

Compare:

- price;
- year;
- mileage;
- fuel;
- transmission;
- services included;
- VTC compatibility;
- deposit;
- included mileage;
- availability.

## Empty states

If no result:

- explain clearly;
- suggest removing filters;
- show CTA "Être rappelé".

## Acceptance criteria

Catalogue is successful if:

- User finds a vehicle quickly.
- Filters are easy on mobile.
- Desktop feels professional.
- Vehicle details are clear before clicking.
- CTA is always available.
