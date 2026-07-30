import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";

const STATS = [
  { value: "3", label: "Premier Locations" },
  { value: "24/7", label: "Full Access" },
  { value: "15+", label: "Expert Coaches" },
  { value: "5K+", label: "Members Transformed" },
] as const;

/** Proof-point band — reinforces scale after the brand story. */
export function StatsBand() {
  return (
    <section className="bg-ink-900 pb-16 md:pb-24 lg:pb-[7.5rem]">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-6 border border-line bg-ink-950 p-8 sm:p-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="font-display text-display-1 text-brand">
                {stat.value}
              </span>
              <span className="text-body-xs font-bold tracking-[0.2em] text-mist uppercase">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
