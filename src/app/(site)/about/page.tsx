import { type Metadata } from "next";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { StorySection } from "@/components/sections/about/StorySection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { LeadershipSection } from "@/components/sections/about/LeadershipSection";
import { StatsBand } from "@/components/sections/about/StatsBand";
import { Accent } from "@/components/title/SectionTitle";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us & Leadership Messages",
  description: `${SITE.legalName} — Read executive leadership messages from Managing Director Abul Kalam Azad and Director Col Boney Yeamin.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/about.jpg"
        imageAlt="Powerfit facility floor and community"
        eyebrow="Who We Are"
        title={
          <>
            Engineering Greatness <Accent>Since Day One</Accent>
          </>
        }
        description={SITE.description}
      />

      <StorySection />
      <StatsBand />
      <LeadershipSection />
      <ValuesSection />
    </>
  );
}
