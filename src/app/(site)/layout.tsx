import { type Viewport } from "next";
import { type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/**
 * Public site shell. The dashboard lives in its own route group with a
 * different chrome, so header/footer stay scoped to marketing pages.
 * `site-theme` applies the public palette (light, or dark per the system
 * setting) without touching the dashboard.
 */
/** Browser chrome matches the page background in both colour schemes. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#120d1a" },
  ],
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-theme flex min-h-full flex-1 flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
