"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { LuX } from "react-icons/lu";
import { Button } from "../common/Button";
import { Logo } from "./Logo";
import { MAIN_NAV } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/** Slide-in navigation drawer for tablet and mobile breakpoints. */
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.nav
            aria-label="Mobile navigation"
            className="absolute inset-y-0 right-0 flex w-[min(22rem,85vw)] flex-col border-l border-line bg-ink-900"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="grid size-9 place-items-center text-muted transition-colors hover:text-white"
              >
                <LuX className="size-5" aria-hidden />
              </button>
            </div>

            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {MAIN_NAV.map((link) => {
                const active =
                  link.href === ROUTES.home
                    ? pathname === link.href
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block border-l-2 px-4 py-3 font-sans text-body-sm font-bold tracking-[0.1em] uppercase transition-colors",
                        active
                          ? "border-brand text-brand"
                          : "border-transparent text-mist hover:border-line hover:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line p-6">
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
