"use client";

import { useCallback, useState } from "react";

/**
 * Open/close state for a modal, optionally carrying the record being acted on
 * so callers don't need a second `useState` for the payload.
 */
export function useModal<T = undefined>() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<T | undefined>(undefined);

  const openModal = useCallback((value?: T) => {
    setPayload(value);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    // Payload is kept until the exit animation finishes to avoid content flash.
    setTimeout(() => setPayload(undefined), 200);
  }, []);

  const toggle = useCallback(() => setOpen((value) => !value), []);

  return { open, payload, openModal, closeModal, toggle };
}
