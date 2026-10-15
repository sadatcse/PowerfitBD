"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowUpRight, LuMenu } from "react-icons/lu";
import { Button } from "../common/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { MAIN_NAV } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

/**
 * Floating glass navigation. Sits transparent over each page hero, then
 * condenses into a frosted pill once the page scrolls. The active link is
 * marked by a sliding highlight shared across links via `layoutId`.
 */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-90 h-0.5 origin-left bg-linear-to-r from-brand via-brand-bright to-gold"
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-80 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[78rem] items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 ease-(--ease-out-expo) sm:px-6",
            scrolled
              ? "glass-strong h-16 shadow-[0_20px_50px_-24px_rgb(76_10_38/0.35)]"
              : "h-20 border border-transparent bg-transparent",
          )}
        >
          <Logo showWordmark />

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
              {MAIN_NAV.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="relative">
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-linear-to-r from-brand to-brand-bright shadow-[0_6px_20px_-6px_rgb(225_29_72/0.6)]"
                      />
                    ) : null}
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 font-nav text-body-sm font-semibold tracking-[0.06em] uppercase transition-colors duration-200",
                        active ? "text-snow" : "text-mist/80 hover:text-brand",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={ROUTES.pricing}
              size="sm"
              className="hidden sm:inline-flex"
              rightIcon={<LuArrowUpRight className="size-4" aria-hidden />}
            >
              Join Now
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-mist backdrop-blur-md transition-colors hover:border-brand-bright hover:text-white lg:hidden"
            >
              <LuMenu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
