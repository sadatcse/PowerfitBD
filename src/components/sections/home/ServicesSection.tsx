import Image from "next/image";
import { FaUserCheck } from "react-icons/fa6";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
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

/**
 * "Core Training Services" bento grid section with bg-ink-900.
 */
export function ServicesSection() {
  return (
    <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        {/* Section Header styled identically to InBody & Full Services sections */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-1.5 text-body-xs font-bold tracking-[0.2em] text-brand-bright uppercase">
            <FaUserCheck className="size-3.5 text-brand-bright" aria-hidden />
            <span>Fitness For Everyone</span>
          </div>
          <h2 className="mt-4 text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
            Core Training & Programs
          </h2>
          <p className="mt-4 text-body-lg text-sand text-balance-pretty">
            From beginner habit building to elite body building, <span className="font-bold text-brand-bright">Powerfit</span> provides specialized programs for every ambition.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-6 lg:mt-16">
          {SERVICES.map((service) => (
            <StaggerItem
              key={service.id}
              className={cn(
                "md:col-span-3",
                service.span === "wide" ? "lg:col-span-4" : "lg:col-span-2",
              )}
            >
              <article className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden border border-line transition-colors duration-300 hover:border-brand/40">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes={IMAGE_SIZES.half}
                  className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/10"
                />

                <div className="relative z-10 flex flex-col gap-2 p-6 lg:p-8">
                  <p className="eyebrow text-brand-bright">{service.eyebrow}</p>
                  <h3 className="text-display-3 text-white">{service.title}</h3>
                  <p className="max-w-sm text-body-sm text-sand">
                    {service.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
