import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { BRANCHES } from "@/constants/site";
import { IMAGE_SIZES } from "@/utils/image";

/**
 * "Premier Locations" — the three branch cards on the deep navy band
 * (Figma 12:60). Each card carries the branch photo, a pin icon, index numeral,
 * branch name, address block, and directions link.
 */
export function LocationsSection() {
  return (
    <section className="border-y border-line bg-ink-950 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
              Our Locations
            </h2>
            <p className="max-w-xl text-body-lg text-sand">
              Find your nearest Multigym Premium and join a community of high-performers.
            </p>
          </div>

          <Button href="#branches" variant="link">
            View Map
          </Button>
        </div>

        <StaggerGroup
          id="branches"
          className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {BRANCHES.map((branch, index) => (
            <StaggerItem key={branch.id}>
              <article className="group flex h-full flex-col overflow-hidden border border-line bg-ink-900 transition-colors duration-300 hover:border-brand">
                <div className="relative aspect-16/10 w-full overflow-hidden">
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
                </div>

                <div className="flex flex-1 flex-col gap-4 p-8">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/home/pin-icon.svg"
                      alt=""
                      width={24}
                      height={30}
                      className="h-[24px] w-5 shrink-0"
                    />
                    <h3 className="text-display-4 text-white">{branch.name}</h3>
                  </div>

                  <p className="text-body-sm text-sand">{branch.address}</p>
                  <p className="text-body-sm text-sand">Phone: {branch.phone}</p>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-4 font-sans text-body-sm font-bold text-white transition-colors hover:text-brand"
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
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
