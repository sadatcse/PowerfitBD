import { LuFlame, LuHandshake, LuRotate3D, LuShieldCheck, LuTrophy } from "react-icons/lu";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";

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

/** Core values as 3D flip cards — hover or focus to turn them over. */
export function ValuesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" variant="corners" />
      <Container flush>
        <AnimationWrapper>
          <SectionTitle
            eyebrow="What Drives Us"
            title={
              <>
                Our Core <Accent>Values</Accent>
              </>
            }
            align="center"
            className="mx-auto"
          />
        </AnimationWrapper>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, description }, i) => (
            <StaggerItem key={title}>
              <div
                tabIndex={0}
                className="group h-80 rounded-[1.75rem] outline-none [perspective:1200px]"
              >
                <div className="preserve-3d relative size-full rounded-[1.75rem] transition-transform duration-700 ease-(--ease-out-expo) group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-ink-800 to-ink-950 p-8">
                    <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-brand/25 blur-3xl" />
                    <div className="relative flex items-start justify-between">
                      <span className="grid size-16 place-items-center rounded-2xl bg-linear-to-br from-brand to-brand-bright text-snow shadow-[0_15px_35px_-10px_rgb(255_45_45/0.9)]">
                        <Icon className="size-7" aria-hidden />
                      </span>
                      <span className="font-display text-[2rem] leading-none text-white/15">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="relative">
                      <h3 className="text-[2.5rem] leading-none tracking-[0.03em] text-white">{title}</h3>
                      <p className="mt-3 inline-flex items-center gap-2 text-body-xs font-bold tracking-[0.15em] text-muted uppercase">
                        <LuRotate3D className="size-4" aria-hidden />
                        Hover to reveal
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="backface-hidden absolute inset-0 flex flex-col justify-center gap-4 overflow-hidden rounded-[1.75rem] border border-white/10 bg-linear-to-br from-brand to-brand-bright p-8 [transform:rotateY(180deg)]">
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
                    <Icon className="relative size-8 text-[#ffe08a]" aria-hidden />
                    <h3 className="relative text-[2rem] leading-none tracking-[0.03em] text-snow">{title}</h3>
                    <p className="relative text-body leading-relaxed text-snow/90">{description}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
