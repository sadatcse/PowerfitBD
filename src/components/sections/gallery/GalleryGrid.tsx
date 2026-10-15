"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX, LuZoomIn } from "react-icons/lu";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { ImageWithSkeleton } from "@/components/common/ImageWithSkeleton";
import { TiltCard } from "@/components/three/TiltCard";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";
import { GALLERY_IMAGES } from "@/constants/site";

/** Repeating aspect rhythm that gives the masonry columns visual variety. */
const ASPECTS = ["aspect-3/4", "aspect-square", "aspect-4/5", "aspect-4/3", "aspect-3/4", "aspect-square"];

const altFor = (index: number) => `Powerfit gallery photo ${index + 1}`;

/** Masonry photo wall with a full-screen, keyboard-driven 3D lightbox. */
export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const total = GALLERY_IMAGES.length;

  const step = useCallback(
    (delta: number) => {
      setDirection(delta);
      setActive((current) =>
        current === null ? current : (current + delta + total) % total,
      );
    },
    [total],
  );

  useEffect(() => {
    if (active === null) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, step]);

  return (
    <>
      <StaggerGroup className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4" stagger={0.04}>
        {GALLERY_IMAGES.map((image, index) => (
          <StaggerItem key={image} className="mb-4 break-inside-avoid sm:mb-5">
            <TiltCard max={9} lift={16} className="rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setDirection(1);
                  setActive(index);
                }}
                aria-label={`Open photo ${index + 1} of ${total}`}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl border border-white/10",
                  ASPECTS[index % ASPECTS.length],
                )}
              >
                <ImageWithSkeleton
                  src={image}
                  alt={altFor(index)}
                  fill
                  priority={index < 8}
                  sizes={IMAGE_SIZES.quarter}
                  className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-110"
                  wrapperClassName="h-full w-full"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 flex items-end justify-between bg-linear-to-t from-wine/85 via-wine/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span className="font-display text-[1.5rem] leading-none text-snow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-brand-bright text-snow">
                    <LuZoomIn className="size-4" />
                  </span>
                </span>
              </button>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${active + 1} of ${total}`}
            className="fixed inset-0 z-100 flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="relative h-[78vh] w-full max-w-6xl [perspective:1600px]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, rotateY: d * 35, x: d * 120, scale: 0.9 }),
                    center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
                    exit: (d: number) => ({ opacity: 0, rotateY: d * -35, x: d * -120, scale: 0.9 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Image
                    src={GALLERY_IMAGES[active] ?? ""}
                    alt={altFor(active)}
                    fill
                    sizes="100vw"
                    className="rounded-2xl object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="glass absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full text-snow transition-colors hover:bg-brand hover:text-snow sm:left-6"
            >
              <LuChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="glass absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full text-snow transition-colors hover:bg-brand hover:text-snow sm:right-6"
            >
              <LuChevronRight className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
              className="glass absolute top-4 right-4 grid size-12 place-items-center rounded-full text-snow transition-colors hover:bg-brand hover:text-snow sm:top-6 sm:right-6"
            >
              <LuX className="size-5" aria-hidden />
            </button>
            <p className="glass absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 font-display text-[1.25rem] tracking-[0.1em] text-white">
              {String(active + 1).padStart(2, "0")}
              <span className="text-muted"> / {total}</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
