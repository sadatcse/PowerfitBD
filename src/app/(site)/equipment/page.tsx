import { type Metadata } from "next";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { EquipmentCatalog } from "@/components/sections/equipment/EquipmentCatalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Equipment",
  description: `Explore world-class Technogym and YR Fitness commercial equipment across every ${SITE.name} location — strength, cardio, functional, and recovery.`,
  path: "/equipment",
});

export default function EquipmentPage() {
  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/equipment.jpg"
        imageAlt="Technogym strength and workout floor at Powerfit"
        eyebrow="The Arsenal"
        title="World-Class Gym Equipment"
        description="Every floor is outfitted with Technogym-grade & YR Fitness commercial equipment, chosen for athletes who train with purpose — not just members who show up."
      />

      <section className="bg-ink-900 py-12 md:py-20 lg:py-24">
        {/* Expanded wide container utilizing maximum width area of the page */}
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <EquipmentCatalog />
        </div>
      </section>
    </>
  );
}
