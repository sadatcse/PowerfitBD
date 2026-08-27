import Image from "next/image";
import { Container } from "@/components/common/Container";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { IMAGE_SIZES } from "@/utils/image";

/** Brand story — "Our Story: A Journey Built with Passion." */
export function StorySection() {
  return (
    <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
      <Container flush>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual Column */}
          <AnimationWrapper direction="left" className="relative lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-line">
              <Image
                src="/images/about/our-story.jpg"
                alt="Multi Gym Premium Powerfit - Our Story"
                fill
                sizes={IMAGE_SIZES.half}
                className="object-cover"
              />
            </div>
            
            {/* Established Badge */}
            <div className="absolute right-0 bottom-0 border-t border-l border-line bg-brand px-6 py-4 shadow-xl">
              <p className="text-body-xs font-bold tracking-[0.15em] text-white uppercase">
                Est. Pre-2010 — Mohammadpur
              </p>
            </div>
          </AnimationWrapper>

          {/* Content Column */}
          <AnimationWrapper direction="right" className="flex flex-col gap-5 lg:col-span-7">
            <div>
              <p className="eyebrow text-brand">Our Story</p>
              <h2 className="mt-2 text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
                A Journey Built with <span className="text-brand">Passion</span>
              </h2>
            </div>

            <p className="text-body-lg font-medium leading-relaxed text-white text-balance-pretty">
              Founded pre-2010 in Mohammadpur, our journey began with a simple mission: bringing world-class fitness and genuine equipment to our local community.
            </p>

            <p className="text-body text-sand text-balance-pretty">
              Starting as the first gym in Shiya Masjid, Mohammadpur, we grew alongside a dedicated community. To solve the shortage of authentic gear in Bangladesh, we launched Multi Sports, supplying high-quality gym equipment nationwide. This experience paved the way for opening premier fitness centers in Shiya Masjid and Lalmatia.
            </p>

            {/* 2026 Milestone Accent Box */}
            <div className="my-1 border-l-2 border-brand bg-ink-950/90 p-5 border-y border-r border-line shadow-lg">
              <span className="text-body-xs font-bold tracking-widest text-brand uppercase">
                Milestone 2026 — Powerfit Launch
              </span>
              <p className="mt-1 text-body-sm font-semibold text-white">
                In 2026, we introduced Multi Gym Premium Powerfit—our flagship facility designed to set a new benchmark in performance, state-of-the-art training, and member experience.
              </p>
            </div>

            <p className="text-body text-sand font-medium text-balance-pretty">
              Today, from a single neighborhood gym to multiple premium centers, our commitment remains unchanged: empowering every member to build a healthier, stronger lifestyle.
            </p>
          </AnimationWrapper>
        </div>
      </Container>
    </section>
  );
}

