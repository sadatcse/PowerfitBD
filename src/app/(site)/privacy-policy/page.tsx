import { type Metadata } from "next";
import { LegalLayout } from "@/components/sections/legal/LegalLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="29 July 2026"
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <p>
              When you join {SITE.legalName}, contact us, or use our website,
              we may collect your name, email address, phone number, and
              billing details necessary to manage your membership and respond
              to your enquiries.
            </p>
          ),
        },
        {
          heading: "How We Use Your Information",
          body: (
            <p>
              We use your information to operate your membership, process
              payments, communicate updates about your account or our
              facilities, and improve the services we offer. We do not sell
              your personal information to third parties.
            </p>
          ),
        },
        {
          heading: "Data Security",
          body: (
            <p>
              Account credentials are never stored in plain text, and all
              administrative access is protected by role-based authentication.
              Payment processing is handled by PCI-compliant third-party
              providers.
            </p>
          ),
        },
        {
          heading: "Your Rights",
          body: (
            <p>
              You may request a copy of the personal data we hold about you,
              ask us to correct inaccurate information, or request deletion of
              your account by contacting {SITE.email}.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand">
                {SITE.email}
              </a>{" "}
              or {SITE.hotline}.
            </p>
          ),
        },
      ]}
    />
  );
}
