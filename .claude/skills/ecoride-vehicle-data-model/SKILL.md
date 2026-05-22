---
description: Use this skill to define and maintain the canonical ECO RIDE Vehicle data model — TypeScript types (Next.js), Laravel migration/Eloquent (V1), Filament resource and validation, ensuring 1:1 alignment across all layers.
---

# ECO RIDE Vehicle Data Model

## Mission

Une seule source de vérité pour la donnée véhicule, traversant :

- Mock TypeScript (V0 — actuel)
- Laravel migration + Eloquent (V1)
- Filament resource (admin)
- Validation Zod + FormRequest (front + API)
- JSON-LD Vehicle (SEO)
- Stripe metadata
- PDF contracts

Toute modification de schéma doit être faite ici en premier, puis propagée.

## Schema canonique

```ts
// lib/types/vehicle.ts
export type VehicleStatus = "available" | "reserved" | "rented" | "sold" | "coming_soon";
export type VehicleIntent = "rental" | "sale" | "both";
export type VehicleFuel = "diesel" | "essence" | "hybride" | "hybride_rechargeable" | "electrique" | "gpl";
export type VehicleTransmission = "manuelle" | "automatique";
export type VehicleCategory = "berline" | "suv" | "break" | "citadine" | "hybride" | "electrique" | "utilitaire" | "premium";
export type CritAir = "0" | "1" | "2" | "3" | "4" | "5";

export type Vehicle = {
  // Identification
  id: string;
  slug: string;                  // unique, URL-safe : "peugeot-508-sw-2021"
  brand: string;
  model: string;
  version: string;
  year: number;

  // Specs
  mileageKm: number;
  fuel: VehicleFuel;
  transmission: VehicleTransmission;
  powerHp: number;
  seats: number;
  doors: number;
  category: VehicleCategory;
  critair: CritAir;
  co2?: number;                  // g/km, optionnel
  color?: string;
  vin?: string;                  // jamais public, admin only

  // Catégorisation
  intent: VehicleIntent;
  status: VehicleStatus;
  featured: boolean;
  vtcCompatible: boolean;

  // Prix
  salePriceTtc?: number;         // € TTC, requis si intent ∈ [sale, both]
  rentalPriceWeeklyHt?: number;  // € HT/sem, requis si intent ∈ [rental, both]
  rentalPriceMonthlyHt?: number;
  depositAmount?: number;        // caution
  includedKmWeekly?: number;     // km inclus/sem

  // Médias
  images: string[];              // URLs (Unsplash V0, S3/OVH V1)
  blurDataURL?: string;          // base64 placeholder

  // Contenu marketing
  highlights: string[];          // 3-5 puces commerciales
  description?: string;          // long form

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Audit
  createdAt: string;             // ISO 8601
  updatedAt: string;
};
```

## Règles d'invariants

- `intent === "rental"` ⟹ `rentalPriceWeeklyHt` requis, `salePriceTtc` ignoré.
- `intent === "sale"` ⟹ `salePriceTtc` requis, prix location ignorés.
- `intent === "both"` ⟹ les deux requis.
- `status === "available"` ⟹ visible au catalogue public.
- `featured === true` ⟹ apparaît en homepage (max 6).
- `vtcCompatible === true` ⟹ apparaît dans filtre VTC.
- `slug` immuable après création (sinon SEO 404).
- `images` : min 1, max 12.
- `highlights` : min 3, max 6.

## Validation Zod

```ts
// lib/validators/vehicle.ts
import { z } from "zod";

export const VehicleSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  brand: z.string().min(1).max(40),
  model: z.string().min(1).max(60),
  version: z.string().max(80),
  year: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  mileageKm: z.number().int().min(0).max(500000),
  fuel: z.enum(["diesel","essence","hybride","hybride_rechargeable","electrique","gpl"]),
  transmission: z.enum(["manuelle","automatique"]),
  powerHp: z.number().int().min(40).max(800),
  seats: z.number().int().min(2).max(9),
  doors: z.number().int().min(2).max(5),
  category: z.enum(["berline","suv","break","citadine","hybride","electrique","utilitaire","premium"]),
  critair: z.enum(["0","1","2","3","4","5"]),
  co2: z.number().int().min(0).max(400).optional(),
  intent: z.enum(["rental","sale","both"]),
  status: z.enum(["available","reserved","rented","sold","coming_soon"]),
  featured: z.boolean(),
  vtcCompatible: z.boolean(),
  salePriceTtc: z.number().int().min(1000).max(500000).optional(),
  rentalPriceWeeklyHt: z.number().int().min(100).max(10000).optional(),
  rentalPriceMonthlyHt: z.number().int().min(300).max(40000).optional(),
  depositAmount: z.number().int().min(0).max(20000).optional(),
  includedKmWeekly: z.number().int().min(0).max(10000).optional(),
  images: z.array(z.string().url()).min(1).max(12),
  highlights: z.array(z.string().min(3).max(80)).min(3).max(6),
}).refine(
  (v) => v.intent === "sale" || v.rentalPriceWeeklyHt !== undefined,
  { message: "rentalPriceWeeklyHt requis si intent inclut location", path: ["rentalPriceWeeklyHt"] }
).refine(
  (v) => v.intent === "rental" || v.salePriceTtc !== undefined,
  { message: "salePriceTtc requis si intent inclut vente", path: ["salePriceTtc"] }
);

export type ValidatedVehicle = z.infer<typeof VehicleSchema>;
```

## Laravel migration (V1)

