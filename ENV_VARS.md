# Variables d'environnement ECO RIDE

Ce fichier liste **toutes** les variables nécessaires pour :
1. Les MCP configurés dans `.mcp.json`
2. Le projet Next.js (V0 actuel + V1/V2 production)

**⚠ Ne JAMAIS commit `.env.local`, `.env.production`, ni les clés ci-dessous.**

## 1. MCP — Variables système (`$env:VAR` ou `~/.bashrc`)

Ces variables doivent être définies au niveau système (PowerShell : `$env:NAME = "..."` ou via "Variables d'environnement" Windows) pour que Claude Code les passe aux MCP servers.

| Variable | MCP | Où l'obtenir | Optionnel ? |
| --- | --- | --- | --- |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | github | github.com → Settings → Developer settings → Tokens (classic). Scopes : `repo`, `read:org`. | Recommandé |
| `BRAVE_API_KEY` | brave-search | api.search.brave.com → Plans (free 2000 req/mois) | Optionnel |
| `STRIPE_SECRET_KEY` | stripe | dashboard.stripe.com → Developers → API keys. Format `sk_test_...` ou `sk_live_...` | Phase 2 |
| `VERCEL_API_TOKEN` | vercel | vercel.com/account/tokens | Optionnel |
| `FIGMA_API_KEY` | figma | figma.com → Settings → Personal access tokens | Si maquette Figma |

### Définir une variable (PowerShell, permanent)

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_PERSONAL_ACCESS_TOKEN", "ghp_xxx", "User")
```

Ferme et rouvre VSCode pour que la variable soit prise en compte.

### Définir temporairement (session courante)

```powershell
$env:GITHUB_PERSONAL_ACCESS_TOKEN = "ghp_xxx"
```

## 2. MCP sans clé requise

Ces MCP fonctionnent dès le redémarrage de Claude Code :

- `shadcn` (parcourir registre shadcn/ui)
- `playwright` (navigateur headless local)
- `filesystem` (accès fichiers locaux scopés)
- `memory` (mémoire persistante locale)
- `sequential-thinking` (raisonnement étape par étape)

## 3. Next.js — Variables projet (`.env.local`)

Créer `.env.local` à la racine de `EcorideSITE/` (déjà dans `.gitignore` Next.js par défaut).

### V0 (actuel — maquette)

```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

Rien de plus nécessaire pour la maquette statique.

### V1 (lancement — backend Laravel)

```env
NEXT_PUBLIC_APP_URL=https://ecoride.pro
NEXT_PUBLIC_API_URL=https://api.ecoride.pro/api
```

### V2 (espace client + paiement)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx   # client-safe
STRIPE_SECRET_KEY=sk_test_xxx                    # serveur uniquement
RESEND_API_KEY=re_xxx                            # emails transactionnels
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### V3 (signature électronique + monitoring)

```env
YOUSIGN_API_KEY=xxx
YOUSIGN_WEBHOOK_SECRET=xxx
SENTRY_DSN=https://xxx@sentry.io/xxx
```

## 4. Laravel (`.env` côté backend - V1+)

```env
APP_NAME=ECORIDE
APP_ENV=production
APP_URL=https://api.ecoride.pro
FRONTEND_URL=https://ecoride.pro

DB_CONNECTION=mysql
DB_HOST=...
DB_DATABASE=ecoride
DB_USERNAME=...
DB_PASSWORD=...

SANCTUM_STATEFUL_DOMAINS=ecoride.pro,localhost:3001
SESSION_DOMAIN=.ecoride.pro

MAIL_MAILER=resend
RESEND_API_KEY=...

STRIPE_KEY=pk_live_xxx
STRIPE_SECRET=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CASHIER_CURRENCY=eur

FILESYSTEM_DISK=ovh_object_storage
OVH_ACCESS_KEY=...
OVH_SECRET_KEY=...
OVH_BUCKET=ecoride-private
OVH_REGION=GRA

YOUSIGN_API_KEY=...
YOUSIGN_WEBHOOK_SECRET=...
```

## 5. Sécurité

- Tokens **jamais** dans le code source.
- `.env.local`, `.env.production`, `.env` toujours dans `.gitignore`.
- Pour partager en équipe : utiliser 1Password / Doppler / OVH Secret Manager.
- Rotation : tokens MCP tous les 90 jours, secrets prod tous les 6 mois.
- Stripe : utiliser `sk_test_*` jusqu'à validation client. `sk_live_*` uniquement en prod.

## 6. Checklist avant prod V1

- [ ] `GITHUB_PERSONAL_ACCESS_TOKEN` configuré localement
- [ ] `.env.production` créé (jamais commit)
- [ ] DNS configurés : SPF + DKIM + DMARC sur `ecoride.pro`
- [ ] Stripe en mode test validé end-to-end
- [ ] Variables Vercel ou OVH ajoutées au panneau d'admin
- [ ] Secrets backups dans un gestionnaire (1Password/Doppler)
