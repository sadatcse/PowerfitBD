import { ok, withErrorHandling } from "@/lib/api/response";
import { getCurrentUser } from "@/lib/auth/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/auth/me — the current session user, or `null` when signed out.
 * Returns 200 either way so the client can treat "signed out" as a state
 * rather than an error.
 */
export const GET = withErrorHandling(async () => {
  const user = await getCurrentUser();
  return ok(user, user ? "Session active." : "No active session.");
});
