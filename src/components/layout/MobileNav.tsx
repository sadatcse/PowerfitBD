"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { LuArrowUpRight, LuPhone, LuX } from "react-icons/lu";
import { Button } from "../common/Button";
import { Logo } from "./Logo";
import { MAIN_NAV, SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/** Full-height glass drawer for tablet and mobile breakpoints. */
export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-90 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.nav
            aria-label="Mobile navigation"
            className="glass-strong absolute inset-y-3 right-3 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl"
            initial={{ x: "110%", rotateY: -25 }}
            animate={{ x: 0, rotateY: 0 }}
            exit={{ x: "110%", rotateY: -25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand/30 blur-[90px]"
            />

            <div className="relative flex items-center justify-between px-6 py-5">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="grid size-10 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-brand-bright hover:text-white"
              >
                <LuX className="size-5" aria-hidden />
              </button>
            </div>

            <ul className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
              {MAIN_NAV.map((link, i) => {
                const active =
                  link.href === ROUTES.home
                    ? pathname === link.href
                    : pathname.startsWith(link.href);

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl px-5 py-3.5 font-display text-[1.75rem] leading-none tracking-[0.04em] uppercase transition-all",
                        active
                          ? "bg-linear-to-r from-brand/30 to-transparent text-white"
                          : "text-mist/80 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {link.label}
                      <LuArrowUpRight
                        className={cn(
                          "size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          active ? "text-brand-bright" : "text-muted",
                        )}
                        aria-hidden
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="relative flex flex-col gap-3 border-t border-white/10 p-6">
              <a
                href={`tel:${SITE.hotline.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-body-sm text-sand transition-colors hover:text-white"
              >
                <LuPhone className="size-4 text-brand-bright" aria-hidden />
                {SITE.hotline}
              </a>
              <Button href={ROUTES.pricing} fullWidth onClick={onClose}>
                Join Now
              </Button>
            </div>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
