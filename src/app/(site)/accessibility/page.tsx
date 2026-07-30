import { type Metadata } from "next";
import { LegalLayout } from "@/components/sections/legal/LegalLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility",
  path: "/accessibility",
  noIndex: true,
});

export default function AccessibilityPage() {
  return (
    <LegalLayout
      title="Accessibility"
      updated="29 July 2026"
      sections={[
        {
          heading: "Our Commitment",
          body: (
            <p>
              {SITE.legalName} is committed to making our website usable by
              everyone, including visitors who rely on assistive technology
              such as screen readers or keyboard-only navigation.
            </p>
          ),
        },
        {
          heading: "What We Do",
          body: (
            <p>
              Our site uses semantic HTML, visible focus states, sufficient
              colour contrast, and honours your device&apos;s reduced-motion
              preference for animations.
            </p>
          ),
        },
        {
          heading: "Facility Accessibility",
          body: (
            <p>
              For questions about physical accessibility at any of our three
              locations — including step-free access and accessible
              parking — please contact a location directly or call our
              hotline.
            </p>
          ),
        },
        {
          heading: "Feedback",
          body: (
            <p>
              If you encounter an accessibility barrier on this site, let us
              know at{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand">
                {SITE.email}
              </a>{" "}
              and we will address it promptly.
            </p>
          ),
        },
      ]}
    />
  );
}
