# ECO RIDE — Frontend

Plateforme automobile premium à Neuilly-sur-Seine : **location VTC**, **vente d'occasion** et **mandataire auto**.

Ce dépôt contient le **frontend Next.js**. Le backend (API + admin) est un projet Laravel séparé, non versionné ici : `C:\wamp64\www\ecoride-backend`.

## Architecture

```text
┌─────────────────────────┐         ┌──────────────────────────────┐
│  Frontend Next.js 15    │  HTTP   │  Backend Laravel 12          │
│  (ce repo)              │ ──────► │  C:\wamp64\www\ecoride-backend │
│  localhost:3001         │  /api   │  localhost:8000              │
│                         │         │  + Admin Filament (/admin)   │
└─────────────────────────┘         └──────────────────────────────┘
        │ fallback si API indisponible
        ▼
   Mock data (/data)
```

Le frontend appelle l'API Laravel via [lib/api/](lib/api/) et **retombe automatiquement sur les mock data** de [data/](data/) si l'API ne répond pas. Le site reste donc 100 % fonctionnel sans backend (mode maquette), à l'exception de l'envoi réel des leads.

### Endpoints API consommés

| Méthode | Endpoint | Usage | Fallback |
| --- | --- | --- | --- |
| GET | `/api/vehicles` (+ filtres) | Catalogue | mocks `data/vehicles.ts` |
| GET | `/api/vehicles/featured` | Véhicules mis en avant (home) | mocks filtrés |
| GET | `/api/vehicles/{slug}` | Fiche véhicule | mock par slug |
| GET | `/api/vehicles/{slug}/similar` | Suggestions | mocks |
| GET | `/api/settings` | Contact, horaires, SEO, feature flags | `DEFAULT_SETTINGS` ([lib/api/settings.ts](lib/api/settings.ts)) |
| POST | `/api/leads` | Formulaire `/demande` (throttle 5/min/IP) | **aucun** — erreur affichée |

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind CSS v4** + **Framer Motion** + **Lucide React**
- **Zod** + **React Hook Form** (formulaires)
- Backend : Laravel 12 + Filament 3 + MySQL (repo séparé)

## Démarrage

### Prérequis

- Node.js 20+
- PHP 8.3 + Composer (pour le backend, via WAMP)
- Backend Laravel installé dans `C:\wamp64\www\ecoride-backend`

### Installation

```bash
npm install
cp .env.example .env.local         # puis ajuster si besoin (voir ENV_VARS.md)
```

### Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Frontend seul — Next.js sur [localhost:3001](http://localhost:3001) |
| `npm run dev:back` | Backend seul — API Laravel ([localhost:8000](http://localhost:8000)) + queue |
| `npm run dev:all` | **Les deux en parallèle** (frontend + backend) |
| `npm run build` | Build production (mode Vercel) |
| `GITHUB_PAGES=true npm run build` | Build export statique (mode GitHub Pages) |
| `npm run lint` | ESLint |

L'admin Filament est accessible sur [localhost:8000/admin](http://localhost:8000/admin) une fois le backend lancé (resources : Vehicles, Leads, Settings).

### Variables d'environnement

Voir [ENV_VARS.md](ENV_VARS.md) pour la liste complète. Minimum pour le dev local :

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

Sans `NEXT_PUBLIC_API_URL`, le client API utilise `http://127.0.0.1:8000/api` par défaut ([lib/api/client.ts](lib/api/client.ts)).

## Structure

```text
app/                  Pages (App Router)
├── page.tsx          Homepage (hero cinématique)
├── catalogue/        Catalogue + filtres
├── vehicules/[slug]/ Fiches véhicule (SSG)
├── demande/          Formulaire de lead multi-étapes → POST /api/leads
├── location-vtc/     Landing VTC
├── achat-occasion/   Landing occasion
├── mandataire-auto/  Landing mandataire
├── simulateur/       Simulateur de budget
├── comparer/         Comparateur de véhicules
├── blog/             Blog (derrière feature flag, désactivé par défaut)
└── mentions-legales/, cgv/, confidentialite/, cookies/   Pages légales

components/
├── catalogue/        Filtres avancés, slider de prix
├── layout/           Header, Footer
├── mobile/           Bottom nav, sticky CTA (mobile-first)
├── ui/               Sections réutilisables (bento, FAQ, témoignages…)
└── vehicles/         Carte, galerie, score véhicule

lib/
├── api/              Client API Laravel (client, vehicles, leads, settings)
├── settings-context.tsx   Settings du site injectés depuis l'admin
└── utils.ts

data/                 Mock data (fallback) : vehicles, faqs, testimonials
types/                Types TypeScript partagés (Vehicle…)
```

## Déploiements

Chaque push sur `main` déclenche **deux déploiements automatiques** :

| Cible | URL | Mode |
| --- | --- | --- |
| **Vercel** | [eco-ride-pink.vercel.app](https://eco-ride-pink.vercel.app) | SSR/ISR complet |
| **GitHub Pages** | [yacoubbeltanivelle.github.io/eco-ride](https://yacoubbeltanivelle.github.io/eco-ride/) | Export statique (`output: export`, basePath `/eco-ride`) |

Le workflow GitHub Pages est dans [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) — il build avec `GITHUB_PAGES=true`, ce qui active l'export statique dans [next.config.ts](next.config.ts).

> ⚠️ **Contrainte export statique** : pas de `force-dynamic`, pas de headers serveur, images non optimisées. Avant de pusher, vérifier que `GITHUB_PAGES=true npm run build` passe en local.

En production, ni Vercel ni GitHub Pages n'atteignent l'API locale → le site tourne sur les mocks. Quand l'API Laravel sera hébergée publiquement, ajouter `NEXT_PUBLIC_API_URL` dans les settings Vercel. Les points à rebrancher sont marqués `TODO_PROD:` dans le code.

## Conventions

- **Mobile-first** : chaque page est conçue d'abord pour mobile.
- **TypeScript strict**, composants réutilisables dans `/components`.
- `TODO_PROD:` marque tout ce qui sera branché au Laravel de production.
- Aucun secret dans le code — voir [ENV_VARS.md](ENV_VARS.md).
- Contenu légal marqué `Placeholder à valider juridiquement`.
- Direction artistique (palette, radius, typo) : voir [CLAUDE.md](CLAUDE.md).

## Roadmap

| Phase | Périmètre | Statut |
| --- | --- | --- |
| **V0** | Maquette statique + mock data | ✅ Livré |
| **V1** | API Laravel + admin Filament + formulaires connectés + SEO + légal | 🔧 En cours (API locale fonctionnelle, hébergement à venir) |
| **V2** | Espace client + acompte Stripe + signature Yousign | À venir |
| **V3** | Reporting, automatisations, blog SEO, monitoring | À venir |

Hébergement cible : OVH (`ecoride.pro`).
