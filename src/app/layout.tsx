import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat, Oswald } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import { getCurrentUser } from "@/lib/auth/guard";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";
import "./globals.css";

/**
 * Fonts are self-hosted by `next/font`, which removes the render-blocking
 * Google Fonts request and eliminates layout shift via `size-adjust`.
 */
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Navbar-only typeface — condensed and athletic, distinct from body copy. */
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata({
    title: `${SITE.legalName} — Premier Athletics Performance`,
    path: "/",
    keywords: [
      "gym in Dhaka",
      "premium fitness Dhaka",
      "Multi Gym Premium Powerfit",
      "personal training Dhaka",
      "ladies gym Dhaka",
    ],
  }),
  icons: {
    icon: "/images/brand/powerfit-logo.png",
    apple: "/images/brand/powerfit-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Hydrating the provider with the server session avoids an auth flash.
  const user = await getCurrentUser().catch(() => null);

  return (
    <html
      lang="en"
      className={`${bebas.variable} ${montserrat.variable} ${oswald.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-ink-900">
        <AppProviders initialUser={user}>{children}</AppProviders>
      </body>
    </html>
  );
}
