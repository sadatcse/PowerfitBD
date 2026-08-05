import { type Metadata } from "next";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { Container } from "@/components/common/Container";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with ${SITE.legalName}. Book a tour, ask about memberships, or reach any of our three Dhaka locations.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/contact.jpg"
        imageAlt="Powerfit reception and member support team"
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have a question about memberships, training, or facilities? Send a direct transmission and our team will respond shortly."
      />

      <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
        <Container flush>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <AnimationWrapper direction="left" className="lg:col-span-3">
              <ContactForm />
            </AnimationWrapper>
            <AnimationWrapper
              direction="right"
              delay={0.1}
              className="lg:col-span-2"
            >
              <ContactInfo />
            </AnimationWrapper>
          </div>
        </Container>
      </section>
    </>
  );
}
