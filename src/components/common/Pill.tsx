import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface PillProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  tone?: "brand" | "gold";
}

/** Rounded eyebrow badge with a live "pulse" dot, used above section headings. */
export function Pill({ children, icon, className, tone = "brand" }: PillProps) {
  const gold = tone === "gold";
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-body-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md",
        gold
          ? "border-gold/30 bg-gold/10 text-gold"
          : "border-brand-bright/30 bg-brand/10 text-brand-bright",
        className,
      )}
    >
      {icon ?? (
        <span className="relative flex size-2">
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              gold ? "bg-gold" : "bg-brand-bright",
            )}
          />
          <span
            className={cn(
              "relative inline-flex size-2 rounded-full",
              gold ? "bg-gold" : "bg-brand-bright",
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
