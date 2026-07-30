import { type NextRequest } from "next/server";
import { ROLES } from "@/constants/config";
import { requireRole } from "@/lib/auth/guard";
import { created, ok, withErrorHandling } from "@/lib/api/response";
import { teamCreateSchema } from "@/lib/validations/team";
import { teamService } from "@/services/team.service";

/** Mongoose needs the Node runtime; it cannot run on Edge. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/team — paginated, searchable, sortable list. Public. */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const data = await teamService.list(request.nextUrl.searchParams);
  return ok(data, "Team members fetched successfully.");
});

/** POST /api/team — create a member. Admin or editor only. */
export const POST = withErrorHandling(async (request: NextRequest) => {
  await requireRole([ROLES.admin, ROLES.editor]);

  const body: unknown = await request.json();
  const payload = teamCreateSchema.parse(body);

  const member = await teamService.create(payload);
  return created(member, "Team member created successfully.");
});
