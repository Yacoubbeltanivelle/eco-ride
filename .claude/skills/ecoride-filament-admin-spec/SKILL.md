---
description: Use this skill to specify and scaffold the ECO RIDE Filament 3 admin panel (Laravel 12) — resources, forms, tables, statuses, widgets and KPIs for vehicles, leads, customers and contracts.
---

# ECO RIDE Filament Admin Spec

## Mission

Define the admin panel ECO RIDE staff will use daily. Use Filament 3 (Laravel) because it ships forms/tables/widgets out of the box and reduces dev time vs custom React admin.

## Stack target

- Laravel 12
- Filament 3.x
- MySQL / MariaDB
- Sanctum (shared auth with Next.js front)
- Spatie Media Library for photos
- Spatie Permission for roles

## Roles

| Role | Accès |
|---|---|
| `super-admin` | Tout |
| `admin` | CRUD véhicules, demandes, clients |
| `commercial` | Demandes + clients (read/edit, pas suppression) |
| `viewer` | Lecture seule |

## Resources to build

### 1. VehicleResource

Form sections :
- Identification (brand, model, version, year, vin)
- Specs (mileageKm, fuel, transmission, powerHp, seats, doors, criteria, co2)
- Prix (salePriceTtc, rentalPriceWeeklyHt, rentalPriceMonthlyHt, depositAmount, includedKmWeekly)
- Catégorisation (intent: rental/sale/both, status, featured, vtcCompatible)
- Photos (multiple, drag-reorder)
- SEO (slug auto, metaTitle, metaDescription)
- Highlights (repeater string[])

Table colonnes : photo thumb, brand+model, year, status badge, price, intent badge, actions.

Filtres : status, fuel, intent, featured, year range, price range.

Bulk actions : marquer dispo/réservé, retirer du catalogue, dupliquer.

### 2. LeadResource

Statuts Kanban-style : new → contacted → docs_pending → offer_sent → contract_pending → paid → completed | lost.

Form : tous les champs du formulaire client + champs internes (assigned_to, internal_note, source_page).

Table : date, nom, type (rental/sale/mandate), véhicule lié, status badge coloré, commercial assigné.

Actions : changer statut, assigner commercial, ajouter note, envoyer email template, marquer perdu (avec raison).

Filtres : status, type, assigné, période, source.

Widget : nombre de leads non traités > 24h (alerte rouge).

### 3. CustomerResource

Form : civilité, nom, prénom, email, phone, type (particulier/VTC/pro), pièces (médias chiffrés).

Relations : `hasMany Leads`, `hasMany Contracts`, `hasMany Payments`.

Page custom : historique chronologique du client (timeline).

### 4. ContractResource

Champs : customer, vehicle, type (rental/sale), start_date, end_date, monthly_amount, deposit, status (draft/sent/signed/active/closed).

Actions : générer PDF, envoyer pour signature (Yousign), marquer signé, archiver.

### 5. PaymentResource (Phase 2)

Champs : amount, currency, status, stripe_payment_intent_id, customer, contract, type (acompte/mensualité/solde).

Webhook listener Stripe → updates status auto.

### 6. DocumentResource

Pour upload sécurisé : permis, CNI, RIB, KBIS, carte VTC.

Storage chiffré + accès loggé (`activitylog`).

## Widgets dashboard

- **Stat overview** : leads ce mois, taux conversion, CA réservé, véhicules dispo
- **Leads recents** (5 derniers, lien direct)
- **Véhicules top demandés** (par lead count 30 jours)
- **Calendrier disponibilités** (véhicules réservés/dispo)
- **Alertes** : leads > 24h sans contact, contrats à signer, paiements en attente

## Notifications Filament

À configurer :
- Nouveau lead → push notification commercial assigné
- Document uploadé par client → notif admin
- Paiement reçu → notif commercial + comptable
- Contrat signé → notif full équipe

## Permissions par resource

```php
// Spatie Permission
'view_any_vehicle', 'view_vehicle', 'create_vehicle', 'update_vehicle', 'delete_vehicle',
'view_any_lead', 'view_lead', 'create_lead', 'update_lead', 'reassign_lead',
// ...
```

`commercial` n'a pas `delete_*`.
`viewer` a uniquement `view_*`.

## Exports

Filament Excel export disponible sur :
- Vehicles (catalogue complet)
- Leads (rapport commercial mensuel)
- Customers (extract RGPD)
- Payments (compta)

## API Resources pour Next.js

Chaque modèle a son `Resource` Eloquent → expose la shape attendue côté Next (cf. skill ecoride-laravel-bridge).

```php
class VehicleResource extends JsonResource {
  public function toArray($req): array {
    return [
      'id' => $this->id,
      'slug' => $this->slug,
      'brand' => $this->brand,
      // ...
      'images' => $this->getMedia('photos')->map(fn($m) => $m->getFullUrl()),
    ];
  }
}
```

## Acceptance criteria

- 6 resources fonctionnelles (Vehicle, Lead, Customer, Contract, Payment, Document).
- Dashboard widgets opérationnels.
- 3 rôles min avec permissions Spatie.
- Exports Excel sur entités clés.
- Notifications branchées.
- Resources Eloquent exposent shape Next.js-compatible.
