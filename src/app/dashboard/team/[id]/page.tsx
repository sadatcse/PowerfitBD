import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TeamForm } from "@/components/dashboard/team/TeamForm";
import { teamService } from "@/services/team.service";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Edit Team Member",
  path: "/dashboard/team",
  noIndex: true,
});

type RouteParams = { params: Promise<{ id: string }> };

export default async function EditTeamMemberPage({ params }: RouteParams) {
  const { id } = await params;

  const member = await teamService.getById(id).catch(() => null);
  if (!member) notFound();

  return (
    <>
      <PageHeader
        title={`Edit ${member.name}`}
        description="Update this team member's details."
      />
      <TeamForm mode="edit" memberId={id} initialValues={member} />
    </>
  );
}
