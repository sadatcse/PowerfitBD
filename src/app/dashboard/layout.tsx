import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCurrentUser } from "@/lib/auth/guard";
import { ROUTES } from "@/constants/routes";

/**
 * Dashboard route group shell. The Edge proxy already redirects signed-out
 * visitors, but this is the authoritative, non-bypassable check per
 * `src/lib/auth/guard.ts`.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.auth.login);

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
