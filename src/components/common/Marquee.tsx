import { Fragment, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface MarqueeProps {
  items: readonly ReactNode[];
  className?: string;
  /** Visual separator rendered between items. */
  separator?: ReactNode;
  reverse?: boolean;
}

/**
 * Infinite horizontal ticker. The track is duplicated so the -50% keyframe
 * loops seamlessly; the copy is hidden from assistive tech.
 */
export function Marquee({
  items,
  className,
  separator = <span className="text-brand-bright">✦</span>,
  reverse = false,
}: MarqueeProps) {
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap">{item}</span>
          {separator}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
