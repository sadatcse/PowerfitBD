import { LuPlus } from "react-icons/lu";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
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

/**
 * FAQ accordion built on native `<details>` — keyboard and screen-reader
 * accessible with zero client JavaScript.
 */
export function PricingFaq() {
  return (
    <section className="relative bg-ink-900 py-20 md:py-28 lg:py-32">
      <Container flush>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimationWrapper className="lg:col-span-5">
            <SectionTitle
              eyebrow="Questions"
              title={
                <>
                  Membership <Accent>FAQ</Accent>
                </>
              }
              description="Everything you need to know before your first session. Still unsure? Our team is a call away."
              className="lg:sticky lg:top-32"
            />
          </AnimationWrapper>

          <StaggerGroup className="flex flex-col gap-4 lg:col-span-7">
            {FAQS.map((faq, i) => (
              <StaggerItem key={faq.question}>
                <details
                  className="group glass rounded-2xl transition-colors open:border-brand-bright/40"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[1.5rem] leading-tight tracking-[0.03em] text-white uppercase">
                      {faq.question}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-open:rotate-45 group-open:border-brand-bright group-open:bg-brand-bright group-open:text-snow">
                      <LuPlus className="size-4" aria-hidden />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-body leading-relaxed text-sand/90">{faq.answer}</p>
                </details>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
