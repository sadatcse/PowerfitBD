import { FaDumbbell } from "react-icons/fa6";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { SERVICES_LIST } from "@/constants/site";

/**
 * "Full Services & Class Roster" — standalone homepage section matching InBody header style.
 */
export function FullServicesRosterSection() {
  return (
    <section className="border-t border-line bg-ink-950 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        {/* Section Header styled identically to InBody section */}
        <AnimationWrapper className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-1.5 text-body-xs font-bold tracking-[0.2em] text-brand-bright uppercase">
            <FaDumbbell className="size-3.5 text-brand-bright" aria-hidden />
            <span>All-Inclusive Offerings</span>
          </div>
          <h2 className="mt-4 text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
            Full Services & Class Roster
          </h2>
          <p className="mt-4 text-body-lg text-balance-pretty text-sand">
            All programs are led by{" "}
            <span className="font-bold text-brand-bright">
              Expert professionals
            </span>{" "}
            across our Powerfit, Shiya Masjid, and Lalmatia facilities.
          </p>
        </AnimationWrapper>

        {/* 12-Service Roster Grid */}
        <StaggerGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          stagger={0.04}
        >
          {SERVICES_LIST.map((srv) => (
            <StaggerItem
              key={srv.title}
              className="flex items-center gap-3 border border-line-soft bg-ink-900 px-4 py-3.5 transition-colors hover:border-brand/40"
            >
              <span className="grid size-2 shrink-0 rounded-full bg-brand-bright" />
              <div>
                <p className="text-body-sm font-bold text-white">{srv.title}</p>
                <p className="text-body-xs text-muted">{srv.category}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