```php
// database/migrations/2026_XX_XX_create_vehicles_table.php
Schema::create('vehicles', function (Blueprint $t) {
  $t->uuid('id')->primary();
  $t->string('slug')->unique();
  $t->string('brand', 40);
  $t->string('model', 60);
  $t->string('version', 80);
  $t->smallInteger('year');
  $t->integer('mileage_km');
  $t->enum('fuel', ['diesel','essence','hybride','hybride_rechargeable','electrique','gpl']);
  $t->enum('transmission', ['manuelle','automatique']);
  $t->smallInteger('power_hp');
  $t->tinyInteger('seats');
  $t->tinyInteger('doors');
  $t->enum('category', ['berline','suv','break','citadine','hybride','electrique','utilitaire','premium']);
  $t->enum('critair', ['0','1','2','3','4','5']);
  $t->smallInteger('co2')->nullable();
  $t->string('color', 40)->nullable();
  $t->string('vin', 17)->unique()->nullable();
  $t->enum('intent', ['rental','sale','both']);
  $t->enum('status', ['available','reserved','rented','sold','coming_soon'])->default('available');
  $t->boolean('featured')->default(false);
  $t->boolean('vtc_compatible')->default(false);
  $t->integer('sale_price_ttc')->nullable();
  $t->integer('rental_price_weekly_ht')->nullable();
  $t->integer('rental_price_monthly_ht')->nullable();
  $t->integer('deposit_amount')->nullable();
  $t->integer('included_km_weekly')->nullable();
  $t->json('highlights');
  $t->text('description')->nullable();
  $t->string('meta_title')->nullable();
  $t->string('meta_description')->nullable();
  $t->timestamps();

  $t->index(['status', 'intent']);
  $t->index('featured');
  $t->index('vtc_compatible');
  $t->index('slug');
});
```

Photos via `spatie/laravel-medialibrary` (table séparée).

## Eloquent + Resource

```php
// app/Models/Vehicle.php
class Vehicle extends Model {
  use HasUuids, InteractsWithMedia;

  protected $casts = [
    'featured' => 'boolean',
    'vtc_compatible' => 'boolean',
    'highlights' => 'array',
    'year' => 'integer',
    'mileage_km' => 'integer',
  ];

  public function registerMediaCollections(): void {
    $this->addMediaCollection('photos')->useDisk('public_s3');
  }

  public function scopeAvailable($q) { return $q->where('status', 'available'); }
  public function scopeFeatured($q) { return $q->where('featured', true)->take(6); }
  public function scopeForVtc($q) { return $q->where('vtc_compatible', true); }
}

// app/Http/Resources/VehicleResource.php (matches TS type exactement)
public function toArray($req): array {
  return [
    'id' => $this->id,
    'slug' => $this->slug,
    'brand' => $this->brand,
    'model' => $this->model,
    'version' => $this->version,
    'year' => $this->year,
    'mileageKm' => $this->mileage_km,           // ⚠ camelCase pour Next
    'fuel' => $this->fuel,
    'transmission' => $this->transmission,
    'powerHp' => $this->power_hp,
    'seats' => $this->seats,
    'doors' => $this->doors,
    'category' => $this->category,
    'critair' => $this->critair,
    'co2' => $this->co2,
    'intent' => $this->intent,
    'status' => $this->status,
    'featured' => $this->featured,
    'vtcCompatible' => $this->vtc_compatible,
    'salePriceTtc' => $this->sale_price_ttc,
    'rentalPriceWeeklyHt' => $this->rental_price_weekly_ht,
    'rentalPriceMonthlyHt' => $this->rental_price_monthly_ht,
    'depositAmount' => $this->deposit_amount,
    'includedKmWeekly' => $this->included_km_weekly,
    'images' => $this->getMedia('photos')->map(fn($m) => $m->getFullUrl())->all(),
    'highlights' => $this->highlights,
    'createdAt' => $this->created_at->toIso8601String(),
    'updatedAt' => $this->updated_at->toIso8601String(),
  ];
}
```

## Naming convention DB ↔ TS

| Laravel (snake_case) | TypeScript (camelCase) |
|---|---|
| `mileage_km` | `mileageKm` |
| `power_hp` | `powerHp` |
| `vtc_compatible` | `vtcCompatible` |
| `sale_price_ttc` | `salePriceTtc` |
| `created_at` | `createdAt` |

VehicleResource fait la conversion.

## Énumérations - source unique

Pour éviter la dérive entre Zod, TS, Laravel enum DB :

- TS définit les types dans `lib/types/vehicle.ts`
- Zod réutilise les mêmes literals
- Laravel : utiliser `enum` MySQL OU PHP enum (`App\Enums\VehicleFuel`)
- Filament `Select` lit le PHP enum

Quand on ajoute une valeur (ex: `hydrogene`) :
1. Update `lib/types/vehicle.ts`
2. Update Zod schema
3. Migration Laravel `ALTER TABLE` + update enum
4. Update PHP enum
5. Build + tests

## Avoid

- Stocker prix en `float` → toujours integers (centimes pour acompte, euros pour véhicules)
- Mélanger snake_case et camelCase dans le même layer
- VIN en clair côté front (admin-only)
- `slug` modifiable après publication (sinon 404 SEO)

## Acceptance criteria

- 1 fichier `lib/types/vehicle.ts` = source de vérité
- Zod schema valide les invariants (intent ↔ prix)
- Migration Laravel produit les mêmes colonnes
- VehicleResource produit shape identique au type TS
- Filament resource utilise PHP enum
- Renaming d'un champ = changement dans 4 endroits documentés
