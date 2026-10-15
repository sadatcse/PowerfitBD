import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { LuArrowUpRight, LuClock, LuPhone } from "react-icons/lu";
import { Button } from "../common/Button";
import { Container } from "../common/Container";
import { GlowBackdrop } from "../common/GlowBackdrop";
import { TiltCard } from "../three/TiltCard";
import { Logo } from "./Logo";
import { ROUTES } from "@/constants/routes";
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  HOURS_NOTE,
  OPERATING_HOURS,
  SITE,
  SOCIAL_LINKS,
} from "@/constants/site";

const SOCIALS = [
  { href: SOCIAL_LINKS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: FaInstagram },
  { href: SOCIAL_LINKS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: SOCIAL_LINKS.twitter, label: "X", Icon: FaXTwitter },
] as const;

const HEADING =
  "font-sans text-body-xs font-bold tracking-[0.25em] text-brand-bright uppercase";

/**
 * Site footer: 3D call-to-action card, brand blurb + socials, link columns,
 * operating hours, and an oversized outlined wordmark.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 pt-16 lg:pt-24">
      <GlowBackdrop className="-z-10" variant="corners" grid />

      <Container flush>
        {/* CTA card */}
        <TiltCard max={5} className="rounded-[2rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-brand via-[#f0384f] to-brand-bright p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
            <div
              aria-hidden
              className="absolute -top-20 -right-10 size-80 rounded-full bg-gold/25 blur-[100px]"
            />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-[#ffe08a]">Your transformation starts today</p>
                <h2 className="mt-3 text-[2.5rem] leading-[0.95] tracking-[0.02em] text-snow sm:text-6xl lg:text-[4.5rem]">
                  Ready to train
                  <br />
                  like a champion?
                </h2>
                <p className="mt-4 max-w-lg text-body-lg text-snow/90">
                  Free InBody test with every admission. Lifetime registration —
                  never pay a re-admission fee.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={ROUTES.pricing} size="lg" variant="gold">
                  Get Membership
                </Button>
                <Button
                  href={ROUTES.contact}
                  size="lg"
                  variant="outline"
                  className="border-snow/50 bg-snow/10 text-snow hover:border-snow hover:bg-snow/20"
                >
                  Book a Tour
                </Button>
              </div>
            </div>
          </div>
        </TiltCard>
      </Container>

      <Container flush className="pt-16 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Logo tone="white" />
            <p className="max-w-xs text-body-sm leading-relaxed text-sand/80">
              The standard in high-performance fitness. We don&apos;t just train
              bodies; we engineer greatness across Dhaka&apos;s premier
              locations.
            </p>
            <ul className="flex flex-wrap items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-brand-bright hover:bg-brand hover:text-snow hover:shadow-[0_10px_25px_-8px_rgb(255_45_45/0.8)]"
                  >
                    <Icon className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links" className="flex flex-col gap-5 lg:col-span-2">
            <h2 className={HEADING}>Explore</h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-body-sm text-sand transition-colors hover:text-white"
                  >
                    {link.label}
                    <LuArrowUpRight
                      className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="flex flex-col gap-5 lg:col-span-2">
            <h2 className={HEADING}>Legal</h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-sand transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="glass flex flex-col gap-4 rounded-3xl p-6 lg:col-span-4">
            <h2 className={`${HEADING} flex items-center gap-2`}>
              <LuClock className="size-4" aria-hidden />
              Operating Hours
            </h2>
            <dl className="flex flex-col gap-3">
              {OPERATING_HOURS.map((entry) => (
                <div
                  key={entry.days}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3"
                >
                  <dt className="text-body-sm text-sand">{entry.days}</dt>
                  <dd className="font-display text-display-4 text-white">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-body-xs text-gold/80 italic">{HOURS_NOTE}</p>
            <a
              href={`tel:${SITE.hotline.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-body-sm font-bold text-white transition-colors hover:text-brand-bright"
            >
              <LuPhone className="size-4 text-brand-bright" aria-hidden />
              {SITE.hotline}
            </a>
          </div>
        </div>
      </Container>

      {/* Oversized outlined wordmark */}
      <div
        aria-hidden
        className="pointer-events-none mt-12 overflow-hidden text-center font-display text-[22vw] leading-[0.8] tracking-[0.02em] text-transparent uppercase select-none [-webkit-text-stroke:1px_var(--wordmark-stroke)] lg:text-[17rem]"
      >
        Powerfit
      </div>

      <div className="border-t border-white/5">
        <Container
          flush
          className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-body-xs tracking-[0.1em] text-muted uppercase">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-body-xs tracking-[0.2em] text-muted uppercase">
            {SITE.tagline}
          </p>
        </Container>
      </div>
    </footer>
  );
}
