import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { CountUp } from "@/components/common/CountUp";
import { TiltCard } from "@/components/three/TiltCard";

const STATS = [
  { to: 3, suffix: "", label: "Premier Locations" },
  { to: 300, suffix: "+", label: "Fitness Equipment" },
  { to: 15, suffix: "+", label: "Expert Coaches" },
  { to: 5000, suffix: "K+", divisor: 1000, label: "Members Transformed" },
] as const;

/** Proof-point band — animated counters on tilting glass tiles. */
export function StatsBand() {
  return (
    <section className="relative bg-ink-900 py-20 md:py-24">
      <Container flush>
        <StaggerGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <TiltCard max={14} className="rounded-[1.75rem]">
                <div className="glass glow-border relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-[1.75rem] px-4 py-10 text-center">
                  <div aria-hidden className="absolute -bottom-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    divisor={"divisor" in stat ? stat.divisor : 1}
                    className="relative font-display text-[3.5rem] leading-none text-gradient sm:text-[4.5rem]"
                  />
                  <span className="relative text-body-xs font-bold tracking-[0.2em] text-mist uppercase">
                    {stat.label}
                  </span>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
