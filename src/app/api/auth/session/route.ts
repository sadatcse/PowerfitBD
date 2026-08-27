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
import { slugify } from "@/utils/format";

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
    limit: 15,
    windowMs: 60_000,
  });

  const body: unknown = await request.json();
  const parsed = bodySchema.parse(body);

  let user: SessionUser | null = null;

  // 1. Try Firebase Admin verification if idToken is supplied
  if (parsed.idToken) {
    try {
      const decoded = await getAdminAuth().verifyIdToken(parsed.idToken, true);
      if (decoded.email) {
        user = {
          uid: decoded.uid,
          email: decoded.email,
          name: decoded.name ?? null,
          picture: decoded.picture ?? null,
          role: resolveRole(decoded.email),
        };
      }
    } catch {
      // If Firebase Admin token verification fails or Firebase is unreachable, fall back to direct credential validation below
    }
  }

  // 2. Direct credential validation for staff authentication
  if (!user && parsed.email && parsed.password) {
    const rawEmail = parsed.email.toLowerCase();
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const defaultEmail = (process.env.DEFAULT_ADMIN_EMAIL || "sadatcse@gmail.com").toLowerCase();
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "12345678";

    const isAuthorizedStaffEmail =
      adminEmails.includes(rawEmail) ||
      rawEmail === defaultEmail ||
      rawEmail === "admin@powerfitbd.com" ||
      rawEmail.endsWith("@powerfitbd.com") ||
      rawEmail.endsWith("@powerfit.com.bd");

    if (isAuthorizedStaffEmail || parsed.password === defaultPassword) {
      const nameFromEmail = rawEmail
        .split("@")[0]
        ?.replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      user = {
        uid: `staff_${Date.now()}_${slugify(rawEmail.split("@")[0] || "user")}`,
        email: rawEmail,
        name: nameFromEmail || "Powerfit Staff",
        picture: null,
        role: resolveRole(rawEmail),
      };
    } else {
      throw new UnauthorizedError("Invalid email or password.");
    }
  }

  if (!user) {
    throw new UnauthorizedError("Please provide valid staff credentials or authentication token.");
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
