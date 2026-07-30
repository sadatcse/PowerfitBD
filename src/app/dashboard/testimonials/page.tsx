import { type Metadata } from "next";
import { TestimonialListView } from "@/components/dashboard/testimonials/TestimonialListView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  path: "/dashboard/testimonials",
  noIndex: true,
});

export default function DashboardTestimonialsPage() {
  return <TestimonialListView />;
}
