import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/title/SectionTitle";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { SITE } from "@/constants/site";

const FAQS = [
  {
    question: "Can I train at any Multi Gym Premium location?",
    answer:
      "Yes — all Multi Gym Premium members can shift to any branch at any time across our Adabor, Shiya Masjid, and Lalmatia locations.",
  },
  {
    question: "Does the admission fee ever expire?",
    answer:
      "No — one admission is lifetime! Once you register, your admission is valid for life.",
  },
  {
    question: "Is there any re-admission fee?",
    answer:
      "No — we have no re-admission system. Members never have to pay a re-admission fee.",
  },
  {
    question: "What documents are required for admission?",
    answer: `One-time lifetime admission fee is ৳${SITE.admissionFee.toLocaleString("en-US")}. Please bring 1 recent passport-size photograph and a copy of your NID, Passport, or Birth Certificate upon registration.`,
  },
  {
    question: "Do you offer group or corporate packages?",
    answer:
      "Yes — we offer dedicated Couple (2 Persons), Silver (5 Persons), Gold (7 Persons), and Platinum (9 Persons) packages with exclusive group rates.",
  },
] as const;

/** Short FAQ list beneath the pricing cards. */
export function PricingFaq() {
  return (
    <section className="border-t border-line bg-ink-950 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        <SectionTitle
          eyebrow="Questions"
          title="Membership FAQ"
          align="center"
          withRule
          className="mx-auto"
        />

        <StaggerGroup className="mx-auto mt-12 grid max-w-3xl gap-6 lg:mt-16">
          {FAQS.map((faq) => (
            <StaggerItem key={faq.question}>
              <div className="border border-line bg-ink-900 p-6 lg:p-8">
                <h3 className="text-display-4 text-white">{faq.question}</h3>
                <p className="mt-2 text-body-sm text-sand">{faq.answer}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
