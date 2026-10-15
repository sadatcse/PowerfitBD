import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = buildMetadata({
  title: "Sign In | Powerfit Portal",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full bg-[#050914] text-mist overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-bright/10 blur-[180px]" />

      <div className="relative z-10 grid min-h-screen w-full lg:grid-cols-12">
        {/* Left Panel - Hero Showcase (Hidden on smaller mobile screens, full display on lg+) */}
        <div className="relative hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-12 overflow-hidden border-r border-line/40">
          {/* Background Gym Hero Image with Gradient Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home/hero.jpg"
              alt="Powerfit Multi Gym Facility"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/75 to-[#050914]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050914]/30 to-[#050914]" />
          </div>

          {/* Clean Photo Showcase - No overlay text */}
        </div>

        {/* Right Panel - Login Card Form Container */}
        <div className="flex lg:col-span-6 xl:col-span-5 flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            {/* Header Logo */}
            <div className="flex flex-col items-center gap-3 mb-8">
              {/* Logo is itself a home link — wrapping it in another <Link> nests <a> tags. */}
              <Logo
                showWordmark
                tone="gold"
                className="transition-transform hover:scale-105"
              />
            </div>

            {/* Glassmorphic Portal Card */}
            <div className="relative rounded-3xl border border-line/80 bg-ink-900/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-brand/10 transition-all duration-300">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-gold via-brand-bright to-gold" />

              <div className="mb-8">
                <div className="inline-block rounded-md bg-gold/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-gold mb-3 border border-gold/20">
                  Staff Authentication
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white font-display tracking-wide">
                  Welcome Back
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-sand/80">
                  Please enter your authorized staff credentials to enter the dashboard.
                </p>
              </div>

              <Suspense fallback={<div className="h-64 flex items-center justify-center text-xs text-muted">Loading Portal...</div>}>
                <LoginForm />
              </Suspense>
            </div>

            {/* Footer Back Link */}
            <div className="mt-8 text-center">
              <Link
                href={ROUTES.home}
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-gold transition-colors duration-200 group"
              >
                <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Powerfit Main Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

