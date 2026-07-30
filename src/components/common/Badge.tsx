import { type ReactNode } from "react";
import { STATUS, type Status } from "@/constants/config";
import { cn } from "@/utils/cn";

export type BadgeTone =
  | "brand"
  | "gold"
  | "neutral"
  | "success"
  | "warning"
  | "danger";

const TONES: Record<BadgeTone, string> = {
  brand: "bg-brand/15 text-brand ring-brand/30",
  gold: "bg-gold/15 text-gold ring-gold/30",
  neutral: "bg-line/40 text-muted ring-line",
  success: "bg-success/15 text-success ring-success/30",
  warning: "bg-warning/15 text-warning ring-warning/30",
  danger: "bg-danger/15 text-danger ring-danger/30",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 font-sans text-body-xs font-bold",
        "tracking-[0.1em] uppercase ring-1 ring-inset",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status pill shared by both dashboard tables. */
export function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const isActive = status === STATUS.active;
  return (
    <Badge tone={isActive ? "success" : "neutral"} className={className}>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          isActive ? "bg-success" : "bg-muted",
        )}
      />
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
