"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type PointerEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Renders a light glare that follows the pointer across the surface. */
  glare?: boolean;
  /** Lifts the card toward the viewer while hovered. */
  lift?: number;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Perspective-tilt surface. Rotates toward the pointer and catches a moving
 * highlight, so flat cards read as physical panels. Touch devices and
 * reduced-motion users get a static card — tilt only runs on fine pointers.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  glare = true,
  lift = 24,
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const z = useSpring(useTransform(hover, [0, 1], [0, lift]), SPRING);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareOpacity = useSpring(hover, SPRING);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.18), transparent 55%)`;

  if (reduceMotion) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const onEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") hover.set(1);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <div className="h-full [perspective:1100px]">
      <motion.div
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }}
        className={cn("relative h-full will-change-transform", className)}
      >
        {children}
        {glare ? (
          <motion.div
            aria-hidden
            style={{ background: glareBg, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-soft-light"
          />
        ) : null}
      </motion.div>
    </div>
  );
}

/**
 * Child layer that floats above a `TiltCard` surface, producing parallax
 * between content and background as the card rotates.
 */
export function TiltLayer({
  children,
  depth = 40,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
