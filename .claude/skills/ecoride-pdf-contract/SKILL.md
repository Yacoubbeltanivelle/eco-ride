---
description: Use this skill to generate ECO RIDE PDF contracts (rental, sale, mandate) with dynamic data, branded layout, electronic signature integration (Yousign/Docusign) and archival rules.
---

# ECO RIDE PDF Contract

## Mission

Générer des PDF contractuels propres et juridiquement utilisables, signés électroniquement.

**Critique** : tous les contenus juridiques sont des `Placeholder à valider par un avocat`.

## Contrats à générer

1. **Contrat de location VTC** (chauffeurs pros)
2. **Contrat de location particulier**
3. **Contrat de vente occasion**
4. **Mandat de recherche** (mandataire auto)
5. **État du véhicule** (avant remise + au retour)
6. **Reçu d'acompte**
7. **Facture finale**

## Stack recommandée

- **Laravel** : `barryvdh/laravel-dompdf` (simple HTML→PDF) ou `spatie/browsershot` (rendu pixel-perfect via Chromium)
- **Signature** : Yousign API (FR) ou Docusign
- **Stockage** : disque privé Laravel, signed URLs

Recommandation : `browsershot` pour rendu CSS Tailwind fidèle.

## Structure d'un contrat

```
┌─────────────────────────────────────┐
│ [Logo ECO RIDE]    Contrat N° XXX  │
│                    Date : JJ/MM/AAAA│
├─────────────────────────────────────┤
│ Entre les soussignés :              │
│                                     │
│ Le loueur : ECO RIDE                │
│ SIREN : 838 273 910                 │
│ Siège : 20 bis Rue Louis Philippe   │
│                                     │
│ Le locataire :                      │
│ Nom : {{customer.name}}             │
│ Adresse : {{customer.address}}      │
│ Email : {{customer.email}}          │
│                                     │
│ Objet : Location du véhicule        │
│ {{vehicle.brand}} {{vehicle.model}} │
│ Immatriculation : {{vehicle.plate}} │
├─────────────────────────────────────┤
│ Conditions financières :            │
│ - Loyer : {{rental.weekly}} € HT/sem│
│ - Caution : {{rental.deposit}} €    │
│ - Km inclus : {{rental.km}}/sem     │
├─────────────────────────────────────┤
│ Article 1 - Objet                   │
│ [Contenu juridique placeholder]     │
│                                     │
│ Article 2 - Durée                   │
│ ...                                 │
├─────────────────────────────────────┤
│ Signatures :                        │
│ Le loueur          Le locataire     │
│ [signature Yousign][signature       │
│                     électronique]   │
└─────────────────────────────────────┘
```

## Template Blade (Laravel)

```blade
{{-- resources/views/pdf/rental-contract.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Inter, sans-serif; color: #050706; }
    .header { display: flex; justify-content: space-between; align-items: center; }
    .logo { height: 40px; }
    .ref { color: #0F6B3A; font-weight: bold; }
    /* ... */
  </style>
</head>
<body>
  <div class="header">
    <img src="{{ public_path('logo-full.png') }}" class="logo">
    <div class="ref">N° {{ $contract->number }} · {{ $contract->created_at->format('d/m/Y') }}</div>
  </div>
  {{-- ... --}}
</body>
</html>
```

## Génération côté Laravel

```php
use Spatie\Browsershot\Browsershot;

class GenerateContract {
  public function execute(Contract $contract): string {
    $html = view('pdf.rental-contract', compact('contract'))->render();
    $path = storage_path("app/private/contracts/{$contract->id}.pdf");

    Browsershot::html($html)
      ->format('A4')
      ->showBackground()
      ->margins(20, 20, 30, 20)
      ->footerHtml('<div style="font-size:8px;text-align:center;width:100%">Page <span class="pageNumber"></span>/<span class="totalPages"></span></div>')
      ->save($path);

    return $path;
  }
}
```

## Signature électronique - Yousign

```php
// Procédure Yousign v3
$signature = Yousign::signatureRequests()->create([
  'name' => "Contrat ECO RIDE #{$contract->number}",
  'delivery_mode' => 'email',
  'documents' => [
    ['file' => fopen($pdfPath, 'r'), 'nature' => 'signable_document'],
  ],
  'signers' => [
    [
      'first_name' => $customer->firstname,
      'last_name' => $customer->lastname,
      'email' => $customer->email,
      'phone_number' => $customer->phone,
      'signature_authentication_mode' => 'otp_sms',
    ],
  ],
]);
```

→ Yousign envoie email au client → il signe en ligne → webhook Laravel reçoit confirmation.

## Webhooks à gérer (Yousign)

- `signature_request.activated` → procédure démarrée
- `signature_request.signed_by_signer` → un signataire a signé
- `signature_request.done` → tous ont signé, télécharger PDF signé
- `signature_request.expired` → relance auto + 7 jours

## Variables disponibles dans templates

```
{{ contract.* }}        # numéro, date, type
{{ customer.* }}        # nom, adresse, contact, pieces
{{ vehicle.* }}         # marque, modèle, immat, specs
{{ rental.* }}          # prix, caution, km, services inclus
{{ company.* }}         # ECO RIDE infos officielles
{{ today }}             # date formatée
```

## Archivage

- PDF signés : stockés 10 ans (obligation comptable)
- Disque privé chiffré
- Backup quotidien
- Suppression définitive demandée par client : log de la demande, suppression sous 30 jours

## Numéro de contrat

Format : `EC-{YYYY}-{type}-{seq}`
Ex : `EC-2026-RENTAL-00042`

Type : `RENTAL` / `SALE` / `MANDATE`

## Avoid

- Inventer du contenu juridique → toujours marquer placeholder
- Stocker PDF dans `public/`
- Réutiliser le même numéro (séquence unique en DB)
- Skip de la vérification webhook signature

## Acceptance criteria

- Template Blade par type de contrat (3 min)
- Génération PDF en local Browsershot OK
- Numérotation séquentielle unique
- Intégration Yousign en sandbox testée
- Webhook signé reçu et PDF final archivé
- Stockage privé + signed URL pour téléchargement client
