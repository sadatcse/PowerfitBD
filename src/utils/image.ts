import { UPLOAD } from "@/constants/config";

/** Shown wherever a record has no uploaded image yet. */
export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

/**
 * Normalises whatever is stored in Mongo into something `next/image` accepts:
 * absolute URLs pass through, root-relative paths pass through, and anything
 * empty or malformed falls back to the placeholder.
 */
export function resolveImageUrl(src: string | null | undefined): string {
  if (!src) return PLACEHOLDER_IMAGE;
  const trimmed = src.trim();
  if (!trimmed) return PLACEHOLDER_IMAGE;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("data:image/")) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/** `sizes` presets so the browser never downloads an oversized source. */
export const IMAGE_SIZES = {
  full: "100vw",
  hero: "100vw",
  half: "(max-width: 768px) 100vw, 50vw",
  third: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quarter: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  avatar: "96px",
  thumb: "64px",
} as const;

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

/** Client-side guard so obviously-bad files never reach the upload endpoint. */
export function validateImageFile(file: File): ImageValidationResult {
  const accepted: readonly string[] = UPLOAD.acceptedTypes;
  if (!accepted.includes(file.type)) {
    return {
      valid: false,
      error: "Unsupported format. Use JPG, PNG, WebP, or AVIF.",
    };
  }
  if (file.size > UPLOAD.maxSizeBytes) {
    const maxMb = Math.round(UPLOAD.maxSizeBytes / (1024 * 1024));
    return { valid: false, error: `Image must be smaller than ${maxMb} MB.` };
  }
  return { valid: true };
}

/**
 * A tiny inline blur placeholder. Kept as a constant so every `next/image`
 * with `placeholder="blur"` shares the same tinted shimmer.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwYTE5MmYiLz48L3N2Zz4=";
