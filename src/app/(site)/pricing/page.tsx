import { type Metadata } from "next";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { PricingPlans } from "@/components/sections/pricing/PricingPlans";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Membership Pricing",
  description: `Official membership pricing for ${SITE.legalName}. All-inclusive access to Dhaka's largest premium gym facility across Adabor, Shiya Masjid, and Lalmatia.`,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/pricing.jpg"
        imageAlt="Members training in Multi Gym Premium Powerfit"
        eyebrow="Membership Pricing"
        title="All-Inclusive Premium Access"
        description="One unified membership gives you complete access to Technogym-grade equipment, expert trainers, dedicated ladies floors, steam & sauna, and soundproof 4K TV environments."
        align="center"
      />

      <PricingPlans />
      <PricingFaq />
    </>
  );
}
