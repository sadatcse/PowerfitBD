import Image from "next/image";
import { LuArrowRight, LuMapPin, LuPlay } from "react-icons/lu";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { Button } from "@/components/common/Button";
import { CountUp } from "@/components/common/CountUp";
import { Pill } from "@/components/common/Pill";
import { HeroSceneLazy } from "@/components/three/HeroSceneLazy";
import { ROUTES } from "@/constants/routes";

const HERO_STATS = [
  { to: 3, suffix: "", label: "Premium Branches" },
  { to: 300, suffix: "+", label: "Pro Machines" },
  { to: 5000, suffix: "K+", divisor: 1000, label: "Members" },
] as const;

/**
 * Home hero — headline and CTAs on the left, a live WebGL dumbbell scene on
 * the right, over a darkened gym photo, hairline grid, and crimson glow.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink-950 pt-28 pb-16 lg:pt-24">
      {/* Backdrop layers */}
      <Image
        src="/images/home/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-center opacity-20"
      />
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-t from-ink-950 via-transparent to-ink-950/60" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid opacity-60" />
      <div aria-hidden className="absolute top-1/3 right-[10%] -z-20 size-[38rem] animate-pulse-glow rounded-full bg-brand/25 blur-[140px]" />
      <div aria-hidden className="absolute bottom-0 left-[20%] -z-20 size-[24rem] rounded-full bg-gold/10 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-[78rem] items-center gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6">
          <AnimationWrapper direction="up" delay={0.05}>
            <Pill>Multi Gym Premium · Power Fit</Pill>
          </AnimationWrapper>

          <AnimationWrapper direction="up" delay={0.15} distance={50}>
            <h1 className="mt-6 text-[3.75rem] leading-[0.9] tracking-[0.01em] sm:text-[5.5rem] lg:text-[7.5rem]">
              <span className="block text-gradient-silver">Just Believe</span>
              <span className="block text-gradient">Your Trainer</span>
            </h1>
          </AnimationWrapper>

          <AnimationWrapper direction="up" delay={0.3}>
            <p className="mt-6 max-w-lg text-body-lg text-sand/90 text-balance-pretty">
              Custom programs by expert trainers, meal plans by registered
              dietitians — inside Dhaka&apos;s largest premium gym facility.
            </p>
          </AnimationWrapper>

          <AnimationWrapper direction="up" delay={0.4}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href={ROUTES.pricing}
                size="lg"
                rightIcon={<LuArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />}
              >
                Explore Memberships
              </Button>
              <Button
                href={ROUTES.contact}
                size="lg"
                variant="outline"
                leftIcon={
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand to-brand-bright text-snow">
                    <LuPlay className="size-3 translate-x-px fill-current" aria-hidden />
                  </span>
                }
              >
                Book a Tour
              </Button>
            </div>
          </AnimationWrapper>

          <AnimationWrapper direction="up" delay={0.5}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-3">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="glass flex flex-col-reverse rounded-2xl px-4 py-4">
                  <dt className="mt-1 text-[0.7rem] font-bold tracking-[0.15em] text-muted uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-[2.25rem] leading-none text-white">
                    <CountUp
                      to={stat.to}
                      suffix={stat.suffix}
                      divisor={"divisor" in stat ? stat.divisor : 1}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </AnimationWrapper>
        </div>

        {/* 3D scene */}
        <div className="relative h-[24rem] sm:h-[30rem] lg:col-span-6 lg:h-[42rem]">
          <HeroSceneLazy className="absolute inset-0 -mx-10 lg:-mx-20" />

          <AnimationWrapper
            direction="left"
            delay={0.7}
            className="absolute right-0 bottom-6 hidden sm:block"
          >
            <div className="glass animate-float-slow flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand to-brand-bright text-snow">
                <LuMapPin className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-body-sm font-bold text-white">3 Locations</p>
                <p className="text-body-xs text-muted">Adabor · Shiya Masjid · Lalmatia</p>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper
            direction="right"
            delay={0.85}
            className="absolute top-10 left-0 hidden sm:block"
          >
            <div className="glass animate-float flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="font-display text-[2rem] leading-none text-gold">FREE</span>
              <div>
                <p className="text-body-sm font-bold text-white">InBody Test</p>
                <p className="text-body-xs text-muted">With every admission</p>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <span className="size-1.5 animate-scroll-dot rounded-full bg-brand-bright" />
        </div>
        <span className="text-[0.65rem] tracking-[0.3em] text-muted uppercase">Scroll</span>
      </div>
    </section>
  );
}
