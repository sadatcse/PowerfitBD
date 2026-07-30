"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  LuCircleUserRound,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuMessageSquareQuote,
  LuSettings,
  LuUsers,
  LuX,
} from "react-icons/lu";
import { Logo } from "@/components/layout/Logo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { ROUTES } from "@/constants/routes";
import { type SessionUser } from "@/types/auth";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { href: ROUTES.dashboard.root, label: "Overview", icon: LuLayoutDashboard, exact: true },
  { href: ROUTES.dashboard.team, label: "Team", icon: LuUsers, exact: false },
  {
    href: ROUTES.dashboard.testimonials,
    label: "Testimonials",
    icon: LuMessageSquareQuote,
    exact: false,
  },
  {
    href: ROUTES.dashboard.profile,
    label: "Profile",
    icon: LuCircleUserRound,
    exact: false,
  },
  {
    href: ROUTES.dashboard.settings,
    label: "Settings",
    icon: LuSettings,
    exact: false,
  },
] as const;

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 border-l-2 px-4 py-2.5 font-sans text-body-sm font-bold tracking-[0.05em] uppercase transition-colors",
                active
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-transparent text-mist hover:border-line hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function UserCard({ user }: { user: SessionUser }) {
  const { signOut } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      window.location.href = ROUTES.auth.login;
    } catch {
      toast.error("Could not sign out. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-line p-4">
      <p className="truncate text-body-sm font-bold text-white">
        {user.name ?? user.email}
      </p>
      <p className="truncate text-body-xs text-muted">{user.email}</p>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="mt-3 flex w-full items-center gap-2 border border-line px-3 py-2 text-body-xs font-bold tracking-[0.1em] text-mist uppercase transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
      >
        <LuLogOut className="size-3.5" aria-hidden />
        {loading ? "Signing out…" : "Sign Out"}
      </button>
    </div>
  );
}

/** Admin dashboard shell: fixed sidebar on desktop, slide-in drawer on mobile. */
export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-900 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-ink-950 lg:flex">
        <div className="border-b border-line px-6 py-5">
          <Logo showWordmark tone="gold" />
        </div>
        <nav aria-label="Dashboard navigation" className="flex-1 px-3 py-6">
          <NavLinks pathname={pathname} />
        </nav>
        <UserCard user={user} />
      </aside>

      {/* Mobile topbar + drawer */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-line bg-ink-950 px-5 lg:hidden">
          <Logo showWordmark={false} />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open dashboard menu"
            className="grid size-10 place-items-center text-mist hover:text-brand"
          >
            <LuMenu className="size-6" aria-hidden />
          </button>
        </header>

        <AnimatePresence>
          {drawerOpen ? (
            <div className="fixed inset-0 z-90 lg:hidden">
              <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div
                className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r border-line bg-ink-950"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between border-b border-line px-6 py-5">
                  <Logo showWordmark tone="gold" />
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close dashboard menu"
                    className="grid size-9 place-items-center text-muted hover:text-white"
                  >
                    <LuX className="size-5" aria-hidden />
                  </button>
                </div>
                <nav
                  aria-label="Dashboard navigation"
                  className="flex-1 overflow-y-auto px-3 py-6"
                >
                  <NavLinks
                    pathname={pathname}
                    onNavigate={() => setDrawerOpen(false)}
                  />
                </nav>
                <UserCard user={user} />
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
