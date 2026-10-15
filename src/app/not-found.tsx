import { type Metadata } from "next";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { ROUTES } from "@/constants/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-1 items-center overflow-hidden bg-ink-950">
      <GlowBackdrop className="-z-10" grid variant="center" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-50%] bottom-0 -z-10 h-1/2"
      >
        <div className="absolute inset-0 perspective-floor animate-grid-flow opacity-40" />
      </div>

      <Container className="py-24 text-center">
        <p className="eyebrow text-brand-bright">Error 404</p>
        <p
          aria-hidden
          className="mt-4 font-display text-[9rem] leading-[0.85] text-gradient sm:text-[14rem]"
        >
          404
        </p>
        <h1 className="text-[2.5rem] leading-none text-white lg:text-display-2">
          Off the Grid
        </h1>
        <p className="mx-auto mt-6 max-w-md text-body-lg text-sand">
          This route does not exist. Head back to base and pick up your training
          where you left off.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href={ROUTES.home} size="lg">
            Return Home
          </Button>
          <Button href={ROUTES.contact} size="lg" variant="outline">
            Contact Support
          </Button>
        </div>
      </Container>
    </main>
  );
}
