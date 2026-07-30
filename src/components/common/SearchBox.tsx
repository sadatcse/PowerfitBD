"use client";

import { LuSearch, LuX } from "react-icons/lu";
import { cn } from "@/utils/cn";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Accessible name — required because the control has no visible label. */
  label?: string;
}

/**
 * Controlled search input. Debouncing is intentionally left to the caller
 * (`useDebounce`) so the field stays responsive while queries lag behind.
 */
export function SearchBox({
  value,
  onChange,
  placeholder = "Search…",
  className,
  label = "Search",
}: SearchBoxProps) {
  return (
    <div className={cn("relative", className)}>
      <LuSearch
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        role="searchbox"
        aria-label={label}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "w-full border border-line bg-ink-950 py-3 pr-10 pl-11 font-sans text-body text-mist",
          "placeholder:text-muted/70 transition-colors",
          "focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none",
          // Chrome renders its own clear affordance; we supply our own.
          "[&::-webkit-search-cancel-button]:appearance-none",
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center text-muted transition-colors hover:text-white"
        >
          <LuX className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
