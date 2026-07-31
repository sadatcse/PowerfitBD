import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { GalleryGrid } from "@/components/sections/gallery/GalleryGrid";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: `A look inside ${SITE.legalName} — our floors, our equipment, our community.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/gallery.jpg"
        imageAlt="Inside Multi Gym Premium Powerfit facility"
        eyebrow="Inside Powerfit"
        title="The Gallery"
        description="A closer look at the floors, the equipment, and the community that make Powerfit Dhaka's benchmark for high-performance fitness."
        align="center"
      />

      <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
        <Container flush>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
