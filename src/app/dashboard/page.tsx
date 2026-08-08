import { type Metadata } from "next";
import Link from "next/link";
import {
  LuArrowRight,
  LuMail,
  LuMessageSquareQuote,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/dashboard/StatTile";
import { getCurrentUser } from "@/lib/auth/guard";
import { teamService } from "@/services/team.service";
import { testimonialService } from "@/services/testimonial.service";
import { contactService } from "@/services/contact.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardOverviewPage() {
  const [user, team, testimonials, contact] = await Promise.all([
    getCurrentUser(),
    teamService.counts(),
    testimonialService.counts(),
    contactService.counts(),
  ]);

  return (
    <>
      <PageHeader
        title={`Welcome back${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        description="Here's what's happening live across your Powerfit database and content."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Team Members"
          value={team.total}
          icon={LuUsers}
          tone="brand"
        />
        <StatTile
          label="Active Staff"
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
          label="Enquiries"
          value={contact.total}
          icon={LuMail}
          tone="brand"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Link
          href={ROUTES.dashboard.team}
          className="group flex flex-col justify-between border border-line bg-ink-950 p-6 transition-all hover:border-brand hover:bg-ink-900"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="rounded-md bg-brand/10 p-2 text-brand">
                <LuUsers className="size-5" />
              </span>
              <LuArrowRight
                className="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand"
                aria-hidden
              />
            </div>
            <h2 className="text-display-4 text-white">Manage Team</h2>
            <p className="mt-2 text-body-sm text-muted">
              Add, edit, or remove coaches and trainers shown on the public Team page with AWS S3 images.
            </p>
          </div>
          <span className="mt-6 text-xs font-bold uppercase tracking-wider text-brand">View Team &rarr;</span>
        </Link>

        <Link
          href={ROUTES.dashboard.testimonials}
          className="group flex flex-col justify-between border border-line bg-ink-950 p-6 transition-all hover:border-brand hover:bg-ink-900"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="rounded-md bg-gold/10 p-2 text-gold">
                <LuMessageSquareQuote className="size-5" />
              </span>
              <LuArrowRight
                className="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold"
                aria-hidden
              />
            </div>
            <h2 className="text-display-4 text-white">Manage Testimonials</h2>
            <p className="mt-2 text-body-sm text-muted">
              Curate client reviews, ratings, and avatars visible across the site.
            </p>
          </div>
          <span className="mt-6 text-xs font-bold uppercase tracking-wider text-gold">View Reviews &rarr;</span>
        </Link>

        <Link
          href={ROUTES.dashboard.contact}
          className="group flex flex-col justify-between border border-line bg-ink-950 p-6 transition-all hover:border-brand hover:bg-ink-900"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="rounded-md bg-emerald-500/10 p-2 text-emerald-400">
                <LuMail className="size-5" />
              </span>
              <LuArrowRight
                className="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-emerald-400"
                aria-hidden
              />
            </div>
            <h2 className="text-display-4 text-white">Contact Enquiries</h2>
            <p className="mt-2 text-body-sm text-muted">
              View and manage incoming user messages submitted through the public website contact form.
            </p>
          </div>
          <span className="mt-6 text-xs font-bold uppercase tracking-wider text-emerald-400">View Enquiries &rarr;</span>
        </Link>
      </div>
    </>
  );
}
