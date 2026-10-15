"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/** Glowing ring shown while three.js loads, or when WebGL is unavailable. */
function SceneFallback() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="relative size-72 sm:size-96">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute inset-8 animate-spin-slow rounded-full border border-dashed border-brand-bright/40" />
        <div className="absolute inset-16 rounded-full border border-gold/30" />
      </div>
    </div>
  );
}

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

/**
 * Client-only wrapper so three.js never ships in the server bundle and never
 * blocks first paint. Falls back to a CSS glow on devices without WebGL.
 */
export function HeroSceneLazy({ className }: { className?: string }) {
  const [canRender, setCanRender] = useState<boolean | null>(null);

  useEffect(() => {
    // Deferred so the WebGL probe stays out of the hydration pass.
    const id = requestAnimationFrame(() => setCanRender(supportsWebGL()));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={className}>
      {canRender ? (
        <HeroScene className="absolute inset-0" />
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}
