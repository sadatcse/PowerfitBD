import { SignJWT, jwtVerify } from "jose";
import { ROLES, type Role } from "@/constants/config";
import { type SessionClaims, type SessionUser } from "@/types/auth";

/**
 * Session handling built on `jose` so the exact same code runs in Node route
 * handlers and in the Edge middleware (the Firebase Admin SDK cannot).
 */

export const SESSION_COOKIE =
  process.env.SESSION_COOKIE_NAME ?? "powerfit_session";

export const SESSION_MAX_AGE = Number(process.env.SESSION_MAX_AGE ?? 604_800);

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be set to at least 32 characters. " +
        "Generate one with: openssl rand -base64 32",
    );
  }
  return new TextEncoder().encode(secret);
}

/** Signs the session payload into a compact JWS stored in an HttpOnly cookie. */
export async function createSessionToken(user: SessionUser): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000);

  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + SESSION_MAX_AGE)
    .setIssuer("powerfit")
    .setAudience("powerfit-dashboard")
    .setSubject(user.uid)
    .sign(getSecretKey());
}

/** Returns the claims, or `null` for any invalid/expired/tampered token. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionClaims | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: "powerfit",
      audience: "powerfit-dashboard",
    });

    if (typeof payload.uid !== "string" || typeof payload.email !== "string") {
      return null;
    }

    return {
      uid: payload.uid,
      email: payload.email,
      name: (payload.name as string | null) ?? null,
      picture: (payload.picture as string | null) ?? null,
      role: (payload.role as Role) ?? ROLES.editor,
      iat: payload.iat ?? 0,
      exp: payload.exp ?? 0,
    };
  } catch {
    // Covers expired, malformed, and signature-mismatch tokens alike.
    return null;
  }
}

/** Cookie attributes shared by the login and logout handlers. */
export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/**
 * Assigns a role at sign-in. `ADMIN_EMAILS` is the bootstrap allowlist; every
 * other authenticated user gets `editor`, keeping the model role-based ready.
 */
export function resolveRole(email: string): Role {
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist.length === 0) return ROLES.admin; // first-run convenience
  return allowlist.includes(email.toLowerCase()) ? ROLES.admin : ROLES.editor;
}
