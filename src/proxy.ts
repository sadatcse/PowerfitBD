import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "@/constants/routes";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import {
  isAuthOnlyPath,
  isProtectedPath,
  safeRedirectTarget,
} from "@/middleware/auth-matcher";

/**
 * Edge proxy (formerly `middleware.ts`, renamed in Next 16).
 *
 * Coarse-grained routing only: it redirects signed-out users away from
 * `/dashboard` and signed-in users away from `/login`. It is NOT the security
 * boundary — route handlers and server components re-verify the session via
 * `@/lib/auth/guard` before touching any data.
 */
export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (isProtectedPath(pathname) && !session) {
    const loginUrl = new URL(ROUTES.auth.login, request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    const response = NextResponse.redirect(loginUrl);
    // Clear a stale/expired cookie so the browser stops resending it.
    if (token) response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  if (isAuthOnlyPath(pathname) && session) {
    const target = safeRedirectTarget(
      request.nextUrl.searchParams.get("next"),
      ROUTES.dashboard.root,
    );
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Skips Next internals, the API surface (which guards itself), and static
   * assets so this only runs on real page navigations.
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|fonts|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)$).*)",
  ],
};
