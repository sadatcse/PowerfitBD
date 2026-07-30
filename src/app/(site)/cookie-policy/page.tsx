import { type Metadata } from "next";
import { LegalLayout } from "@/components/sections/legal/LegalLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  path: "/cookie-policy",
  noIndex: true,
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      updated="29 July 2026"
      sections={[
        {
          heading: "What Cookies We Use",
          body: (
            <p>
              Our website uses a strictly necessary session cookie to keep
              dashboard administrators signed in. We do not use third-party
              advertising or tracking cookies.
            </p>
          ),
        },
        {
          heading: "Essential Cookies",
          body: (
            <p>
              The <code className="text-mist">powerfit_session</code> cookie
              is HttpOnly and required for the admin dashboard to function. It
              cannot be disabled without disabling sign-in.
            </p>
          ),
        },
        {
          heading: "Managing Cookies",
          body: (
            <p>
              Since the public site does not set tracking cookies, most
              visitors have nothing to manage. If you sign in to the
              dashboard, clearing your browser cookies will sign you out.
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
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
