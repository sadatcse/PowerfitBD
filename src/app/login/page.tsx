import { type Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = buildMetadata({
  title: "Sign In",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 pb-10">
          <Logo showWordmark tone="gold" />
          <p className="text-body-sm text-muted">Dashboard Sign In</p>
        </div>

        <div className="border border-line bg-ink-900 p-8 sm:p-10">
          <h1 className="text-display-3 text-white">Welcome Back</h1>
          <p className="mt-2 text-body-sm text-sand">
            Sign in with your Powerfit staff credentials to access the
            dashboard.
          </p>

          <div className="mt-8">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <p className="mt-8 text-center text-body-xs text-muted">
          <Link href={ROUTES.home} className="transition-colors hover:text-brand">
            ← Back to the main site
          </Link>
        </p>
      </div>
    </main>
  );
}
