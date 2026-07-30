import { LuFlame, LuHandshake, LuShieldCheck, LuTrophy } from "react-icons/lu";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { SectionTitle } from "@/components/title/SectionTitle";

const VALUES = [
  {
    Icon: LuTrophy,
    title: "Excellence",
    description:
      "Every rack, every coach, every square foot is held to a world-class standard — no exceptions.",
  },
  {
    Icon: LuFlame,
    title: "Intensity",
    description:
      "We train with purpose. Comfort is not the goal — transformation is.",
  },
  {
    Icon: LuHandshake,
    title: "Community",
    description:
      "High-achievers push each other further. Our floor is a community, not a crowd.",
  },
  {
    Icon: LuShieldCheck,
    title: "Integrity",
    description:
      "Honest coaching, transparent pricing, and a facility that is exactly as advertised.",
  },
] as const;

/** Core values grid shown beneath the brand story. */
export function ValuesSection() {
  return (
    <section className="border-y border-line bg-ink-950 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        <SectionTitle
          eyebrow="What Drives Us"
          title="Our Core Values"
          align="center"
          withRule
          className="mx-auto"
        />

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex h-full flex-col gap-4 border border-line bg-ink-900 p-8 transition-colors duration-300 hover:border-brand">
                <span className="grid size-12 place-items-center border border-brand/40 bg-brand/10 text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-display-4 text-white">{title}</h3>
                <p className="text-body-sm text-sand">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
