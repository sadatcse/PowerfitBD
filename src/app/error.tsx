"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ROUTES } from "@/constants/routes";

/**
 * Root error boundary. Next renders this for any uncaught error in the tree.
 * The raw error is logged but never shown — `digest` is the safe reference a
 * user can quote to support.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[boundary] Unhandled error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-1 items-center bg-ink-900">
      <Container className="py-24 text-center">
        <p className="eyebrow text-brand">Error 500</p>
        <h1 className="mt-4 text-[3.5rem] leading-none text-white lg:text-display-1">
          System Fault
        </h1>
        <p className="mx-auto mt-6 max-w-md text-body-lg text-sand">
          Something went wrong on our end. Our team has been notified — please
          try again.
        </p>
        {error.digest ? (
          <p className="mt-3 text-body-xs tracking-[0.15em] text-muted uppercase">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Try Again
          </Button>
          <Button href={ROUTES.home} size="lg" variant="outline">
            Return Home
          </Button>
        </div>
      </Container>
    </main>
  );
}
