/**
 * Input hardening helpers.
 *
 * Mongo query operators are rejected rather than stripped so a malicious
 * payload fails loudly instead of silently changing query semantics.
 */

/** True when a key could be interpreted as a Mongo operator or prototype key. */
function isDangerousKey(key: string): boolean {
  return (
    key.startsWith("$") ||
    key.includes(".") ||
    key === "__proto__" ||
    key === "constructor" ||
    key === "prototype"
  );
}

/**
 * Recursively removes Mongo operator keys from an arbitrary object. Use on any
 * value that reaches a query or `$set` without passing through a Zod schema.
 */
export function sanitizeMongoInput<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeMongoInput(item)) as T;
  }

  if (input !== null && typeof input === "object") {
    const source = input as Record<string, unknown>;
    const clean: Record<string, unknown> = {};
    for (const key of Object.keys(source)) {
      if (isDangerousKey(key)) continue;
      clean[key] = sanitizeMongoInput(source[key]);
    }
    return clean as T;
  }

  return input;
}

/**
 * Escapes regex metacharacters so a user's search term is matched literally.
 * Without this, input like `.*` turns every search into a full collection scan.
 */
export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Neutralises HTML control characters in free-text fields. React already
 * escapes on render; this protects non-React consumers (emails, exports, RSS).
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapses whitespace and trims — applied to every free-text field. */
export function normaliseText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Only allows `http(s)` URLs. Blocks `javascript:` and `data:` payloads that
 * would otherwise become an XSS vector when rendered into an `href`.
 */
export function sanitizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}
