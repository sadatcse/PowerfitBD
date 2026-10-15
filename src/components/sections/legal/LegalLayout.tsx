import { type ReactNode } from "react";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { SectionTitle } from "@/components/title/SectionTitle";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalLayoutProps {
  title: string;
  updated: string;
  sections: readonly LegalSection[];
}

/** Shared template for the footer's legal pages — plain, readable, on-brand. */
export function LegalLayout({ title, updated, sections }: LegalLayoutProps) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-16 md:pt-44 md:pb-20">
        <GlowBackdrop className="-z-10" grid variant="left" />
        <Container>
          <AnimationWrapper>
            <SectionTitle as="h1" eyebrow="Legal" title={title} withRule />
            <p className="mt-5 text-body-sm text-muted">Last updated: {updated}</p>
          </AnimationWrapper>
        </Container>
      </section>

      <section className="bg-ink-950 pb-20 md:pb-28">
        <Container>
          <StaggerGroup className="mx-auto flex max-w-3xl flex-col gap-4">
            {sections.map((section, i) => (
              <StaggerItem
                key={section.heading}
                className="glass flex flex-col gap-3 rounded-2xl p-6 md:p-8"
              >
                <h2 className="flex items-baseline gap-3 text-[1.75rem] leading-none tracking-[0.03em] text-white">
                  <span className="font-display text-[1.25rem] text-brand-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-3 text-body-sm leading-relaxed text-sand/90">
                  {section.body}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
