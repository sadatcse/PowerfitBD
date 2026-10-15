import Image from "next/image";
import { type ReactNode } from "react";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { SectionTitle } from "@/components/title/SectionTitle";
import { cn } from "@/utils/cn";

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
 * Inner-page hero: photo backdrop, ambient glow, and a receding 3D grid floor
 * that gives every page the same sense of depth as the home hero.
 */
export function PageHeaderBanner({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  align = "left",
}: PageHeaderBannerProps) {
  const centered = align === "center";

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="-z-20 scale-105 object-cover object-center opacity-25 select-none"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />
      <div
        className={cn(
          "absolute inset-0 -z-10",
          centered
            ? "bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-ink-950)_75%)]"
            : "bg-linear-to-r from-ink-950 via-ink-950/60 to-transparent",
        )}
      />
      <GlowBackdrop className="-z-10" variant={centered ? "center" : "left"} />

      {/* Receding 3D floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-50%] bottom-0 -z-10 h-[55%]"
      >
        <div className="absolute inset-0 perspective-floor animate-grid-flow opacity-40" />
      </div>

      {/* Floating depth rings */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 -z-10 hidden size-[26rem] -translate-y-1/2 lg:block",
          centered ? "left-1/2 -translate-x-1/2 opacity-30" : "right-[6%]",
        )}
      >
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-bright/30" />
        <div className="absolute inset-10 animate-float rounded-full border border-gold/20" />
        <div className="absolute inset-20 rounded-full bg-brand/10 blur-2xl" />
      </div>

      <Container className="relative">
        <AnimationWrapper direction="up" distance={40}>
          <SectionTitle
            as="h1"
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
            withRule
            className={centered ? "mx-auto" : undefined}
          />
        </AnimationWrapper>
      </Container>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-bright/50 to-transparent" />
    </section>
  );
}
