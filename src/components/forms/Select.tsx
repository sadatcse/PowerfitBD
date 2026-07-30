import { forwardRef, type SelectHTMLAttributes } from "react";
import { LuChevronDown } from "react-icons/lu";
import { cn } from "@/utils/cn";
import { controlClasses } from "./FormField";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: readonly SelectOption[];
  hasError?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { className, options, hasError, placeholder, id, ...props },
    ref,
  ) {
    return (
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError && id ? `${id}-error` : undefined}
          className={cn(
            controlClasses(hasError),
            "appearance-none pr-10",
            className,
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <LuChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
        />
      </div>
    );
  },
);
