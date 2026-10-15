import {
  LuArrowRight,
  LuCheck,
  LuCrown,
  LuFlame,
  LuIdCard,
  LuKey,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
import {
  MEMBERSHIP_PACKAGES,
  PACKAGE_CATEGORY,
  ADDON_PRICING,
  ADMISSION_REQUIREMENTS,
  SITE,
  type PriceItem,
} from "@/constants/site";
import { cn } from "@/utils/cn";
import { ROUTES } from "@/constants/routes";

/** "5,000 BDT" → "5,000" so the amount and currency can be styled apart. */
const amountOf = (price: string) => price.replace(/\s*BDT$/i, "");

function Price({ price, className }: { price: string; className?: string }) {
  return (
    <p className={cn("flex items-baseline gap-2", className)}>
      <span className="text-[1.5rem] leading-none font-bold text-muted">৳</span>
      <span className="font-display text-[3rem] leading-none tracking-[0.01em]">
        {amountOf(price)}
      </span>
      <span className="text-body-xs font-bold tracking-[0.15em] text-muted uppercase">
        BDT
      </span>
    </p>
  );
}

function MembershipCard({ item }: { item: PriceItem }) {
  return (
    <TiltCard max={10} className="rounded-[1.75rem]">
      <div
        className={cn(
          "preserve-3d relative flex h-full flex-col rounded-[1.75rem] p-7",
          item.featured
            ? "border border-gold/50 bg-linear-to-br from-gold/15 via-ink-900 to-ink-950 shadow-[0_25px_60px_-20px_rgb(245_197_24/0.45)]"
            : "border border-white/10 bg-linear-to-br from-ink-800/80 to-ink-950",
        )}
      >
        {item.featured ? (
          <TiltLayer depth={60} className="absolute -top-4 right-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-gold to-[#ffdd55] px-4 py-1.5 text-body-xs font-bold tracking-[0.15em] text-night uppercase shadow-[0_10px_25px_-5px_rgb(245_197_24/0.8)]">
              <LuCrown className="size-3.5" aria-hidden />
              Best Value
            </span>
          </TiltLayer>
        ) : null}

        <TiltLayer depth={25}>
          <h3 className="text-[1.75rem] leading-none tracking-[0.03em] text-white">
            {item.package}
          </h3>
          <p className="mt-2 min-h-5 text-body-xs text-muted">{item.notes ?? "Full facility access"}</p>
        </TiltLayer>

        <TiltLayer depth={45} className="mt-8">
          <Price price={item.price} className={item.featured ? "text-gold" : "text-white"} />
        </TiltLayer>

        <div className="mt-auto pt-8">
          <Button
            href={ROUTES.contact}
            size="sm"
            fullWidth
            variant={item.featured ? "gold" : "outline"}
            rightIcon={<LuArrowRight className="size-4" aria-hidden />}
          >
            Select Plan
          </Button>
        </div>
      </div>
    </TiltCard>
  );
}

function GroupCard({ item }: { item: PriceItem }) {
  return (
    <TiltCard max={10} className="rounded-[1.75rem]">
      <div
        className={cn(
          "preserve-3d relative flex h-full flex-col overflow-visible rounded-[1.75rem] p-8",
          item.featured
            ? "border border-brand-bright/50 bg-linear-to-br from-brand/40 via-ink-900 to-ink-950 shadow-[0_25px_60px_-20px_rgb(255_45_45/0.6)]"
            : "border border-white/10 bg-linear-to-br from-ink-800/80 to-ink-950",
        )}
      >
        <TiltLayer depth={50} className="flex items-center justify-between">
          <span
            className={cn(
              "grid size-14 place-items-center rounded-2xl text-white",
              item.featured
                ? "bg-linear-to-br from-brand to-brand-bright shadow-[0_12px_30px_-8px_rgb(255_45_45/0.9)]"
                : "border border-white/10 bg-white/5",
            )}
          >
            {item.featured ? <LuSparkles className="size-6" aria-hidden /> : <LuUsers className="size-6" aria-hidden />}
          </span>
          {item.featured ? (
            <span className="rounded-full border border-brand-bright/40 bg-brand/20 px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-brand-bright uppercase">
              Premium
            </span>
          ) : null}
        </TiltLayer>

        <TiltLayer depth={30} className="mt-6">
          <h3 className="text-[2.25rem] leading-none tracking-[0.03em] text-white">{item.package}</h3>
          {item.notes ? (
            <p className="mt-2 text-body-sm font-semibold text-brand-bright">{item.notes}</p>
          ) : null}
        </TiltLayer>

        <TiltLayer depth={45} className="mt-8 border-t border-white/10 pt-6">
          <Price price={item.price} className="text-white" />
        </TiltLayer>

        <div className="mt-auto pt-8">
          <Button
            href={ROUTES.contact}
            size="sm"
            fullWidth
            variant={item.featured ? "primary" : "outline"}
          >
            Enquire Now
          </Button>
        </div>
      </div>
    </TiltCard>
  );
}

function AddonPanel({
  title,
  Icon,
  items,
}: {
  title: string;
  Icon: typeof LuKey;
  items: readonly PriceItem[];
}) {
  return (
    <div className="glass relative overflow-hidden rounded-[1.75rem] p-8">
      <div aria-hidden className="absolute -top-20 -right-20 size-56 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-linear-to-br from-brand to-brand-bright text-snow">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="text-[2rem] leading-none tracking-[0.03em] text-white">{title}</h3>
      </div>
      <ul className="relative mt-6 flex flex-col">
        {items.map((item) => (
          <li
            key={item.package}
            className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-0"
          >
            <div>
              <span className="text-body font-semibold text-white">{item.package}</span>
              {item.notes ? <p className="text-body-xs text-muted">{item.notes}</p> : null}
            </div>
            <span className="shrink-0 rounded-full bg-gold/10 px-3 py-1 font-display text-[1.35rem] leading-none text-gold ring-1 ring-gold/30">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Complete Membership & Special Package pricing display. */
export function PricingPlans() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-32">
      <GlowBackdrop className="-z-10" grid variant="corners" />
      <Container flush className="flex flex-col gap-24 md:gap-32">
        {/* 1. Individual membership */}
        <div>
          <AnimationWrapper>
            <SectionTitle
              eyebrow="Standard & Duration Plans"
              title={
                <>
                  Membership <Accent>Category</Accent>
                </>
              }
              description="Flexible options ranging from daily guest passes to 24-month long-term transformation packages."
              align="center"
              className="mx-auto"
            />
          </AnimationWrapper>

          <StaggerGroup className="mt-14 grid gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {MEMBERSHIP_PACKAGES.map((item) => (
              <StaggerItem key={item.package} className="h-full">
                <MembershipCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* 2. Group / corporate / PT */}
        <div>
          <AnimationWrapper>
            <SectionTitle
              eyebrow="Special & Corporate Deals"
              title={
                <>
                  Group &amp; <Accent>Special Packages</Accent>
                </>
              }
              description="Exclusive rates for couples, training squads, corporate groups, and 1-on-1 personal coaching."
              align="center"
              className="mx-auto"
            />
          </AnimationWrapper>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {PACKAGE_CATEGORY.map((item) => (
              <StaggerItem key={item.package} className="h-full">
                <GroupCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* 3. Add-ons */}
        <AnimationWrapper>
          <div className="grid gap-6 lg:grid-cols-2">
            <AddonPanel
              title="Rental Lockers"
              Icon={LuKey}
              items={ADDON_PRICING.filter((item) => item.package.includes("Locker"))}
            />
            <AddonPanel
              title="Steam & Sauna Bath"
              Icon={LuFlame}
              items={ADDON_PRICING.filter((item) => item.package.includes("Bath"))}
            />
          </div>
        </AnimationWrapper>

        {/* 4. Admission requirements */}
        <AnimationWrapper direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-linear-to-br from-gold/15 via-ink-900 to-ink-950 p-8 lg:p-12">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
            <div aria-hidden className="absolute -right-20 -bottom-20 size-72 rounded-full bg-gold/20 blur-[90px]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-gold to-[#ffdd55] text-night shadow-[0_15px_35px_-10px_rgb(245_197_24/0.8)]">
                  <LuIdCard className="size-7" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[2.25rem] leading-none tracking-[0.03em] text-white">
                    Admission Requirements
                  </h3>
                  <p className="mt-3 max-w-2xl text-body-sm text-sand">
                    One-time lifetime admission fee:{" "}
                    <span className="font-bold text-gold">
                      {SITE.admissionFee.toLocaleString("en-US")} BDT
                    </span>{" "}
                    — never expires, no re-admission fee. Please bring:
                  </p>
                  <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                    {ADMISSION_REQUIREMENTS.map((req) => (
                      <li
                        key={req}
                        className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-body-sm font-semibold text-white ring-1 ring-white/10"
                      >
                        <LuCheck className="size-4 text-gold" aria-hidden />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="shrink-0">
                <Button href={ROUTES.contact} size="lg" variant="gold">
                  Join Powerfit Now
                </Button>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </Container>
    </section>
  );
}
