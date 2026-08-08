import { type NextRequest } from "next/server";
import { ROLES } from "@/constants/config";
import { requireRole } from "@/lib/auth/guard";
import { noContentOk, ok, withErrorHandling } from "@/lib/api/response";
import { objectIdSchema } from "@/lib/validations/common";
import { testimonialUpdateSchema } from "@/lib/validations/testimonial";
import { testimonialService } from "@/services/testimonial.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/testimonials/:id */
export const GET = withErrorHandling(
  async (_request: NextRequest, context: RouteContext) => {
    const { id } = await context.params;
    const testimonial = await testimonialService.getById(
      objectIdSchema.parse(id),
    );
    return ok(testimonial, "Testimonial fetched successfully.");
  },
);

/** PATCH /api/testimonials/:id */
export const PATCH = withErrorHandling(
  async (request: NextRequest, context: RouteContext) => {
    await requireRole([ROLES.admin, ROLES.editor]);

    const { id } = await context.params;
    const body: unknown = await request.json();
    const payload = testimonialUpdateSchema.parse(body);

    const testimonial = await testimonialService.update(
      objectIdSchema.parse(id),
      payload,
    );
    return ok(testimonial, "Testimonial updated successfully.");
  },
);

/** DELETE /api/testimonials/:id — staff delete access. */
export const DELETE = withErrorHandling(
  async (_request: NextRequest, context: RouteContext) => {
    await requireRole([ROLES.admin, ROLES.editor]);

    const { id } = await context.params;
    await testimonialService.remove(objectIdSchema.parse(id));
    return noContentOk("Testimonial deleted successfully.");
  },
);
