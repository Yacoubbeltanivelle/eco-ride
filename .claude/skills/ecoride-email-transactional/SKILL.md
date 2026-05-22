---
description: Use this skill to define ECO RIDE transactional emails (confirmations, status updates, contract ready, payment receipts, reminders) with React Email templates, Resend/Mailgun providers and tracking.
---

# ECO RIDE Email Transactional

## Mission

Automatiser tous les emails du parcours client + interne pour ne plus dépendre de relances manuelles.

## Provider recommandé

**Resend** (modern, React Email native, free tier 3000/mois). Alternatives :
- Mailgun (FR datacenter, gros volumes)
- SendGrid (large mais lourd)
- Postmark (excellent pour transactional)

## Stack

- `resend` (Node) ou `Symfony Mailer` (Laravel)
- `@react-email/components` pour templates
- Provider sécurisé SPF + DKIM + DMARC

## Templates obligatoires

| Trigger | Destinataire | Template |
|---|---|---|
| Lead reçu | Client | `lead-confirmation` |
| Lead reçu | ECO RIDE | `lead-notification-internal` |
| Document manquant | Client | `docs-reminder` |
| Offre envoyée | Client | `offer-sent` |
| Contrat prêt | Client | `contract-ready` (lien Yousign) |
| Contrat signé | Client + Admin | `contract-signed` |
| Acompte reçu | Client | `payment-received` |
| Paiement échoué | Client | `payment-failed` |
| Mensualité reçue | Client | `monthly-receipt` |
| RDV confirmé | Client | `appointment-confirmed` |
| Véhicule livré | Client | `vehicle-delivered` |
| Fin location | Client | `rental-end-thanks` |

## Template structure (React Email)

```tsx
// emails/lead-confirmation.tsx
import { Body, Button, Container, Head, Heading, Html, Img, Section, Text } from "@react-email/components";

type Props = { firstname: string; vehicle: string; leadId: string };

export default function LeadConfirmation({ firstname, vehicle, leadId }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ background: "#EFF7F1", fontFamily: "Inter, Arial, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "40px auto", background: "white", borderRadius: 16, padding: 32 }}>
          <Img src="https://ecoride.pro/logo-full.png" width="170" alt="ECO RIDE" />
          <Heading style={{ color: "#0F6B3A", fontSize: 24, marginTop: 24 }}>
            Bonjour {firstname}, on a bien reçu votre demande
          </Heading>
          <Text>
            Votre demande pour le véhicule <strong>{vehicle}</strong> a été enregistrée
            (réf. <code>{leadId}</code>). Notre équipe revient vers vous sous 24h ouvrées.
          </Text>
          <Section style={{ textAlign: "center", marginTop: 32 }}>
            <Button href="https://ecoride.pro/demande/suivi" style={{ background: "#0F6B3A", color: "white", padding: "14px 28px", borderRadius: 999 }}>
              Suivre mon dossier
            </Button>
          </Section>
          <Text style={{ marginTop: 32, fontSize: 12, color: "#8A938E" }}>
            ECO RIDE · 20 bis Rue Louis Philippe, 92200 Neuilly-sur-Seine · 01 00 00 00 00
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

## Envoi (Next.js + Resend)

```ts
// lib/email/send.ts
import { Resend } from "resend";
import LeadConfirmation from "@/emails/lead-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendLeadConfirmation(to: string, props: { firstname: string; vehicle: string; leadId: string }) {
  return resend.emails.send({
    from: "ECO RIDE <contact@ecoride.pro>",
    to,
    subject: `Votre demande ECO RIDE - ${props.vehicle}`,
    react: LeadConfirmation(props),
    replyTo: "contact@ecoride.pro",
  });
}
```

## Côté Laravel (mêmes templates)

Utiliser `Illuminate\Notifications\Notification` ou `Mailable` :

```php
class LeadConfirmation extends Mailable {
  public function build() {
    return $this
      ->from('contact@ecoride.pro', 'ECO RIDE')
      ->subject("Votre demande ECO RIDE - {$this->vehicle}")
      ->view('emails.lead-confirmation')
      ->with(['firstname' => $this->lead->firstname, /* ... */]);
  }
}
```

→ Si Next.js et Laravel envoient les deux : centraliser côté Laravel (queue jobs), Next.js déclenche via API.

## Email branding rules

- Logo ECO RIDE en header (170px width max)
- Couleur principale : `#0F6B3A`
- Fond corps : `#EFF7F1`
- Container blanc arrondi 16px, padding 32px
- CTA bouton vert arrondi 999px
- Footer gris léger avec adresse + tel + lien désinscription si marketing
- Police : Inter + fallback system

## Domaines à configurer

```
ecoride.pro             # domaine principal
  ├── MX → provider (Mailgun/Resend)
  ├── TXT SPF (`v=spf1 include:resend.net ~all`)
  ├── TXT DKIM (généré par provider)
  └── TXT DMARC (`v=DMARC1; p=quarantine; rua=mailto:dmarc@ecoride.pro`)
```

Sans ces 3 enregistrements → emails finissent en spam.

## Adresses dédiées

- `contact@ecoride.pro` (entrant + sortant)
- `noreply@ecoride.pro` (transactional automatique)
- `commercial@ecoride.pro` (équipe)
- `support@ecoride.pro` (SAV)
- `dpo@ecoride.pro` (RGPD)

## Tracking & deliverability

- Open rate via pixel (Resend natif)
- Click tracking sur CTAs
- Bounce handling → désactiver email invalide en DB
- Soft bounces : retry 3x sur 24h
- Hard bounces : marquer email invalide

## Anti-spam checklist

- Pas de "Cliquez ici" générique → texte descriptif
- Ratio texte/image équilibré (50/50 min)
- Pas de mot rouge ("GRATUIT !!!", "URGENT")
- Lien de désinscription si email marketing
- Adresse postale complète en footer

## Test avant prod

- Mail-tester.com → score > 9/10
- GlockApps → tests inbox placement
- Litmus / Email on Acid → rendu multi-clients

## Avoid

- Templates HTML inline non testés sur Outlook
- `<style>` dans body (Gmail strip)
- Polices custom non-fallback (Inter OK, Helvetica fallback)
- Liens externes vers `bit.ly` ou autre raccourcisseur
- Pj > 5Mo

## Acceptance criteria

- 12 templates React Email opérationnels
- SPF + DKIM + DMARC validés sur `ecoride.pro`
- Score mail-tester > 9
- Tests envoi vers Gmail, Outlook, Apple Mail, Yahoo : rendu OK
- Queue jobs Laravel ou Resend webhooks pour suivi
- Lien désinscription pour emails non-transactionnels
