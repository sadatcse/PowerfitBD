import Image from "next/image";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuArrowUpRight, LuGlobe, LuMapPin, LuNavigation, LuPhone } from "react-icons/lu";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
import { BRANCHES } from "@/constants/site";
import { IMAGE_SIZES } from "@/utils/image";

/** "Our Locations" — three branch cards with 3D tilt and floating badges. */
export function LocationsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" grid variant="corners" />
      <Container flush>
        <AnimationWrapper>
          <SectionTitle
            eyebrow="Premier Athletic Facilities"
            eyebrowIcon={<FaMapLocationDot className="size-3.5" aria-hidden />}
            title={
              <>
                Our <Accent>Locations</Accent>
              </>
            }
            description="Find your nearest Multigym Premium and join a community of high-performers. Members can train at any branch."
            align="center"
            className="mx-auto"
          />
        </AnimationWrapper>

        <StaggerGroup
          id="branches"
          className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {BRANCHES.map((branch, index) => (
            <StaggerItem key={branch.id} className="h-full">
              <TiltCard max={8} className="rounded-[1.75rem]">
                <article className="group preserve-3d relative flex h-full flex-col rounded-[1.75rem]">
                  <div aria-hidden className="glass absolute inset-0 rounded-[inherit]" />
                  <a
                    href={branch.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative m-3 block aspect-16/11 overflow-hidden rounded-[1.25rem]"
                  >
                    <Image
                      src={branch.image}
                      alt={branch.name}
                      fill
                      sizes={IMAGE_SIZES.third}
                      className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-wine/70 via-transparent to-transparent"
                    />
                    <span
                      aria-hidden
                      className="absolute bottom-3 left-4 font-display text-[3.5rem] leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.7)]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>

                  <TiltLayer depth={60} className="absolute top-7 right-7">
                    <span className="grid size-11 place-items-center rounded-full bg-linear-to-br from-brand to-brand-bright text-snow shadow-[0_10px_30px_-5px_rgb(255_45_45/0.8)]">
                      <LuMapPin className="size-5" aria-hidden />
                    </span>
                  </TiltLayer>

                  <TiltLayer depth={30} className="flex flex-1 flex-col gap-4 px-6 pt-3 pb-6">
                    <h3 className="text-[1.75rem] leading-none tracking-[0.03em] text-white transition-colors group-hover:text-gold">
                      {branch.name}
                    </h3>
                    <p className="text-body-sm leading-relaxed text-sand/80">{branch.address}</p>
                    <a
                      href={`tel:${branch.phone.replace(/[\s-]/g, "")}`}
                      className="inline-flex items-center gap-2 text-body-sm font-semibold text-white transition-colors hover:text-brand-bright"
                    >
                      <LuPhone className="size-4 text-brand-bright" aria-hidden />
                      {branch.phone}
                    </a>

                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-body-xs font-bold tracking-wider text-snow uppercase ring-1 ring-white/10 transition-all hover:bg-brand hover:text-snow hover:ring-brand-bright"
                      >
                        <LuNavigation className="size-3.5" aria-hidden />
                        Directions
                      </a>
                      <a
                        href={branch.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold/10 px-4 py-2.5 text-body-xs font-bold tracking-wider text-gold uppercase ring-1 ring-gold/30 transition-all hover:bg-gold hover:text-night"
                      >
                        <LuGlobe className="size-3.5" aria-hidden />
                        Website
                        <LuArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    </div>
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
