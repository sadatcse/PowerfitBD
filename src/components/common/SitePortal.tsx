"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

/** The themed site root, so portalled UI keeps the light/dark palette. */
const getTarget = () =>
  document.querySelector<HTMLElement>(".site-theme") ?? document.body;

/**
 * Renders overlays (lightbox, detail modals) at the top of the site tree.
 * Sections use `isolate`, which traps `z-index` inside them — without a
 * portal a full-screen overlay would sit underneath the fixed header.
 */
export function SitePortal({ children }: { children: ReactNode }) {
  // Null on the server; resolves to the DOM node after hydration.
  const target = useSyncExternalStore(noopSubscribe, getTarget, () => null);
  return target ? createPortal(children, target) : null;
}
