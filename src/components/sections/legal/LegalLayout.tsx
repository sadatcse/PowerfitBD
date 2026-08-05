import { type ReactNode } from "react";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { Container } from "@/components/common/Container";
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
      <section className="border-b border-line bg-ink-950 py-16 md:py-20">
        <Container>
          <AnimationWrapper>
            <SectionTitle as="h1" title={title} />
            <p className="mt-4 text-body-sm text-muted">
              Last updated: {updated}
            </p>
          </AnimationWrapper>
        </Container>
      </section>

      <section className="bg-ink-900 py-16 md:py-20">
        <Container>
          <StaggerGroup className="mx-auto flex max-w-3xl flex-col gap-10">
            {sections.map((section) => (
              <StaggerItem
                key={section.heading}
                className="flex flex-col gap-3"
              >
                <h2 className="text-display-4 text-white">{section.heading}</h2>
                <div className="flex flex-col gap-3 text-body-sm text-sand">
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
