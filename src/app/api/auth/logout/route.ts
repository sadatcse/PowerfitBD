import { ok, withErrorHandling } from "@/lib/api/response";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/auth/logout — clears the session cookie. */
export const POST = withErrorHandling(async () => {
  const response = ok(null, "Signed out successfully.");
  // maxAge 0 expires the cookie immediately.
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
});
