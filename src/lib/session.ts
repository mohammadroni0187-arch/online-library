import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * Server-side session lookup for App Router layouts and pages.
 *
 * Runs on the server with the incoming request cookies, so it is the real
 * access gate for private routes (not a client-side redirect that can be
 * bypassed by disabling JavaScript).
 */
export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

/**
 * Redirects to the login page when there is no session.
 *
 * `callbackURL` is where the user should land after a successful login.
 */
export async function requireSession(callbackURL = "/") {
  const session = await getServerSession();

  if (!session) {
    redirect(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
  }

  return session;
}
