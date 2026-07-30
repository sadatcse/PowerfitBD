"use client";

import { useCallback, useState } from "react";

/**
 * Tracks a boolean loading flag around an async operation, guaranteeing the
 * flag is cleared even when the operation throws.
 */
export function useLoading(initial = false) {
  const [loading, setLoading] = useState(initial);

  const withLoading = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, setLoading, withLoading };
}
