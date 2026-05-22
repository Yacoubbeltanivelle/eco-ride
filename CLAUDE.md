# ECO RIDE — Instructions projet Claude Code

## ⚠️ PROTOCOLE OBLIGATOIRE — À chaque requête utilisateur

**AVANT toute action, tu DOIS invoquer le skill `skill-router`** sauf cas trivial (salutation, "ok", "merci", confirmation simple).

Ordre d'exécution obligatoire :

1. **Invoque `skill-router`** (Skill tool, name=`skill-router`)
2. Le router te recommande 1 à 3 skills pour la tâche
3. Si la tâche dépasse 3 skills coordonnés OU touche > 2 sous-systèmes → délègue à l'agent `task-routing-architect` (Task tool, subagent_type=`task-routing-architect`)
4. Sinon, invoque le skill recommandé et exécute

**Cette règle prévaut sur toutes les autres**, y compris la tentation de répondre directement parce que "ça paraît simple".

Si tu sautes le router sans justification triviale, tu enfreins le protocole projet.

## TL;DR

**ECO RIDE** = plateforme automobile premium à Neuilly-sur-Seine : location VTC + occasion + mandataire.
**Maquette V0** Next.js 15 (App Router) + TypeScript + Tailwind v4 + Framer Motion, mobile-first.
**Conversion** = objectif #1 sur chaque page.
**Prod future** = Laravel 12 + MySQL + Filament + Stripe + Yousign + Resend (Phases 1→3 séquentielles).

## Stack actuelle

- Next.js 15 App Router
- TypeScript strict
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Zod + React Hook Form
- Mock data dans `/data` (à remplacer par Laravel API en V1)

## Commandes

```bash
npm run dev      # localhost:3001
npm run build
npm run lint
```

## Skills disponibles

**115 skills installés** dans `.claude/skills/`. Inventaire complet : [SKILLS_CATALOG.md](SKILLS_CATALOG.md).

### Familles principales

