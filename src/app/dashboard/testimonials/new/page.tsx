import { type Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TestimonialForm } from "@/components/dashboard/testimonials/TestimonialForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Add Testimonial",
  path: "/dashboard/testimonials/new",
  noIndex: true,
});

export default function NewTestimonialPage() {
  return (
    <>
      <PageHeader
        title="Add Testimonial"
        description="This review will appear across the public site once saved."
      />
      <TestimonialForm mode="create" />
    </>
  );
}
