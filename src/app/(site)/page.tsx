import { type Metadata } from "next";
import { DifferenceSection } from "@/components/sections/home/DifferenceSection";
import { FullServicesRosterSection } from "@/components/sections/home/FullServicesRosterSection";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeMarquee } from "@/components/sections/home/HomeMarquee";
import { InBodySection } from "@/components/sections/home/InBodySection";
import { LocationsSection } from "@/components/sections/home/LocationsSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { buildMetadata, buildOrganisationJsonLd } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: `${SITE.legalName} — Premier Athletics Performance`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Structured data — rendered server-side so crawlers see it in the HTML. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganisationJsonLd()),
        }}
      />

      <HomeHero />
      <HomeMarquee />
      <ServicesSection />
      <InBodySection />
      <FullServicesRosterSection />
      <DifferenceSection />
      <LocationsSection />
    </>
  );
}
