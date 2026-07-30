/** Shared operational limits used by both the API and the dashboard UI. */

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

export const UPLOAD = {
  maxSizeBytes: 5 * 1024 * 1024, // 5 MB
  acceptedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ] as const,
  acceptAttribute: "image/jpeg,image/png,image/webp,image/avif",
} as const;

export const DEBOUNCE_MS = 400;

/** Status applied to Team members and Testimonials. */
export const STATUS = {
  active: "active",
  inactive: "inactive",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const STATUS_OPTIONS = [
  { label: "Active", value: STATUS.active },
  { label: "Inactive", value: STATUS.inactive },
] as const;

/** Roles — `editor` is wired through the whole stack but unused for now. */
export const ROLES = {
  admin: "admin",
  editor: "editor",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const RATING = { min: 1, max: 5 } as const;
