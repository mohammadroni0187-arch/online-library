/**
 * Small helper around the Express API and the Better Auth session token.
 *
 * - API_URL points at the Express server (override with NEXT_PUBLIC_API_URL).
 * - getAuthToken() asks Better Auth for the JWT of the current session, so the
 *   server can verify who the caller really is instead of trusting the body.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getAuthToken(): Promise<string | null> {
  try {
    const response = await fetch("/api/auth/token", {
      credentials: "include",
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { token?: string };
    return data.token ?? null;
  } catch (error) {
    console.error("Could not read auth token:", error);
    return null;
  }
}

/** Fetch an Express endpoint with a verified Better Auth token attached. */
export async function apiFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();
  const headers = new Headers(init.headers);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, { ...init, headers });
}
