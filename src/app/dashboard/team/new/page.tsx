import { type Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TeamForm } from "@/components/dashboard/team/TeamForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Add Team Member",
  path: "/dashboard/team/new",
  noIndex: true,
});

export default function NewTeamMemberPage() {
  return (
    <>
      <PageHeader
        title="Add Team Member"
        description="This coach or staff member will appear on the public Team page once saved."
      />
      <TeamForm mode="create" />
    </>
  );
}
