import { type Metadata } from "next";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { Accent } from "@/components/title/SectionTitle";
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
        title={
          <>
            Let&apos;s <Accent>Talk</Accent>
          </>
        }
        description="Have a question about memberships, training, or facilities? Send us a message and our team will respond shortly."
      />

      <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-32">
        <GlowBackdrop className="-z-10" variant="corners" />
        <Container flush>
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <AnimationWrapper direction="left" className="lg:col-span-3">
              <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 size-72 rounded-full bg-brand/25 blur-[100px]"
                />
                <div className="relative">
                  <p className="eyebrow text-brand-bright">Send a message</p>
                  <h2 className="mt-2 text-[2.5rem] leading-none tracking-[0.02em] text-white">
                    How can we help?
                  </h2>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </div>
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
