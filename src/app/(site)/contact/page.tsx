import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/title/SectionTitle";
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
      <section className="border-b border-line bg-ink-950 py-16 md:py-24">
        <Container>
          <SectionTitle
            as="h1"
            eyebrow="Get In Touch"
            title="Contact Us"
            description="Have a question about memberships, training, or facilities? Send a direct transmission and our team will respond shortly."
          />
        </Container>
      </section>

      <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
        <Container flush>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
