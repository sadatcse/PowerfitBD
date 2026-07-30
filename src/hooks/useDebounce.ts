"use client";

import { useEffect, useState } from "react";
import { DEBOUNCE_MS } from "@/constants/config";

/**
 * Returns `value` only after it has stopped changing for `delay` ms.
 * Used to keep search inputs responsive while throttling network requests.
 */
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
