import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { ROUTES } from "@/constants/routes";

/**
 * Home hero — full-bleed photo behind a left-to-right navy gradient, with the
 * eyebrow / 80px display heading / copy / dual CTA stack from Figma (12:3).
 */
export function HomeHero() {
  return (
    <section className="relative flex min-h-[36rem] items-center overflow-hidden bg-ink-900 lg:min-h-[57.5rem]">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient from Figma: solid navy at the left, transparent at the right. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-ink-900 from-0% via-ink-900/70 via-50% to-ink-900/0 to-100%"
        />
      </div>

      <Container className="relative z-10 py-24 lg:py-0">
        <AnimationWrapper direction="right" className="max-w-3xl">
          <p className="eyebrow text-brand">MULTI GYM PREMIUM POWER FIT</p>

          <h1 className="mt-4 text-[3rem] leading-[1.05] tracking-[0.02em] text-white sm:text-6xl lg:text-display-1">
            JUST BELIEVE
            <span className="block text-brand">YOUR TRAINER</span>
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-sand text-balance-pretty">
            Building healthy lifestyle and habits. Custom exercise programs by expert trainers and custom meal plans by registered dietitians across Dhaka&apos;s largest premium gym facility.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={ROUTES.pricing} size="lg">
              Explore Memberships
            </Button>
            <Button href={ROUTES.contact} size="lg" variant="outline">
              Book a Tour
            </Button>
          </div>
        </AnimationWrapper>
      </Container>
    </section>
  );
}
