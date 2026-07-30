"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { Button } from "../common/Button";
import { Container } from "../common/Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { MAIN_NAV } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

/**
 * Top navigation — 80px tall, crimson underline on the active link, and a
 * solid "JOIN NOW" CTA, per the Figma top bar.
 *
 * `transparent` renders it over a hero image (Home); it turns solid once the
 * page scrolls so the links stay legible.
 */
export function Header({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const solid = !transparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "top-0 z-80 w-full transition-colors duration-300",
          transparent ? "fixed" : "sticky",
          solid
            ? "border-b border-line bg-ink-900/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo showWordmark />

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {MAIN_NAV.map((link) => {
                const active =
                  link.href === ROUTES.home
                    ? pathname === link.href
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-block border-b-2 pb-1.5 font-sans text-body-sm font-bold tracking-[0.02em] uppercase transition-colors duration-200",
                        active
                          ? "border-brand text-brand"
                          : "border-transparent text-mist hover:text-brand",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button href={ROUTES.pricing} size="sm" className="hidden sm:inline-flex">
              Join Now
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center text-mist transition-colors hover:text-brand lg:hidden"
            >
              <LuMenu className="size-6" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
