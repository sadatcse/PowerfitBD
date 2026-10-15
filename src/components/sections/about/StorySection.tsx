import Image from "next/image";
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

const MILESTONES = [
  {
    year: "Pre-2010",
    title: "First gym in Shiya Masjid",
    body: "A neighbourhood gym in Mohammadpur with one mission: world-class fitness and genuine equipment for our community.",
  },
  {
    year: "Growth",
    title: "Multi Sports is born",
    body: "To solve the shortage of authentic gear in Bangladesh, we began supplying high-quality gym equipment nationwide.",
  },
  {
    year: "Expansion",
    title: "Shiya Masjid & Lalmatia",
    body: "That experience paved the way for premier fitness centres across Shiya Masjid and Lalmatia.",
  },
  {
    year: "2026",
    title: "Powerfit flagship launch",
    body: "Multi Gym Premium Powerfit — our flagship, setting a new benchmark in performance and member experience.",
    highlight: true,
  },
] as const;

/** Brand story — layered 3D photo beside a vertical milestone timeline. */
export function StorySection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" variant="left" />
      <Container flush>
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
          <AnimationWrapper direction="left" className="lg:sticky lg:top-32 lg:col-span-5">
            <TiltCard max={8} glare={false} className="rounded-[2rem]">
              <div className="preserve-3d relative aspect-4/5 w-full">
                <div aria-hidden className="absolute inset-0 -translate-x-5 translate-y-5 rounded-[2rem] border border-gold/30" />
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10">
                  <Image
                    src="/images/about/our-story.jpg"
                    alt="Multi Gym Premium Powerfit - Our Story"
                    fill
                    sizes={IMAGE_SIZES.half}
                    className="object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-wine/60 via-transparent to-transparent" />
                </div>
                <TiltLayer depth={90} className="absolute -right-4 bottom-10 sm:-right-8">
                  <div className="glass-strong rounded-2xl px-6 py-5">
                    <p className="font-display text-[3rem] leading-none text-gradient">15+</p>
                    <p className="text-body-xs font-bold tracking-[0.2em] text-white uppercase">
                      Years of Fitness
                    </p>
                  </div>
                </TiltLayer>
                <TiltLayer depth={60} className="absolute top-6 left-6">
                  <span className="rounded-full bg-linear-to-r from-brand to-brand-bright px-4 py-2 text-body-xs font-bold tracking-[0.15em] text-snow uppercase shadow-lg">
                    Est. Mohammadpur
                  </span>
                </TiltLayer>
              </div>
            </TiltCard>
          </AnimationWrapper>

          <div className="flex flex-col gap-10 lg:col-span-7">
            <AnimationWrapper direction="right">
              <SectionTitle
                eyebrow="Our Story"
                title={
                  <>
                    A Journey Built with <Accent>Passion</Accent>
                  </>
                }
                description="From a single neighbourhood gym to multiple premium centres, our commitment remains unchanged: empowering every member to build a healthier, stronger lifestyle."
              />
            </AnimationWrapper>

            <StaggerGroup className="relative flex flex-col gap-5 pl-8">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-[0.6rem] w-px bg-linear-to-b from-brand-bright via-white/15 to-gold"
              />
              {MILESTONES.map((m) => (
                <StaggerItem key={m.title} direction="left" className="relative">
                  <span
                    aria-hidden
                    className={
                      "highlight" in m
                        ? "absolute top-6 -left-[1.95rem] size-4 rounded-full bg-gold shadow-[0_0_20px_rgb(245_197_24/0.9)]"
                        : "absolute top-6 -left-[1.85rem] size-3.5 rounded-full border-2 border-brand-bright bg-ink-950"
                    }
                  />
                  <div
                    className={
                      "highlight" in m
                        ? "rounded-2xl border border-gold/40 bg-linear-to-br from-gold/15 to-transparent p-6"
                        : "glass rounded-2xl p-6 transition-colors hover:border-white/20"
                    }
                  >
                    <p className={"highlight" in m ? "eyebrow text-gold" : "eyebrow text-brand-bright"}>
                      {m.year}
                    </p>
                    <h3 className="mt-2 text-[1.75rem] leading-none tracking-[0.03em] text-white">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-sand/85">{m.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
