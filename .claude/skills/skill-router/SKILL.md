---
name: skill-router
description: MANDATORY ENTRY POINT for every user request in this project. Invoke this skill FIRST, BEFORE any other tool call, to analyze the task and recommend 1-3 skills from the 115 available. Skip ONLY for trivial replies (pure greetings, single-word confirmations). Use this when the user describes any task, asks any question that may need action, asks "which skill should I use", or before starting any implementation work.
---

# Skill Router (mandatory)

## ⚠️ INVOCATION RULE

**Cette skill DOIT être invoquée systématiquement comme PREMIÈRE action à chaque nouvelle requête utilisateur dans ce projet** — sauf cas trivial absolu (salutation, "ok", "merci").

Si tu n'es pas certain qu'un cas est trivial → invoque ce skill.

Si l'utilisateur a déjà invoqué un skill explicitement (via `/<nom>`) → tu peux skipper ce router et exécuter directement.

Sinon : **router d'abord, agir après**.

## Mission

Choisir LE bon skill (ou les 2-3 bons skills) parmi les 115 disponibles dans `.claude/skills/`, pour une tâche donnée par l'utilisateur.

## Cas où skipper le router

Skipper UNIQUEMENT si :

- Pure salutation ("salut", "merci", "ok")
- L'utilisateur a déjà fait `/<nom-skill>`
- Réponse purement informationnelle qui ne déclenche aucune action (ex: "quel est le numéro du Header.tsx?")

Dans le doute → invoquer le router.

## Process en 4 étapes

### 1. Identifier l'intention

Catégoriser la tâche dans une famille :

| Famille | Mots-clés indicateurs |
| --- | --- |
| Design / UI | layout, composant, design, mobile, animation, hero, cards, hover, responsive |
| SEO | référencement, Google, metadata, sitemap, schema, ranking, mots-clés |
| Marketing | conversion, copywriting, ads, growth, email, onboarding, pricing, A/B test |
| Performance | vitesse, Core Web Vitals, LCP, optimisation images, bundle size |
| Sécurité | vulnérabilité, OWASP, XSS, injection, auth, RGPD, données sensibles |
| Workflow | TDD, debug, git, plan, code review, refactor |
| Backend | API, Laravel, DB, schéma, migration, admin, lead, payment |
| Context | mémoire, multi-agent, sub-agent, contexte trop long |
| ECO RIDE spécifique | véhicule, mandataire, VTC, Neuilly, location, occasion |

### 2. Filtrer les candidats

Lister les skills correspondants. Préférer :

1. **Skills `ecoride-*`** quand la tâche est spécifique au projet (ils contiennent les invariants business)
2. **Skills `superpowers-*`** quand c'est un workflow d'ingénierie
3. **Skills Anthropic** (`frontend-design`, `canvas-design`) quand c'est design générique
4. **Skills SEO ou marketing** plus larges quand la tâche est générale

### 3. Choisir 1 à 3 skills

Règles :

- **1 skill** si la tâche est focalisée (ex: "Audit accessibilité" → `fixing-accessibility`)
- **2 skills** si workflow + spécialité (ex: "Implémente la fiche véhicule en TDD" → `test-driven-development` puis `ecoride-premium-vehicle-detail`)
- **3 skills max** : workflow + design + spécialité

Ne JAMAIS recommander plus de 3 skills d'un coup. Au-delà = perte de focus.

### 4. Formater la recommandation

Toujours utiliser ce format :

```text
## Skills recommandés pour cette tâche

1. `<skill-1>` — <pourquoi en 1 phrase>
2. `<skill-2>` — <pourquoi en 1 phrase>  (si pertinent)
3. `<skill-3>` — <pourquoi en 1 phrase>  (si pertinent)

**Ordre d'invocation** : <skill-1> → <skill-2> → <skill-3>

**Skills écartés** (au cas où l'utilisateur les aurait en tête) :
- `<skill-écarté>` — <raison>
```

Puis demander à l'utilisateur s'il valide avant d'invoquer le premier skill.

## Cheat sheet — mappings fréquents pour ECO RIDE

### Design / UI

| Tâche | Skills (ordre) |
| --- | --- |
| Refonte design global | `ecoride-visual-fusion-system` → `ecoride-visual-quality-audit` |
| Composant mobile (nav, sheet, CTA) | `ecoride-mobile-app-shell` |
| Homepage / hero | `ecoride-cinematic-landing` |
| Catalogue + filtres | `ecoride-catalog-dashboard` |
| Fiche véhicule | `ecoride-premium-vehicle-detail` |
| Animations | `ecoride-motion-polish` |
| Audit visuel avant client | `ecoride-visual-quality-audit` |
| Sélection composant 21st.dev | `ecoride-21st-component-scout` |
| Design générique (sans contexte ECO RIDE) | `frontend-design` |
| SVG / canvas programmatique | `canvas-design` |

### SEO

