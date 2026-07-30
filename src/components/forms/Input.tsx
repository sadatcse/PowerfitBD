import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { controlClasses } from "./FormField";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

/** Uncontrolled-friendly text input — forwards its ref for React Hook Form. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, hasError, id, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={hasError || undefined}
      aria-describedby={hasError && id ? `${id}-error` : undefined}
      className={cn(controlClasses(hasError), className)}
      {...props}
    />
  );
});
