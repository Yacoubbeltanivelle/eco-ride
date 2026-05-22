---
description: Use this skill to prepare ECO RIDE Next.js codebase for seamless integration with the future Laravel 12 + Sanctum API (typed fetch, error handling, auth, env vars, swap mock-to-real data).
---

# ECO RIDE Laravel Bridge

## Mission

Make the V0 Next.js code structurally ready to talk to a Laravel 12 + Sanctum API without rewriting components.

## Architecture target

```
[Next.js App Router]
   ├── components/        (UI, no fetch)
   ├── app/(routes)       (server components fetch via lib/api)
   ├── lib/api/           (typed fetch client)
   │   ├── client.ts      (fetch wrapper, auth, errors)
   │   ├── vehicles.ts    (vehicle endpoints)
   │   ├── leads.ts       (lead endpoints)
   │   └── auth.ts        (Sanctum CSRF + token)
   ├── lib/types/         (DTOs shared with Laravel)
   └── data/              (mocks - DELETED in V1)
```

## Typed fetch client

`lib/api/client.ts`:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: { code: string; message: string; details?: unknown } };
export type ApiResponse<T> = ApiOk<T> | ApiErr;

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...init?.headers,
      },
      credentials: "include", // for Sanctum cookies
      cache: init?.cache ?? "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: { code: String(res.status), message: body.message ?? res.statusText, details: body } };
    }

    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: { code: "NETWORK", message: (err as Error).message } };
  }
}
```

## Sanctum auth flow

```
1. POST /sanctum/csrf-cookie    (sets XSRF-TOKEN cookie)
2. POST /api/login              (returns session cookie)
3. Subsequent requests carry cookie via credentials: "include"
4. Logout: POST /api/logout
```

`lib/api/auth.ts` :

```ts
export async function login(email: string, password: string) {
  await fetch(`${API_URL.replace("/api","")}/sanctum/csrf-cookie`, { credentials: "include" });
  return apiFetch<{ user: User }>("/login", { method: "POST", body: JSON.stringify({ email, password }) });
}
```

## DTO discipline

Define every type in `lib/types/`. Match Laravel API resources 1:1.

```ts
// lib/types/vehicle.ts
export type Vehicle = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileageKm: number;
  fuel: "diesel" | "essence" | "hybride" | "electrique";
  // ...
};
```

Côté Laravel, créer un `App\Http\Resources\VehicleResource` qui produit exactement cette shape.

## Env vars

`.env.local` (V0) :
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

V1 prod :
```
NEXT_PUBLIC_API_URL=https://api.ecoride.pro/api
NEXT_PUBLIC_APP_URL=https://ecoride.pro
```

## Mock-to-real swap pattern

Each data fetch should be one-line swap :

```ts
// data/vehicles.ts (V0)
export const vehicles: Vehicle[] = [/* mock */];
export function getFeaturedVehicles() {
  return vehicles.filter(v => v.featured).slice(0, 6);
}

// lib/api/vehicles.ts (V1)
export async function getFeaturedVehicles() {
  const res = await apiFetch<Vehicle[]>("/vehicles/featured");
  return res.ok ? res.data : [];
}
```

→ At V1, swap import path in pages : `from "@/data/vehicles"` → `from "@/lib/api/vehicles"`.

## Server components first

Fetch in Server Components when possible (no `"use client"`). Use Client Components only when interactivity is needed.

## Error UI

Standard error component `<ApiErrorState />` :

- 4xx → "Mauvaise requête" + détails dev
- 5xx → "Service temporairement indisponible. Rappelez-nous au 01 00 00 00 00"
- NETWORK → "Connexion perdue. Vérifiez votre réseau"

## CORS preview (Laravel side)

```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [env('FRONTEND_URL')],
'supports_credentials' => true,
```

## TODO_PROD markers

Pour chaque appel non encore branché :

```ts
// TODO_PROD: replace mock with apiFetch("/vehicles")
```

Search `grep -r TODO_PROD .` avant déploiement → liste des intégrations restantes.

## Acceptance criteria

- `lib/api/client.ts` existe avec `apiFetch` typé.
- Tous les DTO dans `lib/types/`.
- Aucun `fetch()` direct dans les composants (passer par `lib/api/`).
- Env vars centralisées + documentées.
- Pattern swap mock→API en une ligne par fichier.
- Sanctum CSRF intégré.
