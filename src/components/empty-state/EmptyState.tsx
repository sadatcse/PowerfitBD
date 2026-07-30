import { type ReactNode } from "react";
import { LuInbox } from "react-icons/lu";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Primary call to action, e.g. an "Add member" button. */
  action?: ReactNode;
  className?: string;
}

/** Shown whenever a collection resolves to zero records. */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 border border-dashed border-line",
        "bg-ink-950/40 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-full bg-line/30 text-2xl text-muted">
        {icon ?? <LuInbox aria-hidden />}
      </span>
      <h3 className="text-display-4 text-white">{title}</h3>
      {description ? (
        <p className="max-w-sm text-body-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
