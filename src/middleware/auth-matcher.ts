import { AUTH_ONLY_ROUTES, PROTECTED_PREFIXES } from "@/constants/routes";

/** Path predicates shared by the Edge middleware. Kept pure and testable. */

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthOnlyPath(pathname: string): boolean {
  return AUTH_ONLY_ROUTES.some((route) => pathname === route);
}

/**
 * Only same-origin, path-absolute targets are accepted as a post-login
 * redirect. Anything else is an open-redirect vector.
 */
export function safeRedirectTarget(
  value: string | null,
  fallback: string,
): string {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
