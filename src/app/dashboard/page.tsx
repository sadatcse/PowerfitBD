import { type Metadata } from "next";
import Link from "next/link";
import {
  LuArrowRight,
  LuMessageSquareQuote,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/dashboard/StatTile";
import { getCurrentUser } from "@/lib/auth/guard";
import { teamService } from "@/services/team.service";
import { testimonialService } from "@/services/testimonial.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardOverviewPage() {
  const [user, team, testimonials] = await Promise.all([
    getCurrentUser(),
    teamService.counts(),
    testimonialService.counts(),
  ]);

  return (
    <>
      <PageHeader
        title={`Welcome back${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        description="Here's what's happening across the Powerfit content you manage."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Team Members"
          value={team.total}
          icon={LuUsers}
          tone="brand"
        />
        <StatTile
          label="Active Members"
          value={team.active}
          icon={LuUserCheck}
          tone="success"
        />
        <StatTile
          label="Testimonials"
          value={testimonials.total}
          icon={LuMessageSquareQuote}
          tone="gold"
        />
        <StatTile
          label="Active Testimonials"
          value={testimonials.active}
          icon={LuUserCheck}
          tone="success"
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Link
          href={ROUTES.dashboard.team}
          className="group flex items-center justify-between border border-line bg-ink-950 p-6 transition-colors hover:border-brand"
        >
          <div>
            <h2 className="text-display-4 text-white">Manage Team</h2>
            <p className="mt-1 text-body-sm text-muted">
              Add, edit, or reorder coaches and staff shown on the public
              Team page.
            </p>
          </div>
          <LuArrowRight
            className="size-5 shrink-0 text-muted transition-colors group-hover:text-brand"
            aria-hidden
          />
        </Link>

        <Link
          href={ROUTES.dashboard.testimonials}
          className="group flex items-center justify-between border border-line bg-ink-950 p-6 transition-colors hover:border-brand"
        >
          <div>
            <h2 className="text-display-4 text-white">Manage Testimonials</h2>
            <p className="mt-1 text-body-sm text-muted">
              Curate the client reviews and ratings visible across the site.
            </p>
          </div>
          <LuArrowRight
            className="size-5 shrink-0 text-muted transition-colors group-hover:text-brand"
            aria-hidden
          />
        </Link>
      </div>
    </>
  );
}
