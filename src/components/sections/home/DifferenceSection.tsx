import Image from "next/image";
import { LuAward, LuFlame, LuTv, LuUserCheck, LuUsers } from "react-icons/lu";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { IMAGE_SIZES } from "@/utils/image";
import { ROUTES } from "@/constants/routes";

const BENEFITS = [
  {
    Icon: LuAward,
    title: "Modern Equipment & Technogym Racks",
    description:
      "The largest gym facility in Adabor, Mohammadpur & Lalmatia, equipped with pro-grade gear.",
  },
  {
    Icon: LuUserCheck,
    title: "Expert Trainers & Custom Programs",
    description:
      "Custom exercise programs by qualified trainers and meal plans by registered dietitians.",
  },
  {
    Icon: LuUsers,
    title: "Dedicated Ladies Floor",
    description:
      "Exclusive separate floor for female members with female trainers, Zumba & daily Yoga.",
  },
  {
    Icon: LuFlame,
    title: "Steam & Sauna Spa",
    description:
      "Daily steam and sauna bath facilities for deep muscle recovery and detoxification.",
  },
  {
    Icon: LuTv,
    title: "Soundproof & 4K TV Environment",
    description:
      "Acoustically tuned environment with high-definition entertainment while you train.",
  },
] as const;

/**
 * "Experience The Difference" — image with an overlaid discount flag beside a
 * benefits list and a membership CTA (Figma 12:107).
 */
export function DifferenceSection() {
  return (
    <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimationWrapper direction="left" className="relative">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-line">
              <Image
                src="/images/services/strength-lab.jpg"
                alt="A Powerfit member training in the strength lab"
                fill
                sizes={IMAGE_SIZES.half}
                className="object-cover"
              />
            </div>

            {/* Corporate discount flag, bottom-right of the photo in Figma. */}
            <div className="absolute right-0 bottom-0 flex flex-col items-center bg-brand px-8 py-5 text-center lg:-right-6">
              <span className="mt-1 text-body-xs font-bold tracking-[0.15em] text-white uppercase">
                Corporate Discount
              </span>
            </div>
          </AnimationWrapper>

          <AnimationWrapper direction="right" className="flex flex-col gap-8">
            <h2 className="text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
              Experience the <span className="text-brand">Difference</span>
            </h2>

            <p className="max-w-xl text-body-lg text-sand text-balance-pretty">
              Beyond just equipment, we provide a premium infrastructure for
              physical transformation. Our memberships are designed for those
              who value time and results.
            </p>

            <ul className="flex flex-col gap-6">
              {BENEFITS.map(({ Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center border border-brand/40 bg-brand/10 text-brand">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-body-sm font-bold tracking-[0.1em] text-white uppercase">
                      {title}
                    </h3>
                    <p className="mt-1 text-body-sm text-sand">{description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <Button href={ROUTES.pricing} size="lg">
                Secure Membership
              </Button>
            </div>
          </AnimationWrapper>
        </div>
      </Container>
    </section>
  );
}
