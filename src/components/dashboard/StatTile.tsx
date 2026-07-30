import { type IconType } from "react-icons";
import { cn } from "@/utils/cn";

interface StatTileProps {
  label: string;
  value: number | string;
  icon: IconType;
  tone?: "brand" | "gold" | "success" | "neutral";
}

const TONES: Record<NonNullable<StatTileProps["tone"]>, string> = {
  brand: "border-brand/40 bg-brand/10 text-brand",
  gold: "border-gold/40 bg-gold/10 text-gold",
  success: "border-success/40 bg-success/10 text-success",
  neutral: "border-line bg-line/20 text-muted",
};

/** Dashboard home stat card. */
export function StatTile({ label, value, icon: Icon, tone = "neutral" }: StatTileProps) {
  return (
    <div className="flex items-center gap-4 border border-line bg-ink-950 p-6">
      <span
        className={cn(
          "grid size-12 shrink-0 place-items-center border",
          TONES[tone],
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="font-display text-display-3 text-white">{value}</p>
        <p className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
