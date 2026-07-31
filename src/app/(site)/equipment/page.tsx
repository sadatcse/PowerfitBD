import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { EquipmentGrid } from "@/components/sections/equipment/EquipmentGrid";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Equipment",
  description: `World-class Technogym equipment across every ${SITE.name} location — strength, cardio, functional, and recovery.`,
  path: "/equipment",
});

export default function EquipmentPage() {
  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/equipment.jpg"
        imageAlt="Technogym strength and workout floor at Powerfit"
        eyebrow="The Arsenal"
        title="World-Class Equipment"
        description="Every floor is outfitted with Technogym-grade equipment, chosen for athletes who train with purpose — not just members who show up."
      />

      <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
        <Container>
          <EquipmentGrid />
        </Container>
      </section>
    </>
  );
}
