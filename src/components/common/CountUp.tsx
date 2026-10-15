"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Target number, e.g. 5000. */
  to: number;
  /** Appended after the number, e.g. "+" or "K+". */
  suffix?: string;
  /** Divides the displayed value — lets `to={5000} divisor={1000}` read "5". */
  divisor?: number;
  duration?: number;
  className?: string;
}

/** Counts from zero to `to` the first time it scrolls into view. */
export function CountUp({
  to,
  suffix = "",
  divisor = 1,
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration]);

  return (
    <span ref={ref} className={className}>
      {Math.round((reduceMotion ? to : value) / divisor).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
