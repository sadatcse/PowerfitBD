import Image from "next/image";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { SectionTitle } from "@/components/title/SectionTitle";
import { IMAGE_SIZES } from "@/utils/image";
import { SERVICES_LIST } from "@/constants/site";
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
 * "Core Training Services" bento grid + complete services roster.
 */
export function ServicesSection() {
  return (
    <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
      <Container className="flex flex-col gap-16">
        <div>
          <SectionTitle
            eyebrow="Fitness For Everyone"
            title="Core Training & Programs"
            description="From beginner habit building to elite body building, Powerfit provides specialized programs for every ambition."
            align="center"
            withRule
            className="mx-auto"
          />

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-6 lg:mt-16">
            {SERVICES.map((service) => (
              <StaggerItem
                key={service.id}
                className={cn(
                  "md:col-span-3",
                  service.span === "wide" ? "lg:col-span-4" : "lg:col-span-2",
                )}
              >
                <article className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden border border-line">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes={IMAGE_SIZES.half}
                    className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/10"
                  />

                  <div className="relative z-10 flex flex-col gap-2 p-6 lg:p-8">
                    <p className="eyebrow text-brand">{service.eyebrow}</p>
                    <h3 className="text-display-3 text-white">{service.title}</h3>
                    <p className="max-w-sm text-body-sm text-sand">
                      {service.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Complete Services List Roster */}
        <div className="border border-line/60 bg-ink-950 p-8 lg:p-10">
          <h3 className="text-display-4 text-white">Full Services & Class Roster</h3>
          <p className="mt-1 text-body-sm text-sand">
            All programs are led by certified professionals across our Adabor, Shiya Masjid, and Lalmatia facilities.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((srv) => (
              <div
                key={srv.title}
                className="flex items-center gap-3 border border-line/50 bg-ink-900 px-4 py-3 transition-colors hover:border-brand/40"
              >
                <span className="grid size-2 shrink-0 rounded-full bg-brand" />
                <div>
                  <p className="text-body-sm font-bold text-white">{srv.title}</p>
                  <p className="text-body-xs text-muted">{srv.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
