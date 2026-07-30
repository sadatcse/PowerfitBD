import "server-only";
import { cookies } from "next/headers";
import { ROLES, type Role } from "@/constants/config";
import { ForbiddenError, UnauthorizedError } from "@/lib/api/errors";
import { type SessionUser } from "@/types/auth";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/**
 * Server-side session access for route handlers, server components, and
 * server actions. The Edge middleware handles coarse redirects; these guards
 * are the authoritative check that protects data.
 */

/** Returns the current user, or `null` when signed out. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const claims = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!claims) return null;

  const { uid, email, name, picture, role } = claims;
  return { uid, email, name, picture, role };
}

/** Throws `UnauthorizedError` when there is no valid session. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

/**
 * Throws unless the session holds one of `allowedRoles`.
 * Defaults to admin-only, which is what every write endpoint uses today.
 */
export async function requireRole(
  allowedRoles: readonly Role[] = [ROLES.admin],
): Promise<SessionUser> {
  const user = await requireUser();
  if (!allowedRoles.includes(user.role)) throw new ForbiddenError();
  return user;
}
