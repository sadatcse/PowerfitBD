import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TestimonialForm } from "@/components/dashboard/testimonials/TestimonialForm";
import { testimonialService } from "@/services/testimonial.service";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Edit Testimonial",
  path: "/dashboard/testimonials",
  noIndex: true,
});

type RouteParams = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage({ params }: RouteParams) {
  const { id } = await params;

  const testimonial = await testimonialService.getById(id).catch(() => null);
  if (!testimonial) notFound();

  return (
    <>
      <PageHeader
        title={`Edit review from ${testimonial.clientName}`}
        description="Update this client testimonial."
      />
      <TestimonialForm
        mode="edit"
        testimonialId={id}
        initialValues={testimonial}
      />
    </>
  );
}
