import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FormFieldProps {
  /** Must match the control's `id` so clicking the label focuses it. */
  htmlFor: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Label + control + message wrapper. Every form control in the app is composed
 * through this so error and hint wiring is identical everywhere.
 */
export function FormField({
  htmlFor,
  label,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="font-sans text-body-xs font-bold tracking-[0.1em] text-mist uppercase"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand" aria-hidden>
            *
          </span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-body-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-body-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Shared control styling so inputs, textareas, and selects stay consistent. */
export const controlClasses = (hasError?: boolean) =>
  cn(
    "w-full border bg-ink-950 px-4 py-3 font-sans text-body text-mist",
    "placeholder:text-muted/70 transition-colors duration-200",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-danger focus:border-danger focus:ring-danger"
      : "border-line focus:border-brand focus:ring-brand",
    "disabled:cursor-not-allowed disabled:opacity-60",
  );
