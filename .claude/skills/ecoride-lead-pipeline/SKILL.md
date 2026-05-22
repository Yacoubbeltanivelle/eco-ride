---
description: Use this skill to design and implement ECO RIDE lead capture, status pipeline, email notifications and CRM-style tracking for incoming requests (location, vente, mandataire).
---

# ECO RIDE Lead Pipeline

## Mission

Transform every form submission into a tracked lead with:

- structured data;
- automatic email confirmation;
- internal notification;
- status pipeline visible to admin and customer.

## Lead types

Three sources:

- `rental` — Location VTC / particulier
- `sale` — Achat occasion
- `mandate` — Mandataire auto

## Required fields per type

### Common

- name, phone, email
- consent RGPD (boolean, mandatory)
- source page (referer)
- created_at
- locale

### Rental

- client type: VTC / pro / particulier / entreprise
- vehicle requested (slug or free text)
- start date
- duration (weeks)
- weekly budget HT
- message

### Sale

- vehicle requested
- budget TTC
- trade-in (boolean + brand/model/year)
- financing needed (boolean)
- appointment desired (boolean)

### Mandate

- brand, model, version requested
- year range
- max km
- budget
- preferred fuel
- timeframe

## Status pipeline

```
new → contacted → docs_pending → offer_sent → contract_pending → paid → completed
                                                    └→ lost (with reason)
```

Each transition timestamps + optional note.

## Validation

Use Zod schema in `lib/validators/lead.ts`. Reject:

- emails without `@`
- phones not matching `^\+?[0-9 .-]{8,}$`
- consent === false
- duration < 1 or > 156 (3 years)

## Submission flow

1. Client fills form → `useForm` (react-hook-form + zodResolver)
2. POST to `app/api/leads/route.ts` (placeholder for V0 — log only)
3. On success: redirect to `/demande/merci?id=<uuid>`
4. Email to client (confirmation)
5. Email to ECO RIDE (notification)
6. TODO_PROD: insert into Laravel DB via Sanctum API

## Email templates needed

- `lead-confirmation-rental.html`
- `lead-confirmation-sale.html`
- `lead-confirmation-mandate.html`
- `lead-internal-notification.html`
- `lead-status-update.html` (per status)
- `lead-doc-reminder.html`

Use `react-email` or simple HTML templates with placeholders.

## RGPD checkpoints

- Explicit consent checkbox (not pre-checked)
- Link to politique de confidentialité near submit
- Logs retention: anonymize after 3 years
- Right to access/delete via dedicated form

## V0 vs Production

V0 (current):

- Form validates client-side
- Submit logs to console + simulates email
- Mark with `TODO_PROD: connect to Laravel /api/leads`

V1 (production):

- POST → Laravel endpoint
- Laravel persists lead in DB
- Laravel triggers email via Mailgun/SendGrid/Resend
- Admin Filament sees lead in pipeline table

## Acceptance criteria

- Submit a form → JSON payload structured per type.
- Validation rejects bad input with clear errors.
- TODO_PROD markers in code for all paid integrations.
- Status enum available + transition function pure.
- Emails are templated (not inline strings).
