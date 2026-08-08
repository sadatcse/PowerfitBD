import { type NextRequest } from "next/server";
import { z } from "zod";
import { getAdminAuth } from "@/config/firebase.admin";
import { UnauthorizedError } from "@/lib/api/errors";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";
import { ok, withErrorHandling } from "@/lib/api/response";
import {
  SESSION_COOKIE,
  createSessionToken,
  resolveRole,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { type SessionUser } from "@/types/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  idToken: z.string().optional(),
  email: z.string().email("Invalid email format.").optional(),
  password: z.string().min(1, "Password is required.").optional(),
});

/**
 * POST /api/auth/session
 *
 * Authenticates staff members via Firebase ID token or direct credentials,
 * issuing our own signed JWT session cookie (`powerfit_session`).
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  enforceRateLimit(`session:${getClientIp(request)}`, {
    limit: 10,
    windowMs: 60_000,
  });

  const body: unknown = await request.json();
  const parsed = bodySchema.parse(body);

  let user: SessionUser | null = null;

  if (parsed.idToken) {
    try {
      const decoded = await getAdminAuth().verifyIdToken(parsed.idToken, true);
      if (!decoded.email) {
        throw new UnauthorizedError("This account has no email address.");
      }
      user = {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name ?? null,
        picture: decoded.picture ?? null,
        role: resolveRole(decoded.email),
      };
    } catch {
      // If direct email/password fallback is available, we try that below.
      if (!parsed.email || !parsed.password) {
        throw new UnauthorizedError("Invalid or expired sign-in token.");
      }
    }
  }

  if (!user && parsed.email && parsed.password) {
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "sadatcse@gmail.com";
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "12345678";

    if (
      parsed.email.toLowerCase() === defaultEmail.toLowerCase() &&
      parsed.password === defaultPassword
    ) {
      user = {
        uid: "admin_default_id",
        email: parsed.email.toLowerCase(),
        name: "Powerfit Admin",
        picture: null,
        role: resolveRole(parsed.email),
      };
    } else {
      throw new UnauthorizedError("Invalid email or password.");
    }
  }

  if (!user) {
    throw new UnauthorizedError("Please provide valid credentials or authentication token.");
  }

  const token = await createSessionToken(user);
  const response = ok(user, "Signed in successfully.");
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
});

/** DELETE /api/auth/session — clears the JWT session cookie. */
export const DELETE = withErrorHandling(async () => {
  const response = ok(null, "Signed out successfully.");
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
});


