import Image from "next/image";
import { FaGlobe, FaMapLocationDot } from "react-icons/fa6";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { BRANCHES } from "@/constants/site";
import { IMAGE_SIZES } from "@/utils/image";

/**
 * "Premier Locations" — the three branch cards on deep navy band.
 */
export function LocationsSection() {
  return (
    <section className="border-y border-line bg-ink-950 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        {/* Section Header styled identically to InBody & Full Services sections */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-1.5 text-body-xs font-bold tracking-[0.2em] text-brand-bright uppercase">
            <FaMapLocationDot className="size-3.5 text-brand-bright" aria-hidden />
            <span>Premier Athletic Facilities</span>
          </div>
          <h2 className="mt-4 text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
            Our Locations
          </h2>
          <p className="mt-4 text-body-lg text-sand text-balance-pretty">
            Find your nearest <span className="font-bold text-brand-bright">Multigym Premium</span> and join a community of high-performers.
          </p>
        </div>

        <StaggerGroup
          id="branches"
          className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {BRANCHES.map((branch, index) => (
            <StaggerItem key={branch.id}>
              <article className="group flex h-full flex-col overflow-hidden border border-line bg-ink-900 transition-all duration-300 hover:border-brand/60 hover:shadow-xl hover:shadow-brand/5">
                <a
                  href={branch.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-16/10 w-full overflow-hidden block"
                >
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    fill
                    sizes={IMAGE_SIZES.third}
                    className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/30 to-transparent"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      aria-hidden
                      className="font-display text-display-4 text-white/80 drop-shadow-xs"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </a>

                <div className="flex flex-1 flex-col gap-4 p-8">
                  <a
                    href={branch.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group/title"
                  >
                    <Image
                      src="/images/home/pin-icon.svg"
                      alt=""
                      width={24}
                      height={30}
                      className="h-[24px] w-5 shrink-0"
                    />
                    <h3 className="text-display-4 text-white transition-colors group-hover/title:text-gold">
                      {branch.name}
                    </h3>
                  </a>

                  <p className="text-body-sm text-sand">{branch.address}</p>
                  <p className="text-body-sm text-sand">Phone: {branch.phone}</p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-line/50">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-body-sm font-bold text-sand transition-colors hover:text-white"
                    >
                      Get Directions
                      <Image
                        src="/images/home/arrow-icon.svg"
                        alt=""
                        width={10}
                        height={10}
                        className="size-[9.333px]"
                      />
                    </a>

                    <a
                      href={branch.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gold border border-gold/30 transition-all hover:bg-gold hover:text-ink-950"
                    >
                      <FaGlobe className="size-3.5" />
                      Visit Website
                    </a>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
