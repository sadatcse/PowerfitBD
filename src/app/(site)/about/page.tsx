import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { SectionTitle } from "@/components/title/SectionTitle";
import { StorySection } from "@/components/sections/about/StorySection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { StatsBand } from "@/components/sections/about/StatsBand";
import { buildMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `${SITE.legalName} — Dhaka's premier athletics performance facility. Learn our story, our values, and what makes Powerfit different.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-ink-950 py-16 md:py-24">
        <Container>
          <SectionTitle
            as="h1"
            eyebrow="Who We Are"
            title="Engineering Greatness Since Day One"
            description={SITE.description}
          />
        </Container>
      </section>

      <StorySection />
      <ValuesSection />
      <StatsBand />

      <section className="border-t border-line bg-ink-950 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
              Ready to <span className="text-brand">Join the Floor</span>?
            </h2>
            <p className="max-w-xl text-body-lg text-sand text-balance-pretty">
              Meet the coaches, tour a location, or lock in your membership
              today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href={ROUTES.team} size="lg" variant="outline">
                Meet The Team
              </Button>
              <Button href={ROUTES.pricing} size="lg">
                View Memberships
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
