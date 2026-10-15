import Image from "next/image";
import { FaUserCheck } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
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
import { cn } from "@/utils/cn";

interface ServiceCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  span: "wide" | "regular";
}

const SERVICES: readonly ServiceCard[] = [
  {
    id: "personal-coaching",
    eyebrow: "1-on-1 Training",
    title: "Personal Training & Meal Plans",
    description:
      "Custom exercise programs by qualified trainers paired with custom diet plans by registered nutritionists.",
    image: "/images/services/personal-coaching.jpg",
    span: "wide",
  },
  {
    id: "strength-bodybuilding",
    eyebrow: "Free Weights",
    title: "Strength & Bodybuilding",
    description:
      "Olympic platforms, power racks, assault gear, and heavy dumbbells engineered for maximum muscle growth.",
    image: "/images/services/strength-lab.jpg",
    span: "regular",
  },
  {
    id: "cardio-fatloss",
    eyebrow: "Endurance & Fat Loss",
    title: "Cardio & Fat Loss Programs",
    description:
      "Technogym treadmills, rowers, and targeted fat loss protocols tracked by real-time performance metrics.",
    image: "/images/services/cardio-evolution.jpg",
    span: "regular",
  },
  {
    id: "ladies-fitness",
    eyebrow: "Dedicated Floor",
    title: "Training for Women & Zumba",
    description:
      "Exclusive ladies floor with female trainers, daily Zumba classes, and scheduled Arabic Yoga sessions.",
    image: "/images/services/group-training.jpg",
    span: "wide",
  },
];

/** "Core Training & Programs" — 3D tilt bento grid. */
export function ServicesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" variant="right" />
      <Container flush>
        <AnimationWrapper>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="Fitness For Everyone"
              eyebrowIcon={<FaUserCheck className="size-3.5" aria-hidden />}
              title={
                <>
                  Core Training <Accent>&amp; Programs</Accent>
                </>
              }
            />
            <p className="max-w-md text-body-lg text-balance-pretty text-sand/80">
              From beginner habit building to elite bodybuilding — specialized
              programs for every ambition.
            </p>
          </div>
        </AnimationWrapper>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-6 lg:mt-20">
          {SERVICES.map((service, index) => (
            <StaggerItem
              key={service.id}
              className={cn(
                "md:col-span-3",
                service.span === "wide" ? "lg:col-span-4" : "lg:col-span-2",
              )}
            >
              <TiltCard max={7} className="rounded-[1.75rem]">
                <article className="group relative flex h-full min-h-[22rem] flex-col justify-end rounded-[1.75rem] border border-white/10 shadow-[0_30px_60px_-30px_rgb(76_10_38/0.5)] preserve-3d lg:min-h-[26rem]">
                  <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes={IMAGE_SIZES.half}
                      className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-wine/95 via-wine/45 to-transparent"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-tr from-brand/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  <TiltLayer depth={50} className="absolute top-6 left-6">
                    <span className="font-display text-[3.5rem] leading-none text-snow/15 [-webkit-text-stroke:1px_rgb(255_255_255/0.6)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </TiltLayer>
                  <TiltLayer depth={60} className="absolute top-6 right-6">
                    <span className="grid size-12 place-items-center rounded-full border border-snow/30 bg-snow/15 text-snow backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-bright group-hover:text-snow hover:text-snow">
                      <LuArrowUpRight className="size-5" aria-hidden />
                    </span>
                  </TiltLayer>

                  <TiltLayer
                    depth={40}
                    className="relative z-10 flex flex-col gap-3 p-7 lg:p-9"
                  >
                    <p className="eyebrow text-[#ffb59e]">
                      {service.eyebrow}
                    </p>
                    <h3 className="text-[2rem] leading-none tracking-[0.03em] text-snow lg:text-[2.5rem]">
                      {service.title}
                    </h3>
                    <p className="max-w-md text-body-sm text-snow/85">
                      {service.description}
                    </p>
                  </TiltLayer>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
