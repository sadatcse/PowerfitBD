import { type Metadata } from "next";
import { SITE } from "@/constants/site";

interface BuildMetadataOptions {
  title: string;
  description?: string;
  /** Path relative to the site root, e.g. "/team". Drives the canonical URL. */
  path?: string;
  image?: string;
  /** Set for pages that must not be indexed (dashboard, login). */
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Builds a complete metadata object — canonical, OpenGraph, and Twitter card —
 * so every page declares SEO consistently.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  image = "/images/og/default.jpg",
  noIndex = false,
  keywords,
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE.url).toString();
  const absoluteImage = new URL(image, SITE.url).toString();
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: "website",
      siteName: SITE.legalName,
      locale: SITE.locale,
      url,
      title: fullTitle,
      description,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
  };
}

/** Organisation + gym JSON-LD injected once on the home page. */
export function buildOrganisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.hotline,
    email: SITE.email,
    image: new URL("/images/og/default.jpg", SITE.url).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: "48/49 (5th & 6th Floors), Ring Road, Adabor, Shyamoli",
      addressLocality: "Dhaka",
      postalCode: "1207",
      addressCountry: "BD",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "07:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "15:30",
        closes: "22:30",
      },
    ],
  };
}
