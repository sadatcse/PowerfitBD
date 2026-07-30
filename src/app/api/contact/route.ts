import { type NextRequest } from "next/server";
import { BadRequestError } from "@/lib/api/errors";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";
import { created, withErrorHandling } from "@/lib/api/response";
import { contactSchema } from "@/lib/validations/contact";
import { escapeHtml, normaliseText } from "@/utils/sanitize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/contact — public "Direct Transmission" form.
 *
 * The submission is validated, sanitised, and logged. Wiring an email
 * provider (Resend / SendGrid) or persisting to Mongo is a drop-in change at
 * the marked point below.
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  enforceRateLimit(`contact:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60_000,
  });

  const body: unknown = await request.json();
  const payload = contactSchema.parse(body);

  // Honeypot: only a bot fills a field that is visually hidden.
  if (payload.website) {
    throw new BadRequestError("Submission rejected.");
  }

  const submission = {
    fullName: escapeHtml(normaliseText(payload.fullName)),
    email: payload.email.toLowerCase(),
    subject: payload.subject,
    message: escapeHtml(normaliseText(payload.message)),
    receivedAt: new Date().toISOString(),
  };

  // TODO(integration): deliver via email provider and/or persist to Mongo.
  console.warn("[contact] New submission:", submission);

  return created(
    { received: true },
    "Transmission sent. Our team will respond shortly.",
  );
});
