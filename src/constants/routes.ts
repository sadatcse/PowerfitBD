/**
 * Single source of truth for every path in the app. Import from here instead
 * of writing string literals so renaming a route is a one-line change.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  team: "/team",
  pricing: "/pricing",
  equipment: "/equipment",
  gallery: "/gallery",
  contact: "/contact",

  dashboard: {
    root: "/dashboard",
    team: "/dashboard/team",
    teamCreate: "/dashboard/team/new",
    teamEdit: (id: string) => `/dashboard/team/${id}`,
    testimonials: "/dashboard/testimonials",
    testimonialCreate: "/dashboard/testimonials/new",
    testimonialEdit: (id: string) => `/dashboard/testimonials/${id}`,
    profile: "/dashboard/profile",
    settings: "/dashboard/settings",
  },

  auth: {
    login: "/login",
  },
} as const;

/** API endpoints consumed by the client through TanStack Query + Axios. */
export const API_ROUTES = {
  team: "/api/team",
  teamById: (id: string) => `/api/team/${id}`,
  testimonials: "/api/testimonials",
  testimonialById: (id: string) => `/api/testimonials/${id}`,
  contact: "/api/contact",
  upload: "/api/upload",
  stats: "/api/stats",
  session: "/api/auth/session",
  logout: "/api/auth/logout",
  me: "/api/auth/me",
} as const;

/** Routes that require an authenticated session (matched by prefix). */
export const PROTECTED_PREFIXES = ["/dashboard"] as const;

/** Routes an already-authenticated user should be redirected away from. */
export const AUTH_ONLY_ROUTES = ["/login"] as const;
