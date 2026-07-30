"use client";

import { useCallback, useRef, useState } from "react";
import {
  ConfirmDialog,
  type ConfirmDialogProps,
} from "@/components/dialog/ConfirmDialog";

type ConfirmOptions = Pick<
  ConfirmDialogProps,
  "title" | "message" | "confirmLabel" | "cancelLabel" | "tone"
>;

/**
 * Promise-based confirmation:
 *
 *   const { confirm, dialog } = useConfirm();
 *   if (await confirm({ title: "Delete?", message: "…" })) { … }
 *
 * Render `dialog` once in the component tree.
 */
export function useConfirm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "Are you sure?",
    message: "This action cannot be undone.",
  });

  // Held across renders so `confirm()` can settle from the dialog callbacks.
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((next: ConfirmOptions): Promise<boolean> => {
    setOptions(next);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const settle = useCallback((result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setOpen(false);
    setLoading(false);
  }, []);

  const dialog = (
    <ConfirmDialog
      {...options}
      open={open}
      loading={loading}
      onConfirm={() => {
        // Keep the dialog up while the caller's async work runs.
        setLoading(true);
        resolverRef.current?.(true);
        resolverRef.current = null;
      }}
      onCancel={() => settle(false)}
    />
  );

  /** Call once the confirmed action has finished to dismiss the dialog. */
  const close = useCallback(() => {
    setOpen(false);
    setLoading(false);
  }, []);

  return { confirm, dialog, close, loading };
}
