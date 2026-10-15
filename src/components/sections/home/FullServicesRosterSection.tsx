import { FaDumbbell } from "react-icons/fa6";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { TiltCard } from "@/components/three/TiltCard";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
import { SERVICES_LIST } from "@/constants/site";

/** "Full Services & Class Roster" — numbered glass tiles with 3D tilt. */
export function FullServicesRosterSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" grid variant="center" />
      <Container flush>
        <AnimationWrapper>
          <SectionTitle
            eyebrow="All-Inclusive Offerings"
            eyebrowIcon={<FaDumbbell className="size-3.5" aria-hidden />}
            title={
              <>
                Full Services <Accent>&amp; Class Roster</Accent>
              </>
            }
            description="All programs are led by expert professionals across our Powerfit, Shiya Masjid, and Lalmatia facilities."
            align="center"
            className="mx-auto"
          />
        </AnimationWrapper>

        <StaggerGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          stagger={0.05}
        >
          {SERVICES_LIST.map((srv, i) => (
            <StaggerItem key={srv.title}>
              <TiltCard max={12} lift={30} className="rounded-2xl">
                <div className="glass glow-border group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl p-6">
                  <div
                    aria-hidden
                    className="absolute -top-12 -right-12 size-32 rounded-full bg-brand/0 blur-2xl transition-colors duration-500 group-hover:bg-brand/40"
                  />
                  <div className="flex items-start justify-between">
                    <span className="font-display text-[1.75rem] leading-none text-white/20 transition-colors group-hover:text-brand-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-gold uppercase">
                      {srv.category}
                    </span>
                  </div>
                  <p className="relative font-display text-[1.6rem] leading-[1.05] tracking-[0.03em] text-white uppercase">
                    {srv.title}
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
