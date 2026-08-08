import { type NextRequest } from "next/server";
import { ROLES } from "@/constants/config";
import { ok, withErrorHandling } from "@/lib/api/response";
import { requireRole } from "@/lib/auth/guard";
import { contactService } from "@/services/contact.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

/** GET /api/contact/[id] */
export const GET = withErrorHandling(async (_request: NextRequest, { params }: RouteParams) => {
  await requireRole([ROLES.admin, ROLES.editor]);
  const { id } = await params;
  const item = await contactService.getById(id);
  return ok(item, "Contact submission retrieved.");
});

/** PATCH /api/contact/[id] — update status (e.g. mark read) */
export const PATCH = withErrorHandling(async (request: NextRequest, { params }: RouteParams) => {
  await requireRole([ROLES.admin, ROLES.editor]);
  const { id } = await params;
  const body: unknown = await request.json();
  const item = await contactService.update(id, body as Record<string, unknown>);
  return ok(item, "Contact submission updated.");
});

/** DELETE /api/contact/[id] — remove submission (admin only) */
export const DELETE = withErrorHandling(async (_request: NextRequest, { params }: RouteParams) => {
  await requireRole([ROLES.admin]);
  const { id } = await params;
  const item = await contactService.remove(id);
  return ok(item, "Contact submission deleted.");
});
