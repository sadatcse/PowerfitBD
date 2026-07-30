import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { getCurrentUser } from "@/lib/auth/guard";
import { buildMetadata } from "@/lib/seo/metadata";
import { BRANCHES, OPERATING_HOURS, SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = buildMetadata({
  title: "Settings",
  path: "/dashboard/settings",
  noIndex: true,
});

const ROLE_PERMISSIONS: Record<string, string> = {
  admin: "Full access — create, edit, and delete Team members and Testimonials.",
  editor: "Can create and edit Team members and Testimonials, but not delete them.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.auth.login);

  return (
    <>
      <PageHeader
        title="Settings"
        description="Site configuration and your account's permissions."
      />

      <div className="grid max-w-3xl gap-6">
        <section className="border border-line bg-ink-950 p-8">
          <h2 className="text-display-4 text-white">Your Permissions</h2>
          <p className="mt-2 text-body-sm text-sand">
            {ROLE_PERMISSIONS[user.role] ?? "Standard dashboard access."}
          </p>
        </section>

        <section className="border border-line bg-ink-950 p-8">
          <h2 className="text-display-4 text-white">Site Information</h2>
          <p className="mt-1 text-body-xs text-muted">
            Configured in <code className="text-mist">src/constants/site.ts</code>
            . Editing that file updates the public site everywhere it&apos;s
            referenced.
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
                Legal Name
              </dt>
              <dd className="mt-1 text-body-sm text-sand">{SITE.legalName}</dd>
            </div>
            <div>
              <dt className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
                Hotline
              </dt>
              <dd className="mt-1 text-body-sm text-sand">{SITE.hotline}</dd>
            </div>
            <div>
              <dt className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
                Email
              </dt>
              <dd className="mt-1 text-body-sm text-sand">{SITE.email}</dd>
            </div>
            <div>
              <dt className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
                Admission Fee
              </dt>
              <dd className="mt-1 text-body-sm text-sand">
                ৳{SITE.admissionFee.toLocaleString("en-US")}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-line pt-6">
            <p className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
              Operating Hours
            </p>
            <dl className="mt-2 flex flex-col gap-1">
              {OPERATING_HOURS.map((entry) => (
                <div key={entry.days} className="flex gap-2 text-body-sm">
                  <dt className="text-sand">{entry.days}:</dt>
                  <dd className="font-bold text-white">{entry.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <p className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
              Locations
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {BRANCHES.map((branch) => (
                <li key={branch.id} className="text-body-sm text-sand">
                  {branch.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
