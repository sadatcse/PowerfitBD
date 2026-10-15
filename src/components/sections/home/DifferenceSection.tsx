import Image from "next/image";
import { LuArrowRight, LuAward, LuFlame, LuTv, LuUserCheck, LuUsers } from "react-icons/lu";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
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

/** "Experience The Difference" — layered 3D photo stack beside the benefits. */
export function DifferenceSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" variant="right" />
      <Container flush>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <AnimationWrapper direction="left" className="relative">
            <TiltCard max={9} lift={10} glare={false} className="rounded-[2rem]">
              <div className="preserve-3d relative aspect-4/5 w-full">
                {/* Back plate */}
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2rem] border border-brand-bright/30 bg-brand/10"
                />
                {/* Main photo */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10">
                  <Image
                    src="/images/services/strength-lab.jpg"
                    alt="A Powerfit member training in the strength lab"
                    fill
                    sizes={IMAGE_SIZES.half}
                    className="object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent" />
                </div>
                {/* Floating inset photo */}
                <TiltLayer depth={80} className="absolute -bottom-8 -left-4 w-[45%] sm:-left-8">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-ink-950 shadow-2xl">
                    <Image
                      src="/images/services/group-training.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 45vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </TiltLayer>
                {/* Corporate badge */}
                <TiltLayer depth={110} className="absolute top-8 -right-4 sm:-right-8">
                  <div className="rounded-2xl bg-linear-to-br from-brand to-brand-bright px-6 py-4 text-center shadow-[0_20px_50px_-10px_rgb(255_45_45/0.8)]">
                    <p className="font-display text-[2.5rem] leading-none text-white">Corporate</p>
                    <p className="mt-1 text-body-xs font-bold tracking-[0.2em] text-white/80 uppercase">
                      Discounts Available
                    </p>
                  </div>
                </TiltLayer>
              </div>
            </TiltCard>
          </AnimationWrapper>

          <div className="flex flex-col gap-10">
            <AnimationWrapper direction="right">
              <SectionTitle
                eyebrow="Why Powerfit"
                title={
                  <>
                    Experience the <Accent>Difference</Accent>
                  </>
                }
                description="Beyond equipment, we provide a premium infrastructure for physical transformation — designed for those who value time and results."
              />
            </AnimationWrapper>

            <StaggerGroup className="flex flex-col gap-3" stagger={0.07}>
              {BENEFITS.map(({ Icon, title, description }) => (
                <StaggerItem key={title} direction="left">
                  <div className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-bright/30 bg-brand/15 text-brand-bright transition-all duration-300 group-hover:-rotate-6 group-hover:bg-linear-to-br group-hover:from-brand group-hover:to-brand-bright group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-sans text-body-sm font-bold tracking-[0.08em] text-white uppercase">
                        {title}
                      </h3>
                      <p className="mt-1 text-body-sm text-sand/80">{description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <AnimationWrapper direction="up">
              <Button
                href={ROUTES.pricing}
                size="lg"
                rightIcon={<LuArrowRight className="size-4" aria-hidden />}
              >
                Secure Membership
              </Button>
            </AnimationWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
}
