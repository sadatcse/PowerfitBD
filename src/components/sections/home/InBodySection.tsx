import Image from "next/image";
import { FaCheck, FaGift, FaShieldHalved } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
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

/** "FREE InBody Body Composition Test" — machine on a 3D orbit stage. */
export function InBodySection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" variant="left" />
      <Container flush>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* 3D stage */}
          <AnimationWrapper direction="scale">
            <TiltCard max={10} lift={20} className="rounded-[2rem]">
              <div className="relative aspect-square rounded-[2rem] border border-white/10 preserve-3d">
                <div
                  aria-hidden
                  className="absolute inset-0 overflow-hidden rounded-[inherit] bg-[radial-gradient(circle_at_50%_40%,rgb(255_45_45/0.25),transparent_60%)]"
                >
                  <div className="absolute inset-0 bg-grid" />

                  {/* Orbit rings */}
                  <div className="absolute inset-[12%] animate-spin-slow rounded-full border border-dashed border-brand-bright/40" />
                  <div className="absolute inset-[22%] animate-spin-slow rounded-full border border-gold/20 [animation-direction:reverse]" />
                  <div className="absolute bottom-[14%] left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-[50%] bg-brand/50 blur-2xl" />
                </div>

                <TiltLayer depth={70} className="absolute inset-[10%]">
                  <div className="relative size-full animate-float">
                    <Image
                      src="/inbody/1.png"
                      alt="InBody Body Composition Analyzer Machine"
                      fill
                      sizes={IMAGE_SIZES.half}
                      className="object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.6)]"
                    />
                  </div>
                </TiltLayer>

                <TiltLayer depth={90} className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-xs font-bold tracking-widest text-white uppercase glass">
                    <FaShieldHalved
                      className="size-3 text-brand-bright"
                      aria-hidden
                    />
                    Medical-Grade BIA
                  </span>
                </TiltLayer>
                <TiltLayer depth={100} className="absolute right-5 bottom-5">
                  <div className="rounded-2xl bg-linear-to-br from-gold to-[#ffdd55] px-5 py-3 text-ink-950 shadow-[0_15px_40px_-10px_rgb(245_197_24/0.7)]">
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                      Worth ৳1,000
                    </p>
                    <p className="font-display text-[2rem] leading-none">
                      Free
                    </p>
                  </div>
                </TiltLayer>
              </div>
            </TiltCard>
          </AnimationWrapper>

          {/* Copy */}
          <div className="flex flex-col gap-8">
            <AnimationWrapper direction="right">
              <SectionTitle
                eyebrow="Free InBody Body Composition Test"
                eyebrowIcon={<FaGift className="size-3.5" aria-hidden />}
                title={
                  <>
                    Know Your Body <Accent>Before You Start</Accent>
                  </>
                }
                description="Every new member receives a detailed body composition analysis. Unlike a scale, InBody tracks fat, muscle, and metabolic metrics to build your personalized workout and diet plan."
              />
            </AnimationWrapper>

            <StaggerGroup className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {CORE_REPORT_METRICS.map((metric) => (
                <StaggerItem key={metric}>
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5 glass transition-colors hover:border-brand-bright/40">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand to-brand-bright text-white">
                      <FaCheck className="size-3" aria-hidden />
                    </span>
                    <span className="text-body-sm font-semibold text-mist">
                      {metric}
                    </span>
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
                Claim Free InBody
              </Button>
            </AnimationWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
}
