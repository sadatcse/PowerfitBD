import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Container } from "./Container";

/** Background bands used across the Figma pages. */
export type SectionTone = "base" | "deep" | "raised";

const TONE_CLASSES: Record<SectionTone, string> = {
  base: "bg-ink-900",
  deep: "bg-ink-950 border-y border-line",
  raised: "bg-ink-850",
};

interface SectionProps {
  children: ReactNode;
  /** Background band. Figma alternates `base` and `deep` down each page. */
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  id?: string;
  /** Renders children without the inner content column. */
  flush?: boolean;
}

/**
 * Vertical rhythm wrapper: ~120px of padding on desktop, tightened on mobile,
 * matching the section spacing measured in the design.
 */
export function Section({
  children,
  tone = "base",
  className,
  containerClassName,
  id,
  flush = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 lg:py-(--spacing-section)", TONE_CLASSES[tone], className)}
    >
      <Container flush={flush} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
