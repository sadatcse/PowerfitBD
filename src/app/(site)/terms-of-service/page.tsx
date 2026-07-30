import { type Metadata } from "next";
import { LegalLayout } from "@/components/sections/legal/LegalLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  path: "/terms-of-service",
  noIndex: true,
});

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="29 July 2026"
      sections={[
        {
          heading: "Membership",
          body: (
            <p>
              Membership with {SITE.legalName} is billed monthly and grants
              access to the facilities and hours described in your plan. A
              one-time admission fee applies to new memberships. Plans may be
              changed or cancelled at any time from your account.
            </p>
          ),
        },
        {
          heading: "Facility Use & Conduct",
          body: (
            <p>
              Members agree to follow posted facility guidelines, staff
              instructions, and equipment safety rules. Powerfit reserves the
              right to suspend membership for conduct that endangers other
              members or staff.
            </p>
          ),
        },
        {
          heading: "Assumption of Risk",
          body: (
            <p>
              Physical exercise carries inherent risk of injury. By using
              Powerfit facilities and equipment, you acknowledge this risk and
              agree to train within your own physical limits, seeking staff
              guidance where needed.
            </p>
          ),
        },
        {
          heading: "Payments & Refunds",
          body: (
            <p>
              Membership fees are billed in advance and are non-refundable
              except where required by law. Failed payments may result in
              suspended access until the account is brought current.
            </p>
          ),
        },
        {
          heading: "Changes to These Terms",
          body: (
            <p>
              We may update these terms from time to time. Continued use of
              Powerfit facilities after a change constitutes acceptance of the
              revised terms.
            </p>
          ),
        },
      ]}
    />
  );
}
