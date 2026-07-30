import { type NextRequest } from "next/server";
import { z } from "zod";
import { getAdminAuth } from "@/config/firebase.admin";
import { UnauthorizedError } from "@/lib/api/errors";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";
import { ok, withErrorHandling } from "@/lib/api/response";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  resolveRole,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { type SessionUser } from "@/types/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  idToken: z.string().min(1, "Firebase ID token is required."),
});

/**
 * POST /api/auth/session
 *
 * Exchanges a Firebase ID token (obtained in the browser after an
 * email/password sign-in) for our own HttpOnly session cookie. Doing the
 * exchange server-side means the dashboard never has to trust a client-held
 * token, and the Edge middleware can authorise without the Admin SDK.
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  // Blunt brute-force protection on the only credential-adjacent endpoint.
  enforceRateLimit(`session:${getClientIp(request)}`, {
    limit: 10,
    windowMs: 60_000,
  });

  const body: unknown = await request.json();
  const { idToken } = bodySchema.parse(body);

  let decoded;
  try {
    // `checkRevoked` catches tokens issued before a forced sign-out.
    decoded = await getAdminAuth().verifyIdToken(idToken, true);
  } catch {
    throw new UnauthorizedError("Invalid or expired sign-in token.");
  }

  if (!decoded.email) {
    throw new UnauthorizedError("This account has no email address.");
  }

  const user: SessionUser = {
    uid: decoded.uid,
    email: decoded.email,
    name: decoded.name ?? null,
    picture: decoded.picture ?? null,
    role: resolveRole(decoded.email),
  };

  const token = await createSessionToken(user);

  const response = ok(user, "Signed in successfully.");
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
});

/** DELETE /api/auth/session — alias for logout, clears the cookie. */
export const DELETE = withErrorHandling(async () => {
  const response = ok(null, "Signed out successfully.");
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
});

export { SESSION_MAX_AGE };
