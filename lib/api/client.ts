const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: { code: string; message: string } };
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
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        ok: false,
        error: {
          code: String(res.status),
          message: (body as { message?: string }).message ?? res.statusText,
        },
      };
    }

    const json = await res.json();
    // Laravel ResourceCollection wraps data in { data: [...] }
    const data = (json as { data?: T }).data !== undefined
      ? (json as { data: T }).data
      : (json as T);

    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: { code: "NETWORK", message: (err as Error).message },
    };
  }
}
