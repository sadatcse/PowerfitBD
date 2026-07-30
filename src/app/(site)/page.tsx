import { type Metadata } from "next";
import { DifferenceSection } from "@/components/sections/home/DifferenceSection";
import { HomeHero } from "@/components/sections/home/HomeHero";
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
      <ServicesSection />
      <LocationsSection />
      <DifferenceSection />
    </>
  );
}
