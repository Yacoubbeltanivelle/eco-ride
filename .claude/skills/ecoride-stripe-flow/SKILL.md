---
description: Use this skill to integrate Stripe in ECO RIDE for acompte (deposit), monthly rentals, sale payments, webhooks and invoices — using PaymentIntent/Subscription with PCI-safe patterns.
---

# ECO RIDE Stripe Flow

## Mission

Permettre à ECO RIDE d'encaisser :

1. **Acompte** (Phase 2) — pour réserver un véhicule
2. **Paiement mensuel location** (Phase 3) — abonnement
3. **Paiement comptant vente** (Phase 3) — one-shot
4. **Caution bloquée** (Phase 3) — manual capture

Sans jamais que la carte transite par les serveurs ECO RIDE (PCI-safe).

## Pourquoi Stripe

- Pas besoin de PCI-DSS complet (Stripe gère)
- Webhooks fiables
- Support PSD2/SCA (3DS automatique)
- Connectable Laravel facilement (`stripe/stripe-php`)
- Disponible Euros + AMEX/CB/Apple Pay

## Architecture

```
[Next.js] → embedded Stripe Elements → Stripe.com
                  ↓ (payment_intent_succeeded)
              [Webhook Laravel] → update DB → email client + admin
```

## Acompte flow

1. Client choisit véhicule → clique "Réserver pour 500 €"
2. Next.js POST `/api/payments/create-intent` → Laravel crée `PaymentIntent` Stripe avec `amount=50000` (centimes)
3. Laravel renvoie `clientSecret`
4. Stripe Elements affiche formulaire CB
5. Confirmation → Stripe redirige vers `/demande/paiement/succes`
6. Webhook `payment_intent.succeeded` → Laravel marque `Lead.deposit_paid=true`
7. Email automatique : "Acompte reçu, on vous contacte sous 24h"

## Stripe Elements (Next.js)

```tsx
"use client";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function PaymentForm({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
```

## Côté Laravel (Cashier)

Utiliser `laravel/cashier-stripe` v15+ :

```php
// In Customer model
use Laravel\Cashier\Billable;
class Customer extends Authenticatable { use Billable; }

// Créer PaymentIntent
$intent = $customer->createSetupIntent();
// ou pour paiement direct :
$payment = $customer->charge(50000, $paymentMethod); // 500€
```

## Webhooks à gérer

| Event | Action |
|---|---|
| `payment_intent.succeeded` | Marquer acompte payé, email client |
| `payment_intent.payment_failed` | Email "paiement échoué, retentez" |
| `charge.refunded` | Marquer remboursé, email |
| `invoice.paid` | Marquer mensualité OK |
| `invoice.payment_failed` | Email relance + bloquer accès véhicule (location) |
| `customer.subscription.deleted` | Fin de location |

Route Laravel : `POST /stripe/webhook` (signature vérifiée via `Stripe::webhooks()->constructEvent`).

## Caution (manual capture)

Pour bloquer caution sans débit :

```php
$intent = $stripe->paymentIntents->create([
  'amount' => 150000, // 1500€
  'currency' => 'eur',
  'capture_method' => 'manual',
  'customer' => $customer->stripe_id,
]);
```

→ Bloqué 7 jours max. Capturer si dégâts, annuler sinon.

## Facture / Reçu

Stripe génère reçus automatiquement (email). Pour factures formelles :

- Stripe Invoice API (préférable)
- Ou générer PDF custom (cf. skill `ecoride-pdf-contract`)

## Tests Stripe

Cartes test :
- `4242 4242 4242 4242` → succès
- `4000 0027 6000 3184` → demande 3DS
- `4000 0000 0000 9995` → fonds insuffisants

Toujours développer en `STRIPE_SECRET_KEY=sk_test_...` jusqu'à validation client.

## Env vars

```
# .env.local (Next.js)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx     # serveur Next.js si proxy

# .env (Laravel)
STRIPE_KEY=pk_test_xxx
STRIPE_SECRET=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CASHIER_CURRENCY=eur
CASHIER_CURRENCY_LOCALE=fr_FR
```

## Sécurité

- **Jamais** stocker un PAN (numéro CB) côté ECO RIDE
- **Toujours** valider webhook signature
- **Toujours** vérifier `payment_intent.metadata.lead_id` correspond à un vrai lead
- Idempotency keys pour éviter doubles débits
- Webhook endpoint sur HTTPS uniquement

## Conformité

- Mention "Paiement sécurisé par Stripe" visible au moment de payer
- Logo Stripe + CB + Visa + Mastercard
- Mention SCA 3DS si applicable
- CGV doivent mentionner Stripe comme prestataire de paiement

## Avoid

- Stocker tokens carte plus de nécessaire
- Skip webhook signature verification
- Charger publishable key côté serveur (utile uniquement client)
- Mélanger test mode et live mode (variables séparées)

## Acceptance criteria

- PaymentIntent fonctionne en mode test (carte `4242...`)
- Webhook reçu et trace en DB
- SCA 3DS s'affiche correctement
- Email confirmation envoyé après succès
- Aucune donnée carte sur serveur Laravel
- Tests automatisés avec Stripe CLI (`stripe trigger payment_intent.succeeded`)
