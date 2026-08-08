import { type NextRequest } from "next/server";
import { ROLES } from "@/constants/config";
import { requireRole } from "@/lib/auth/guard";
import { noContentOk, ok, withErrorHandling } from "@/lib/api/response";
import { objectIdSchema } from "@/lib/validations/common";
import { teamUpdateSchema } from "@/lib/validations/team";
import { teamService } from "@/services/team.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/team/:id */
export const GET = withErrorHandling(
  async (_request: NextRequest, context: RouteContext) => {
    const { id } = await context.params;
    const member = await teamService.getById(objectIdSchema.parse(id));
    return ok(member, "Team member fetched successfully.");
  },
);

/** PATCH /api/team/:id — partial update. */
export const PATCH = withErrorHandling(
  async (request: NextRequest, context: RouteContext) => {
    await requireRole([ROLES.admin, ROLES.editor]);

    const { id } = await context.params;
    const body: unknown = await request.json();
    const payload = teamUpdateSchema.parse(body);

    const member = await teamService.update(objectIdSchema.parse(id), payload);
    return ok(member, "Team member updated successfully.");
  },
);

/** DELETE /api/team/:id — staff delete access. */
export const DELETE = withErrorHandling(
  async (_request: NextRequest, context: RouteContext) => {
    await requireRole([ROLES.admin, ROLES.editor]);

    const { id } = await context.params;
    await teamService.remove(objectIdSchema.parse(id));
    return noContentOk("Team member deleted successfully.");
  },
);
