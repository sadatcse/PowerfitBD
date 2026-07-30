"use client";

import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "../common/Button";
import { cn } from "@/utils/cn";

interface ErrorStateProps {
  title?: string;
  /** Safe, user-facing message. Never surface raw stack traces here. */
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/** Inline failure panel for a section or table that could not load. */
export function ErrorState({
  title = "Something went wrong",
  message = "We could not load this content. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 border border-danger/30",
        "bg-danger/5 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-full bg-danger/15 text-2xl text-danger">
        <LuTriangleAlert aria-hidden />
      </span>
      <h3 className="text-display-4 text-white">{title}</h3>
      <p className="max-w-sm text-body-sm text-muted">{message}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
