import { FaBuilding, FaDumbbell, FaSpa, FaTv, FaVenus } from "react-icons/fa6";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";

const STATS = [
  {
    icon: FaBuilding,
    value: "3 Branches",
    label: "Adabor · Shiya Masjid · Lalmatia",
    color: "text-brand-bright",
  },
  {
    icon: FaDumbbell,
    value: "100+ Pro Gear",
    label: "Technogym & Olympic Racks",
    color: "text-brand-bright",
  },
  {
    icon: FaVenus,
    value: "Ladies Floor",
    label: "Female Trainers & Arabic Yoga",
    color: "text-pink-400",
  },
  {
    icon: FaSpa,
    value: "Steam & Sauna",
    label: "Daily Detox & Spa Recovery",
    color: "text-brand-bright",
  },
  {
    icon: FaTv,
    value: "Soundproof 4K",
    label: "High-Definition Audio & Visuals",
    color: "text-cyan-400",
  },
] as const;

/**
 * Ticker band under hero showcasing core gym highlights & scale metrics.
 */
export function HomeStatsBar() {
  return (
    <section className="relative z-20 -mt-8 border-y border-line bg-ink-950/95 py-6 backdrop-blur-md">
      <Container>
        <StaggerGroup
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.06}
        >
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <StaggerItem
              key={value}
              className="group flex items-center gap-3.5 border-l-2 border-line pl-4 transition-colors hover:border-brand"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-sm border border-line bg-ink-900 transition-transform duration-300 group-hover:scale-110">
                <Icon className={`size-5 ${color}`} aria-hidden />
              </div>
              <div>
                <p className="font-display text-body-lg font-bold tracking-wide text-white uppercase">
                  {value}
                </p>
                <p className="truncate text-body-xs text-muted lg:max-w-[160px]">
                  {label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
