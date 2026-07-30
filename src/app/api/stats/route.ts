import { ROLES } from "@/constants/config";
import { requireRole } from "@/lib/auth/guard";
import { ok, withErrorHandling } from "@/lib/api/response";
import { teamService } from "@/services/team.service";
import { testimonialService } from "@/services/testimonial.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface DashboardStats {
  team: { total: number; active: number; inactive: number };
  testimonials: { total: number; active: number; inactive: number };
}

/** GET /api/stats — counts for the dashboard home tiles. */
export const GET = withErrorHandling(async () => {
  await requireRole([ROLES.admin, ROLES.editor]);

  const [team, testimonials] = await Promise.all([
    teamService.counts(),
    testimonialService.counts(),
  ]);

  return ok<DashboardStats>({ team, testimonials }, "Stats fetched.");
});
