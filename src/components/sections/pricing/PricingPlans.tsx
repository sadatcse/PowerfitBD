import { LuCheck, LuIdCard, LuSparkles, LuKey, LuFlame } from "react-icons/lu";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import {
  MEMBERSHIP_PACKAGES,
  PACKAGE_CATEGORY,
  ADDON_PRICING,
  ADMISSION_REQUIREMENTS,
} from "@/constants/site";
import { cn } from "@/utils/cn";
import { ROUTES } from "@/constants/routes";

/** Complete Membership & Special Package pricing display. */
export function PricingPlans() {
  return (
    <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
      <Container className="flex flex-col gap-16 md:gap-24">

        {/* 1. MEMBERSHIP CATEGORY (Individual Packages) */}
        <div>
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <span className="eyebrow text-brand">Standard & Duration Plans</span>
            <h2 className="text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
              Membership Category
            </h2>
            <p className="max-w-2xl text-body-lg text-sand">
              Flexible options ranging from daily guest passes to 24-month long-term transformation packages.
            </p>
          </div>

          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERSHIP_PACKAGES.map((item) => (
              <StaggerItem key={item.package}>
                <div
                  className={cn(
                    "flex h-full flex-col justify-between border p-6 transition-colors duration-300",
                    item.featured
                      ? "relative border-gold bg-ink-950 shadow-lg shadow-gold/5"
                      : "border-line bg-ink-950 hover:border-brand/50",
                  )}
                >
                  {item.featured ? (
                    <span className="absolute -top-3 right-4 bg-gold px-3 py-0.5 text-body-xs font-bold tracking-[0.15em] text-ink-900 uppercase">
                      Popular Value
                    </span>
                  ) : null}

                  <div>
                    <h3 className="text-display-4 text-white">{item.package}</h3>
                    {item.notes ? (
                      <p className="mt-1 text-body-xs text-muted">{item.notes}</p>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-baseline justify-between border-t border-line/60 pt-4">
                    <span className="font-display text-display-2 text-gold">
                      {item.price}
                    </span>
                    <Button href={ROUTES.contact} size="sm" variant={item.featured ? "gold" : "outline"}>
                      Select Plan
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* 2. PACKAGE CATEGORY (Group, Corporate & Personal Training) */}
        <div>
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <span className="eyebrow text-brand">Special & Corporate Deals</span>
            <h2 className="text-[2rem] leading-[1.1] tracking-[0.03em] text-white sm:text-4xl lg:text-display-2">
              Group & Special Packages
            </h2>
            <p className="max-w-2xl text-body-lg text-sand">
              Exclusive rates for couples, training squads, corporate groups, and 1-on-1 personal coaching.
            </p>
          </div>

          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGE_CATEGORY.map((item) => (
              <StaggerItem key={item.package}>
                <div
                  className={cn(
                    "flex h-full flex-col justify-between border p-6 transition-colors duration-300",
                    item.featured
                      ? "border-brand bg-ink-950 shadow-lg shadow-brand/10"
                      : "border-line bg-ink-950 hover:border-brand/40",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-display-3 text-white">{item.package}</h3>
                      {item.featured ? (
                        <LuSparkles className="size-5 text-brand" aria-hidden />
                      ) : null}
                    </div>
                    {item.notes ? (
                      <p className="mt-2 text-body-sm font-semibold text-brand">
                        {item.notes}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-8 flex items-baseline justify-between border-t border-line/60 pt-4">
                    <span className="font-display text-display-2 text-white">
                      {item.price}
                    </span>
                    <Button href={ROUTES.contact} size="sm">
                      Enquire
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* 3. ADDONS: RENTAL LOCKERS & SPA (STEAM / SAUNA) */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Locker Facilities */}
          <div className="border border-line bg-ink-950 p-8">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <LuKey className="size-6 text-brand" />
              <h3 className="text-display-3 text-white">Rental Lockers</h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {ADDON_PRICING.filter((item) => item.package.includes("Locker")).map((item) => (
                <li key={item.package} className="flex items-center justify-between border-b border-line/40 pb-3">
                  <span className="text-body text-sand">{item.package}</span>
                  <span className="font-display text-display-4 text-gold">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steam & Sauna Bath */}
          <div className="border border-line bg-ink-950 p-8">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <LuFlame className="size-6 text-brand" />
              <h3 className="text-display-3 text-white">Steam & Sauna Bath</h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {ADDON_PRICING.filter((item) => item.package.includes("Bath")).map((item) => (
                <li key={item.package} className="flex flex-col gap-1 border-b border-line/40 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-body font-bold text-white">{item.package}</span>
                    <span className="font-display text-display-4 text-gold">{item.price}</span>
                  </div>
                  {item.notes ? (
                    <span className="text-body-xs text-muted">{item.notes}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. ADMISSION REQUIREMENTS BANNER */}
        <div className="flex flex-col gap-6 border border-gold/40 bg-ink-950 p-8 md:flex-row md:items-center md:justify-between lg:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center border border-gold/40 bg-gold/10 text-gold">
              <LuIdCard className="size-6" />
            </span>
            <div>
              <h3 className="text-display-3 text-white">Admission Requirements</h3>
              <p className="mt-1 text-body-sm text-sand">
                One-time Lifetime Admission Fee: <span className="font-bold text-gold">3,500 BDT</span> (Never expires & no re-admission fee). Please bring the following documents upon registration:
              </p>
              <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
                {ADMISSION_REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-body-sm font-semibold text-white">
                    <LuCheck className="size-4 text-brand" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="shrink-0 pt-4 md:pt-0">
            <Button href={ROUTES.contact} size="lg" variant="gold">
              Join Powerfit Now
            </Button>
          </div>
        </div>

      </Container>
    </section>
  );
}
