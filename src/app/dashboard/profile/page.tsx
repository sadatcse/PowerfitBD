import { type Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Badge } from "@/components/common/Badge";
import { getCurrentUser } from "@/lib/auth/guard";
import { buildMetadata } from "@/lib/seo/metadata";
import { getInitials } from "@/utils/format";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = buildMetadata({
  title: "Profile",
  path: "/dashboard/profile",
  noIndex: true,
});

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.auth.login);

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your Powerfit dashboard account details."
      />

      <div className="max-w-2xl border border-line bg-ink-950 p-8">
        <div className="flex items-center gap-5">
          {user.picture ? (
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-line">
              <Image src={user.picture} alt="" fill sizes="64px" className="object-cover" />
            </div>
          ) : (
            <div className="grid size-16 shrink-0 place-items-center rounded-full border border-brand/40 bg-brand/10 font-display text-display-4 text-brand">
              {getInitials(user.name ?? user.email)}
            </div>
          )}
          <div>
            <h2 className="text-display-4 text-white">
              {user.name ?? "Powerfit Staff"}
            </h2>
            <p className="text-body-sm text-muted">{user.email}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
              Role
            </dt>
            <dd className="mt-1.5">
              <Badge tone={user.role === "admin" ? "brand" : "neutral"}>
                {user.role}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-body-xs font-bold tracking-[0.1em] text-muted uppercase">
              Account ID
            </dt>
            <dd className="mt-1.5 font-mono text-body-sm text-sand">{user.uid}</dd>
          </div>
        </dl>

        <p className="mt-6 border-t border-line pt-6 text-body-xs text-muted">
          Name and password are managed through your Firebase sign-in
          provider. Contact an administrator to update your role.
        </p>
      </div>
    </>
  );
}
