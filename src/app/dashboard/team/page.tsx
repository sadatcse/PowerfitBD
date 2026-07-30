import { type Metadata } from "next";
import { TeamListView } from "@/components/dashboard/team/TeamListView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  path: "/dashboard/team",
  noIndex: true,
});

export default function DashboardTeamPage() {
  return <TeamListView />;
}
