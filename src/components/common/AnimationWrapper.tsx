"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Scroll-reveal wrapper used by every public section.
 *
 * Honours `prefers-reduced-motion` by collapsing the animation to a no-op
 * rather than removing the element, so layout never shifts.
 */

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

const OFFSET = 28;

function variantsFor(direction: RevealDirection, distance: number): Variants {
  const hidden: Record<RevealDirection, Record<string, number>> = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
    scale: { opacity: 0, scale: 0.94 },
    fade: { opacity: 0 },
  };

  return {
    hidden: hidden[direction],
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };
}

interface AnimationWrapperProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  /** Replays the reveal each time the element re-enters the viewport. */
  repeat?: boolean;
}

export function AnimationWrapper({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = OFFSET,
  className,
  repeat = false,
}: AnimationWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.2, margin: "0px 0px -80px 0px" }}
      variants={variantsFor(direction, distance)}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent for staggered lists. Children must be `StaggerItem` so the
 * `visible` variant cascades.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  /** Allows the group to double as a scroll anchor target. */
  id?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variantsFor(direction, OFFSET)}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
