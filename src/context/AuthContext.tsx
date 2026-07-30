"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getFirebaseAuth } from "@/config/firebase.client";
import { API_ROUTES } from "@/constants/routes";
import { apiClient, toApiError } from "@/lib/api/client";
import { type ApiResponse } from "@/types/api";
import { type SessionUser } from "@/types/auth";

/**
 * Auth state for the dashboard.
 *
 * Firebase verifies the credentials, but the app's own HttpOnly session cookie
 * is the source of truth — so the user is hydrated from `/api/auth/me` rather
 * than from the Firebase SDK, which keeps it valid across reloads.
 *
 * The session is fetched through TanStack Query rather than a `useEffect`:
 * it is server state, so caching, deduping, and invalidation come for free and
 * no effect is needed to synchronise it.
 */

export const SESSION_QUERY_KEY = ["auth", "session"] as const;

interface AuthContextValue {
  user: SessionUser | null;
  /** True until the initial session check resolves. */
  initialising: boolean;
  signIn: (email: string, password: string) => Promise<SessionUser>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchSession(): Promise<SessionUser | null> {
  const { data } = await apiClient.get<ApiResponse<SessionUser | null>>(
    API_ROUTES.me,
  );
  return data.data;
}

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  /** Server-rendered session — avoids an auth flash on first paint. */
  initialUser?: SessionUser | null;
}) {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: fetchSession,
    // Seeding from the server response means no client fetch on first load.
    initialData: initialUser ?? undefined,
    staleTime: 5 * 60_000,
    retry: false,
  });

  const user = data ?? null;

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
  }, [queryClient]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<SessionUser> => {
      try {
        const credential = await signInWithEmailAndPassword(
          getFirebaseAuth(),
          email,
          password,
        );
        const idToken = await credential.user.getIdToken();

        // Trade the Firebase token for our own session cookie.
        const { data: response } = await apiClient.post<
          ApiResponse<SessionUser>
        >(API_ROUTES.session, { idToken });

        queryClient.setQueryData(SESSION_QUERY_KEY, response.data);
        return response.data;
      } catch (error) {
        throw toApiError(error);
      }
    },
    [queryClient],
  );

  const signOut = useCallback(async () => {
    // Clear the server cookie first so a failure here cannot leave a
    // signed-out UI paired with a live session.
    await apiClient.post(API_ROUTES.logout).catch(() => undefined);
    await firebaseSignOut(getFirebaseAuth()).catch(() => undefined);
    queryClient.setQueryData(SESSION_QUERY_KEY, null);
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      initialising: isPending,
      signIn,
      signOut,
      refresh,
    }),
    [user, isPending, signIn, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>.");
  }
  return context;
}
