import { cn } from "@/utils/cn";

interface GlowBackdropProps {
  className?: string;
  /** Adds the faded hairline grid behind the glow. */
  grid?: boolean;
  /** Which corner pair the light sources sit in. */
  variant?: "corners" | "center" | "left" | "right";
}

const ORBS: Record<NonNullable<GlowBackdropProps["variant"]>, string[]> = {
  corners: [
    "-top-40 -left-32 size-[34rem] bg-brand/20",
    "-right-40 -bottom-48 size-[30rem] bg-gold/10",
  ],
  center: ["top-1/2 left-1/2 size-[40rem] -translate-1/2 bg-brand/15"],
  left: ["top-1/4 -left-48 size-[36rem] bg-brand/20"],
  right: ["top-1/4 -right-48 size-[36rem] bg-brand/15", "bottom-0 right-1/3 size-[20rem] bg-gold/10"],
};

/**
 * Decorative ambient light for section backgrounds. Purely visual — sits
 * behind content and ignores pointer events.
 */
export function GlowBackdrop({
  className,
  grid = false,
  variant = "corners",
}: GlowBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {grid ? <div className="absolute inset-0 bg-grid" /> : null}
      {ORBS[variant].map((orb) => (
        <div
          key={orb}
          className={cn("absolute animate-pulse-glow rounded-full blur-[120px]", orb)}
        />
      ))}
    </div>
  );
}
