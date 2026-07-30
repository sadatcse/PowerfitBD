import Image from "next/image";
import { Container } from "@/components/common/Container";
import { AnimationWrapper } from "@/components/common/AnimationWrapper";
import { IMAGE_SIZES } from "@/utils/image";

/** Brand story — "From Grand Opening to a Legacy of Excellence." */
export function StorySection() {
  return (
    <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
      <Container flush>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimationWrapper direction="left" className="relative">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-line">
              <Image
                src="/images/about/community.jpg"
                alt="The Powerfit facility floor"
                fill
                sizes={IMAGE_SIZES.half}
                className="object-cover"
              />
            </div>
          </AnimationWrapper>

          <AnimationWrapper direction="right" className="flex flex-col gap-6">
            <p className="eyebrow text-brand">Our Story</p>
            <h2 className="text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
              A Legacy Built on <span className="text-brand">Excellence</span>
            </h2>
            <p className="text-body-lg text-sand text-balance-pretty">
              Multi Gym Premium Powerfit is the largest gym facility in the Mohammadpur and Lalmatia area. What began as a vision for elite conditioning has grown into three premier locations across Adabor, Shiya Masjid, and Lalmatia.
            </p>
            <p className="text-body text-sand text-balance-pretty">
              Every facility features a soundproof 4K TV environment, separate floors for men and women, dedicated ladies floors with female coaches, steam and sauna baths, personal lockers, and custom workout plans designed by qualified trainers alongside meal plans by registered dietitians.
            </p>
            <p className="text-body text-sand text-balance-pretty">
              Open Saturday through Thursday, Powerfit stands as Dhaka&apos;s benchmark for high-performance fitness — empowering members to transform their bodies and build healthy lifestyles.
            </p>
          </AnimationWrapper>
        </div>
      </Container>
    </section>
  );
}
