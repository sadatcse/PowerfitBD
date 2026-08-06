"use client";

import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper used by every public section.
 *
 * Honours `prefers-reduced-motion` by collapsing the animation to a no-op
 * rather than removing the element, so layout never shifts.
 */

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

const OFFSET = 28;

/**
 * The hidden variant (opacity: 0) is baked into the server-rendered HTML, so
 * content stays invisible until client JS confirms the element is in view.
 * Some mobile browsers — in-app WebViews (Facebook/Instagram) in particular —
 * are known to never fire that IntersectionObserver callback. Without a
 * fallback, affected visitors see a permanently blank section. This timeout
 * forces the reveal regardless, so a flaky observer degrades to "no
 * animation" instead of "invisible content".
 */
const VIEWPORT_FALLBACK_MS = 1200;

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

/** Drives a reveal via real viewport detection, with a forced-visible fallback. */
function useRevealAnimation(
  once: boolean,
  amount: number,
  margin?: UseInViewOptions["margin"],
) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
      return;
    }

    if (!once) {
      void controls.start("hidden");
      return;
    }

    const fallback = setTimeout(() => {
      void controls.start("visible");
    }, VIEWPORT_FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [inView, once, controls]);

  return { ref, controls };
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
  const { ref, controls } = useRevealAnimation(!repeat, 0.2, "0px 0px -80px 0px");

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
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
  const { ref, controls } = useRevealAnimation(true, 0.15);

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={controls}
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
