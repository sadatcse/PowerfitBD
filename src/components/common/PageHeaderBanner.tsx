import Image from "next/image";
import { type ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/title/SectionTitle";

interface PageHeaderBannerProps {
  /** Path to the background header image, e.g. "/images/headers/about.jpg" */
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

/**
 * Reusable visual hero banner for inner site pages featuring a full-width
 * background photo with dark contrast overlays and SectionTitle.
 */
export function PageHeaderBanner({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  align = "left",
}: PageHeaderBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink-950 py-20 md:py-28 lg:py-32">
      {/* Background Hero Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center opacity-30 select-none"
        sizes="100vw"
      />

      {/* Dark Vignette & Directional Gradients for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />

      {/* Content Layer */}
      <Container className="relative z-10">
        <SectionTitle
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={align}
          withRule={align === "center"}
          className={align === "center" ? "mx-auto" : undefined}
        />
      </Container>
    </section>
  );
}
