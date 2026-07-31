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
          <AnimationWrapper direction="right" className="flex flex-col gap-6 lg:col-span-7">
            <div>
              <p className="eyebrow text-brand">Our Story</p>
              <h2 className="mt-2 text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
                A Journey Built with <span className="text-brand">Passion</span>
              </h2>
            </div>

            <p className="text-body-lg font-medium leading-relaxed text-white text-balance-pretty">
              Our journey began before 2010 with a simple vision—to create a place where people could stay healthy, become stronger, and enjoy fitness together.
            </p>

            <p className="text-body text-sand text-balance-pretty">
              At that time, we never imagined building one of the largest fitness brands in Mohammadpur. We simply wanted to create a gym for our friends and family using quality equipment that was not easily available in Bangladesh. We opened our first gym at Shiya Masjid, Mohammadpur, becoming the first gym in the area.
            </p>

            <p className="text-body text-sand text-balance-pretty">
              As more people joined us, we realized that fitness was not just a business—it was a community. The trust and support of our members encouraged us to improve every year and provide better facilities for everyone.
            </p>

            <p className="text-body text-sand text-balance-pretty">
              A few years later, we noticed another challenge. Finding genuine sports and gym equipment in Bangladesh was difficult. To solve this problem, we established Multi Sports, making high-quality fitness and sports equipment more accessible for athletes, gym owners, and fitness enthusiasts across the country.
            </p>

            <p className="text-body text-sand text-balance-pretty">
              As our experience grew, so did our dream. We wanted to build a premium fitness experience that combined world-class equipment, professional trainers, and a welcoming environment.
            </p>

            <p className="text-body text-sand text-balance-pretty">
              This vision led to the opening of Multi Gym Premium Shiya Masjid and Multi Gym Premium Lalmatia. Both branches quickly became known for their modern facilities, premium equipment, and outstanding member experience. The love and trust of our members helped us earn recognition as one of the best gyms in the Mohammadpur area.
            </p>

            {/* 2026 Milestone Accent Box */}
            <div className="my-2 border-l-2 border-brand bg-ink-950/90 p-6 border-y border-r border-line shadow-lg">
              <span className="text-body-xs font-bold tracking-widest text-brand uppercase">
                Milestone 2026
              </span>
              <p className="mt-1 text-body-lg font-semibold text-white">
                In 2026, we proudly introduced Multi Gym Premium Powerfit—our most advanced fitness center, designed to deliver an even higher standard of training, comfort, and performance.
              </p>
            </div>

            <p className="text-body text-sand text-balance-pretty">
              Today, our journey continues with the same values that inspired us from the beginning: quality, dedication, and care for every member.
            </p>

            <p className="text-body font-medium text-sand text-balance-pretty">
              From one small gym to multiple premium fitness centers, every step has been possible because of the trust of our members. We remain committed to helping people build healthier lifestyles and achieve their fitness goals for many years to come.
            </p>
          </AnimationWrapper>
        </div>
      </Container>
    </section>
  );
}

