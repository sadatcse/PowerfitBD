import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Server-side Firebase Admin, used solely to verify ID tokens coming from the
 * browser before we mint our own session cookie. Never import from a client
 * component — the private key must not reach the bundle.
 */

function buildCredential() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  // Vercel stores the key with literal "\n" sequences; restore real newlines.
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_ADMIN_PROJECT_ID, " +
        "FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.",
    );
  }

  return cert({ projectId, clientEmail, privateKey });
}

let cachedApp: App | undefined;

export function getAdminApp(): App {
  if (cachedApp) return cachedApp;
  const existing = getApps();
  cachedApp = existing.length
    ? existing[0]!
    : initializeApp({ credential: buildCredential() });
  return cachedApp;
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
