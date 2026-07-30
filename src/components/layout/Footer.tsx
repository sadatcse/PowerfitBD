import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Container } from "../common/Container";
import { Logo } from "./Logo";
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

/**
 * Site footer: brand blurb + socials, quick links, legal links, and the
 * operating-hours table shown across the Figma screens.
 *
 * A server component — it renders static content and needs no interactivity.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Logo tone="gold" />
            <p className="max-w-xs text-body-sm text-sand">
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
                    className="grid size-9 place-items-center border border-line text-muted transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="flex flex-col gap-4">
            <h2 className="text-body-xs font-bold tracking-[0.2em] text-gold uppercase">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-sand transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="flex flex-col gap-4">
            <h2 className="text-body-xs font-bold tracking-[0.2em] text-gold uppercase">
              Legal
            </h2>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-sand transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h2 className="text-body-xs font-bold tracking-[0.2em] text-gold uppercase">
              Operating Hours
            </h2>
            <dl className="flex flex-col gap-2.5">
              {OPERATING_HOURS.map((entry) => (
                <div
                  key={entry.days}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="text-body-sm text-sand">{entry.days}:</dt>
                  <dd className="text-body-sm font-bold text-white">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-body-xs text-brand italic">{HOURS_NOTE}</p>
            <a
              href={`tel:${SITE.hotline.replace(/\s/g, "")}`}
              className="text-body-sm text-sand transition-colors hover:text-brand"
            >
              {SITE.hotline}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-xs tracking-[0.1em] text-muted uppercase">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-body-xs text-muted">{SITE.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
