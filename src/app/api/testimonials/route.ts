import { type NextRequest } from "next/server";
import { ROLES } from "@/constants/config";
import { requireRole } from "@/lib/auth/guard";
import { created, ok, withErrorHandling } from "@/lib/api/response";
import { testimonialCreateSchema } from "@/lib/validations/testimonial";
import { testimonialService } from "@/services/testimonial.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/testimonials — paginated, searchable list. Public. */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const data = await testimonialService.list(request.nextUrl.searchParams);
  return ok(data, "Testimonials fetched successfully.");
});

/** POST /api/testimonials — admin or editor only. */
export const POST = withErrorHandling(async (request: NextRequest) => {
  await requireRole([ROLES.admin, ROLES.editor]);

  const body: unknown = await request.json();
  const payload = testimonialCreateSchema.parse(body);

  const testimonial = await testimonialService.create(payload);
  return created(testimonial, "Testimonial created successfully.");
});
