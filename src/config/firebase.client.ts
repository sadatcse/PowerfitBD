import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  type Auth,
} from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

/**
 * Browser-side Firebase, initialised lazily.
 *
 * Initialisation is deliberately NOT done at module scope: the root layout
 * pulls this module into every page through `AppProviders`, and eager
 * `initializeApp()` throws `auth/invalid-api-key` during prerender whenever
 * the env vars are absent (CI, previews, a fresh clone). Deferring it means
 * the site builds and renders fine, and Firebase only has to be configured
 * for the dashboard sign-in path that actually uses it.
 *
 * These values are public by design — access is restricted by Firebase Auth
 * settings and Storage security rules, not by secrecy.
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local.",
    );
    this.name = "FirebaseNotConfiguredError";
  }
}

/** True when the client SDK has enough config to initialise. */
export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) throw new FirebaseNotConfiguredError();
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

let persistenceRequested = false;

export function getFirebaseAuth(): Auth {
  const auth = getAuth(getFirebaseApp());

  // Keeps the user signed in across tabs and reloads. Requested once, and
  // never allowed to break sign-in if the browser refuses local storage.
  if (typeof window !== "undefined" && !persistenceRequested) {
    persistenceRequested = true;
    void setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.warn("[firebase] Could not set local persistence:", error);
    });
  }

  return auth;
}

export function getFirebaseStorage(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}
