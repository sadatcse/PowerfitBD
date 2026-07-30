import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { controlClasses } from "./FormField";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, hasError, id, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        className={cn(controlClasses(hasError), "resize-y", className)}
        {...props}
      />
    );
  },
);