| Famille | Nb | Quand l'utiliser |
| --- | --- | --- |
| `ecoride-*` (custom projet) | 18 | Toute décision design ou prod ECO RIDE |
| `seo-*` ([claude-seo](https://github.com/AgriciDaniel/claude-seo)) | 25 | SEO technique, schema, content, audit, programmatic |
| Marketing ([marketingskills](https://github.com/coreyhaines31/marketingskills)) | 40 | Copywriting, CRO, ads, growth, emails, onboarding |
| Workflow ([superpowers](https://github.com/obra/superpowers)) | 14 | TDD, debug systématique, plans, code review, worktrees |
| Context engineering ([Agent-Skills](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering)) | 14 | Mémoire, compression contexte, multi-agents |
| Design (Anthropic) | 2 | `frontend-design`, `canvas-design` |
| `owasp-security` ([owasp](https://github.com/agamm/claude-code-owasp)) | 1 | Audit sécurité OWASP Top 10 2025-2026 |
| `remotion` ([remotion-dev](https://github.com/remotion-dev/skills)) | 1 | Génération vidéo programmatique |

### Skills `ecoride-*` (les 18 du projet)

| Skill | Quand l'utiliser |
| --- | --- |
| `ecoride-visual-fusion-system` | Décisions design global (palette, typo, radius) |
| `ecoride-mobile-app-shell` | Composants mobile (bottom nav, sticky CTA, sheets) |
| `ecoride-cinematic-landing` | Homepage, sections hero, storytelling |
| `ecoride-catalog-dashboard` | Catalogue + filtres + comparateur |
| `ecoride-premium-vehicle-detail` | Fiches véhicule |
| `ecoride-motion-polish` | Animations Framer Motion |
| `ecoride-visual-quality-audit` | Audit avant présentation client |
| `ecoride-21st-component-scout` | Sélection composants 21st.dev |
| `ecoride-seo-local` | Metadata + JSON-LD Vehicle + sitemap (Neuilly) |
| `ecoride-lead-pipeline` | Formulaires + statuts leads + emails |
| `ecoride-rgpd-compliance` | Mentions légales, CGV, cookies CNIL |
| `ecoride-image-pipeline` | next/image, AVIF, blur, CLS |
| `ecoride-laravel-bridge` | Préparer Next pour API Laravel + Sanctum |
| `ecoride-filament-admin-spec` | Spec admin V1 (resources, widgets, roles) |
| `ecoride-stripe-flow` | Acompte + abonnements + webhooks |
| `ecoride-pdf-contract` | Contrats PDF + Yousign |
| `ecoride-email-transactional` | Templates emails + Resend |
| `ecoride-vehicle-data-model` | Schéma véhicule canonique (TS+Laravel+Filament) |

Agent : `ecoride-art-director` (`.claude/agents/`).

## Direction artistique

Fusion à respecter :

1. **App mobile** : bottom nav, cartes véhicules, sticky CTA
2. **Mint électrique** : fond `--eco-mint-bg`, cards blanches arrondies
3. **Cinematic noir** : hero `--eco-black`, typo massive, lignes fines
4. **Dashboard marketplace** : sidebar filtres + drawer détail (desktop catalogue)

### Palette CSS

```css
--eco-black: #050706;       --eco-ink: #0B0F0D;
--eco-mint-bg: #EFF7F1;     --eco-mint-soft: #DDEFE4;
--eco-green: #0F6B3A;       --eco-green-neon: #49E58C;
--eco-blue: #39BDEB;        --eco-muted: #8A938E;
```

### Radius

chip 999px · card 24px · panel premium 32px · hero image 32px

## Règles produit

- **Mobile-first** avant desktop.
- Chaque page = objectif de conversion clair.
- Aucun contenu SEO essentiel caché sur mobile.
- Légal toujours marqué `Placeholder à valider juridiquement`.

## Règles techniques

- TypeScript strict, composants réutilisables dans `/components`.
- Mock data dans `/data` (V0).
- `TODO_PROD:` pour tout ce qui sera branché à Laravel.
- Aucun secret dans le code.
- Pas de logo constructeur sans licence.
- Pas de fausse garantie ni certification.

## Roadmap

| Phase | Périmètre | Skills clés |
| --- | --- | --- |
| **V0** (maquette) | Statique + mock data | visual-fusion, mobile-shell, cinematic-landing, motion-polish |
| **V1** (lancement) | Catalogue réel + admin simple + formulaires connectés + SEO + légal | laravel-bridge, filament-admin-spec, seo-local, rgpd-compliance, lead-pipeline, vehicle-data-model |
| **V2** (espace client) | Compte client + upload docs + acompte Stripe + signature électronique | stripe-flow, pdf-contract, email-transactional |
| **V3** (scale) | Reporting, automatisations, blog SEO, monitoring | (custom à définir) |

## Ordre de travail recommandé

1. Design system (`ecoride-visual-fusion-system`)
2. Mobile shell (`ecoride-mobile-app-shell`)
3. Homepage (`ecoride-cinematic-landing`)
4. Catalogue (`ecoride-catalog-dashboard`)
5. Fiche véhicule (`ecoride-premium-vehicle-detail`)
6. Motion polish (`ecoride-motion-polish`)
7. Audit visuel (`ecoride-visual-quality-audit`)

## Références externes

- **Design statique de référence** : `F:\Carriere\Business2026\ClientPlus\SiteClientPlus\public\demos\EcorideSITE\` (ne pas modifier)
- **Source désynchronisée** : `f:\PojetDev\projetECORIDE\EcorideSITE-1\` (référence code, intacte)
- **Configuration MCP** : `.mcp.json` (clés API dans variables d'environnement — voir `ENV_VARS.md`)

## Stack production cible

- Laravel 12 API
- MySQL / MariaDB
- Laravel Sanctum (auth)
- Filament 3 Admin
- Stripe (paiements)
- Yousign (signature)
- Resend ou Mailgun (emails)
- OVH (domaine `ecoride.pro` + hébergement)
- Spatie Media Library (photos)