| Tâche | Skills (ordre) |
| --- | --- |
| SEO local Neuilly | `ecoride-seo-local` |
| SEO technique général | `seo-technical` |
| Audit SEO complet | `seo-audit` → `seo-page` |
| Schema.org véhicule | `ecoride-seo-local` (inclus) ou `seo-schema` |
| Sitemap dynamique | `seo-sitemap` |
| SEO programmatique (pages générées) | `seo-programmatic` ou `programmatic-seo` |
| Backlinks | `seo-backlinks` |
| Contenu SEO | `seo-content-brief` → `seo-content` |
| Google Business Profile | `seo-maps` |
| Stratégie SEO | `seo-plan` |

### Marketing / Conversion

| Tâche | Skills (ordre) |
| --- | --- |
| Optimiser conversion d'une page | `cro` |
| Écrire du copy | `copywriting` → `copy-editing` |
| Lead magnet | `lead-magnets` |
| Email de relance | `emails` ou `cold-email` |
| Onboarding utilisateur | `onboarding` |
| Pricing | `pricing` |
| A/B testing | `ab-testing` |
| Stratégie de lancement | `launch` |
| Recherche client | `customer-research` |
| Ads creative | `ad-creative` → `ads` |

### Backend / Production

| Tâche | Skills (ordre) |
| --- | --- |
| Préparer migration vers Laravel | `ecoride-laravel-bridge` |
| Modèle de données véhicule | `ecoride-vehicle-data-model` |
| Spec admin Filament | `ecoride-filament-admin-spec` |
| Tunnel de demande / leads | `ecoride-lead-pipeline` |
| Emails transactionnels | `ecoride-email-transactional` |
| Intégration Stripe | `ecoride-stripe-flow` |
| Génération PDF contrats | `ecoride-pdf-contract` |
| Optimisation images | `ecoride-image-pipeline` |
| Conformité RGPD | `ecoride-rgpd-compliance` |

### Workflow / Qualité

| Tâche | Skills (ordre) |
| --- | --- |
| Implémenter une feature en TDD | `test-driven-development` → `<skill-spécialité>` |
| Bug à diagnostiquer | `systematic-debugging` |
| Plan d'implémentation | `writing-plans` → `executing-plans` |
| Code review (donner) | `requesting-code-review` |
| Code review (recevoir) | `receiving-code-review` |
| Vérifier avant "fini" | `verification-before-completion` |
| Travail parallèle (git) | `using-git-worktrees` |
| Tâche complexe multi-agents | `dispatching-parallel-agents` |
| Brainstorm | `brainstorming` |
| Finaliser une branche | `finishing-a-development-branch` |
| Créer un nouveau skill | `writing-skills` |

### Sécurité

| Tâche | Skills (ordre) |
| --- | --- |
| Audit sécurité OWASP | `owasp-security` |
| Audit RGPD ECO RIDE | `ecoride-rgpd-compliance` |

### Context engineering (meta)

| Tâche | Skills (ordre) |
| --- | --- |
| Contexte trop long | `context-compression` |
| Optimiser le contexte | `context-optimization` |
| Concevoir mémoire agent | `memory-systems` |
| Architecture multi-agents | `multi-agent-patterns` |
| Concevoir un outil agent | `tool-design` |

### Cas combinés fréquents

| Tâche | Combo |
| --- | --- |
| Refonte fiche véhicule pour conversion | `ecoride-premium-vehicle-detail` + `cro` + `ecoride-motion-polish` |
| Page de landing SEO local Neuilly | `ecoride-seo-local` + `ecoride-cinematic-landing` + `cro` |
| Optimiser images du catalogue | `ecoride-image-pipeline` + `seo-images` |
| Pipeline lead → email → admin | `ecoride-lead-pipeline` + `ecoride-email-transactional` + `ecoride-filament-admin-spec` |
| Préparer mise en prod V1 | `ecoride-rgpd-compliance` + `owasp-security` + `ecoride-laravel-bridge` |

## Heuristiques anti-erreur

- **Si la tâche mentionne ECO RIDE, Neuilly, VTC, mandataire** → préférer un skill `ecoride-*` même s'il existe un équivalent générique
- **Si la tâche est un workflow** (debug, plan, test) → invoquer le skill workflow EN PREMIER, puis le skill spécialité
- **Ne pas mélanger `superpowers/systematic-debugging` et un skill spécialité** dans la même invocation initiale — debug d'abord, puis l'expertise
- **Si l'utilisateur parle de Laravel/Filament/Stripe/Yousign** → consulter aussi `ecoride-laravel-bridge` ou skill matching, car le bridge cadre les patterns d'intégration

## Quand déléguer à l'agent `task-routing-architect`

Si tu détectes que :

- La tâche nécessite > 3 skills coordonnés
- Il y a > 2 décisions architecturales à prendre
- L'utilisateur demande un plan multi-jours/multi-phases

Alors recommande d'utiliser l'agent `task-routing-architect` (Task tool → `subagent_type: ecoride-task-routing-architect`). Lui peut analyser la tâche dans un contexte isolé et retourner un plan détaillé.

## Acceptance criteria

- Tu n'invoques jamais > 3 skills d'un coup en sortie de routing
- Tu justifies chaque choix en 1 phrase
- Tu signales les skills écartés pour ne pas que l'utilisateur en doute
- Tu attends validation avant d'invoquer le premier skill recommandé
- Tu détectes les tâches trop complexes et suggères l'agent `task-routing-architect`
