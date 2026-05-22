---
description: Use this skill to ensure ECO RIDE meets French legal requirements (mentions légales, CGV, RGPD, cookies CNIL, médiation de la consommation) before going to production.
---

# ECO RIDE RGPD & Legal Compliance

## Mission

Make ECO RIDE legally publishable in France for B2B + B2C automotive activities.

**Critical**: every legal text must be marked `Placeholder à valider juridiquement par un avocat`. This skill structures content but cannot replace a lawyer.

## Required pages

| Page | Route | Audience |
|---|---|---|
| Mentions légales | `/mentions-legales` | Tous |
| CGV Vente | `/cgv` | B2C + B2B |
| Conditions de location | `/conditions-location` | VTC + particuliers |
| Politique de confidentialité | `/confidentialite` | Tous |
| Politique cookies | `/cookies` | Tous |
| Médiation conso | `/mediation` | B2C uniquement |
| Demande RGPD (accès/suppression) | `/donnees-personnelles` | Tous |

## Mentions légales — contenu minimum

- Raison sociale, forme juridique, capital social
- SIRET / SIREN
- RCS Nanterre (validé client)
- TVA intracommunautaire si applicable
- Siège social
- Directeur de publication
- Hébergeur (nom, adresse, téléphone)
- Numéro CNIL si déclaration

## CGV — points obligatoires (B2C)

- Caractéristiques essentielles du véhicule/service
- Prix TTC et modalités de paiement
- Frais de livraison/retrait
- Droit de rétractation (14 jours sauf véhicule personnalisé)
- Garanties légales (conformité + vices cachés)
- Durée du contrat
- Caution
- Modalités résiliation
- Lien médiation consommation

Pour B2B : dispense rétractation, mais reste sur conformité.

## RGPD — base légale

Pour chaque traitement, définir base légale :

| Donnée | Finalité | Base légale | Durée |
|---|---|---|---|
| Email/tel/nom | Traitement demande | Exécution contrat / intérêt légitime | 3 ans après dernier contact |
| Permis, CNI | Location VTC | Obligation légale + contrat | Durée contrat + 5 ans |
| Justif domicile | Location | Contrat | Durée contrat + 1 an |
| Cookies analytics | Mesure d'audience | Consentement | 13 mois |
| Cookies marketing | Publicité | Consentement | 13 mois |

## Cookie banner (CNIL)

- 3 options visibles avec **même poids visuel** : Accepter / Refuser / Personnaliser
- Pas de bouton "Accepter" pré-coché
- Refus aussi facile que l'accord
- Cookies non-essentiels chargés UNIQUEMENT après consentement
- Lien vers `/cookies` permanent en footer

Implémentation : composant `CookieBanner` côté client, stocke choix dans `localStorage`, déclenche analytics conditionnellement.

## Document upload (RGPD-sensitive)

Pour permis, CNI, justificatifs :

- Stockage **privé** (pas dans `public/`)
- Chiffrement au repos (Laravel `encrypted` cast ou S3 SSE)
- Accès loggé (qui a vu quoi, quand)
- Suppression automatique après X mois (configurable)
- Lien d'upload signé à durée limitée (pas de URL publique)

TODO_PROD : signed URLs via Laravel + S3 / OVH Object Storage.

## Médiation de la consommation (B2C)

Le pro doit afficher :

- Nom du médiateur (ex : Médiateur du e-commerce de la FEVAD)
- Coordonnées
- Lien vers la plateforme RLL européenne

## Formulaires — informations à afficher

À côté de chaque collecte, mentionner :

> "Vos données sont collectées par ECO RIDE pour traiter votre demande. Elles sont conservées 3 ans. Vous disposez d'un droit d'accès, de rectification et de suppression via [/donnees-personnelles]. Réclamation possible auprès de la CNIL."

## Avoid

- Garanties non couvertes par contrat (`100% satisfait`, `qualité garantie`)
- Certifications fictives (`Certifié Eco Ride Premium`)
- Logos pros sans accord (Uber, Bolt, fédérations)
- Témoignages inventés
- Prix barrés non justifiés (DGCCRF)

## Acceptance criteria

- 7 pages légales existent et sont accessibles depuis le footer.
- Toutes marquées `Placeholder juridique - à valider`.
- Cookie banner respecte CNIL (3 boutons équipoids).
- Formulaires affichent mention RGPD.
- Aucune fausse garantie.
- Lien CNIL et médiation présents.
