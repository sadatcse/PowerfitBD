import { type Metadata } from "next";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ROUTES } from "@/constants/routes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-1 items-center bg-ink-900">
      <Container className="py-24 text-center">
        <p className="eyebrow text-brand">Error 404</p>
        <h1 className="mt-4 text-[3.5rem] leading-none text-white lg:text-display-1">
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
