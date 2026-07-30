"use client";

import { toast } from "sonner";
import { ApiRequestError } from "@/lib/api/client";

/**
 * Thin wrapper over Sonner so notification copy and behaviour stay uniform,
 * and so swapping the toast library later touches one file.
 */
export function useToast() {
  return {
    success: (message: string, description?: string) =>
      toast.success(message, { description }),

    error: (message: string, description?: string) =>
      toast.error(message, { description }),

    info: (message: string, description?: string) =>
      toast(message, { description }),

    loading: (message: string) => toast.loading(message),

    dismiss: (id?: string | number) => toast.dismiss(id),

    promise: <T,>(
      promise: Promise<T>,
      messages: { loading: string; success: string; error: string },
    ) => toast.promise(promise, messages),

    /** Surfaces the server's message for known API failures. */
    apiError: (error: unknown, fallback = "Something went wrong.") => {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : error instanceof Error
            ? error.message
            : fallback;
      toast.error(message);
    },
  };
}
