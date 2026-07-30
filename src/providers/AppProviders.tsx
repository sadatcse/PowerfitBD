"use client";

import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { type SessionUser } from "@/types/auth";
import { QueryProvider } from "./QueryProvider";

/**
 * Single client boundary for the whole app. Keeping providers in one place
 * means server components stay server components everywhere else.
 */
export function AppProviders({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: SessionUser | null;
}) {
  return (
    <QueryProvider>
      <AuthProvider initialUser={initialUser}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "!bg-ink-800 !border !border-line !text-mist !font-sans !rounded-none",
              description: "!text-muted",
            },
          }}
        />
      </AuthProvider>
    </QueryProvider>
  );
}
