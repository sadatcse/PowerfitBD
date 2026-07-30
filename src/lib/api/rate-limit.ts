import { TooManyRequestsError } from "./errors";

/**
 * Fixed-window rate limiter backed by an in-process Map.
 *
 * This is deliberately simple and per-instance: it stops casual abuse of the
 * public contact endpoint on a single server. For multi-region Vercel traffic,
 * swap `hit()` for Upstash Redis / Vercel KV — the call sites do not change.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Drops expired buckets so the Map cannot grow without bound. */
function sweep(now: number): void {
  if (buckets.size < 5_000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitOptions {
  /** Requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function hit(
  identifier: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    const bucket: Bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(identifier, bucket);
    return { allowed: true, remaining: limit - 1, resetAt: bucket.resetAt };
  }

  existing.count += 1;
  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/** Throws `TooManyRequestsError` once the caller exceeds the window. */
export function enforceRateLimit(
  identifier: string,
  options: RateLimitOptions,
): void {
  const result = hit(identifier, options);
  if (!result.allowed) {
    const seconds = Math.ceil((result.resetAt - Date.now()) / 1000);
    throw new TooManyRequestsError(
      `Too many requests. Try again in ${seconds} second${
        seconds === 1 ? "" : "s"
      }.`,
    );
  }
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
