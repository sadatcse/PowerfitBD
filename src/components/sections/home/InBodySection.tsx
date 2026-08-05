import Image from "next/image";
import { FaCheck, FaGift, FaShieldHalved } from "react-icons/fa6";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ROUTES } from "@/constants/routes";
import { IMAGE_SIZES } from "@/utils/image";

const CORE_REPORT_METRICS = [
  "Body Fat Percentage",
  "Skeletal Muscle Mass",
  "Body Weight & BMI",
  "Visceral Fat Level",
  "Basal Metabolic Rate (BMR)",
  "Fitness & Health Score",
] as const;

/**
 * "FREE InBody Body Composition Test" — Home section.
 */
export function InBodySection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-900 py-12 md:py-16 lg:py-20">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-10 size-[500px] rounded-full bg-brand/10 blur-[130px]"
      />

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-1.5 text-body-xs font-bold tracking-[0.2em] text-brand-bright uppercase">
            <FaGift className="size-3.5 text-brand-bright" aria-hidden />
            <span>FREE InBody Body Composition Test</span>
          </div>
          <h2 className="mt-4 text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
            Know Your Body Before You Start Your Fitness Journey
          </h2>
          <p className="mt-4 text-body-lg text-sand text-balance-pretty">
            Get Your Professional Body Analysis <span className="font-bold text-brand-bright">FREE</span> with Every New Admission.
          </p>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column — Scanner Image Card */}
          <AnimationWrapper direction="left" className="lg:col-span-5">
            <div className="group relative flex flex-col items-center justify-between overflow-hidden border border-line bg-ink-950 p-6 transition-colors duration-300 hover:border-brand/40 sm:p-8">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_var(--tw-gradient-stops))] from-brand/15 via-transparent to-transparent opacity-70"
              />

              <div className="relative z-10 w-full flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-body-xs font-bold tracking-widest text-muted uppercase">
                  <FaShieldHalved className="size-3 text-brand-bright" aria-hidden />
                  Medical-Grade BIA
                </span>
                <span className="border border-brand/40 bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand-bright uppercase">
                  FREE Bonus
                </span>
              </div>

              <div className="relative z-10 my-4 aspect-3/4 h-[360px] sm:h-[400px] w-full max-w-[320px]">
                <Image
                  src="/inbody/1.png"
                  alt="InBody Body Composition Analyzer Machine"
                  fill
                  sizes={IMAGE_SIZES.half}
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>

              <div className="relative z-10 w-full text-center border-t border-line/60 pt-4">
                <p className="font-display text-display-4 text-white uppercase">InBody Precision Analysis</p>
                <p className="mt-1 text-body-xs text-sand">Worth ৳1,000 — Included FREE with Admission</p>
              </div>
            </div>
          </AnimationWrapper>

          {/* Right Column — Compact Content & Key Metrics */}
          <AnimationWrapper direction="right" className="flex flex-col gap-6 lg:col-span-7">
            <div className="border border-line bg-ink-950 p-5 sm:p-6">
              <p className="text-body-md text-sand leading-relaxed">
                Every new member receives a detailed body composition analysis upon admission. Unlike a standard scale, InBody tracks fat, muscle, and metabolic metrics to build your personalized workout & diet plan.
              </p>
            </div>

            {/* Metrics Pills */}
            <div className="border border-line bg-ink-950 p-5 sm:p-6">
              <h3 className="text-body-xs font-bold tracking-[0.15em] text-mist uppercase mb-3">
                Report Analysis Includes
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {CORE_REPORT_METRICS.map((metric) => (
                  <div
                    key={metric}
                    className="flex items-center gap-2.5 border border-line-soft bg-ink-900/80 px-3 py-2 text-body-xs text-sand"
                  >
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-bright">
                      <FaCheck className="size-2.5" aria-hidden />
                    </span>
                    <span className="font-medium text-mist">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <Button href={ROUTES.pricing} size="md">
                Claim Free InBody With Membership
              </Button>
            </div>
          </AnimationWrapper>
        </div>
      </Container>
    </section>
  );
}
