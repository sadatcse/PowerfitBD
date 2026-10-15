import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { Accent } from "@/components/title/SectionTitle";
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
        title={
          <>
            The <Accent>Gallery</Accent>
          </>
        }
        description="A closer look at the floors, the equipment, and the community that make Powerfit Dhaka's benchmark for high-performance fitness."
        align="center"
      />

      <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-32">
        <GlowBackdrop className="-z-10" variant="center" />
        <Container flush>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
