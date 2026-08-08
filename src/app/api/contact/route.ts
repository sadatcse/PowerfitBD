import { type NextRequest } from "next/server";
import { ROLES } from "@/constants/config";
import { BadRequestError } from "@/lib/api/errors";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";
import { created, ok, withErrorHandling } from "@/lib/api/response";
import { requireRole } from "@/lib/auth/guard";
import { contactSchema } from "@/lib/validations/contact";
import { contactService } from "@/services/contact.service";
import { escapeHtml, normaliseText } from "@/utils/sanitize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/contact — protected dashboard list of enquiries.
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  await requireRole([ROLES.admin, ROLES.editor]);
  const data = await contactService.list(request.nextUrl.searchParams);
  return ok(data, "Contact submissions fetched.");
});

/**
 * POST /api/contact — public contact form submission saved to MongoDB.
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  enforceRateLimit(`contact:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60_000,
  });

  const body: unknown = await request.json();
  const payload = contactSchema.parse(body);

  if (payload.website) {
    throw new BadRequestError("Submission rejected.");
  }

  const submission = await contactService.create({
    fullName: escapeHtml(normaliseText(payload.fullName)),
    email: payload.email.toLowerCase(),
    subject: payload.subject,
    message: escapeHtml(normaliseText(payload.message)),
    status: "unread",
  });

  return created(
    submission,
    "Transmission sent. Our team will respond shortly.",
  );
});
