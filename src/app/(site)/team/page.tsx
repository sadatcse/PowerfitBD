import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { PageHeaderBanner } from "@/components/common/PageHeaderBanner";
import { Accent } from "@/components/title/SectionTitle";
import { TeamGrid } from "@/components/sections/team/TeamGrid";
import { teamService } from "@/services/team.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { DEFAULT_TEAM_MEMBERS, sortTeamMembers } from "@/constants/team";
import { type TeamMember } from "@/types/team";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description: `Meet the expert coaching staff behind ${SITE.legalName}.`,
  path: "/team",
});

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const dbMembers = await teamService.listPublic();
    if (dbMembers && dbMembers.length > 0) {
      return sortTeamMembers(dbMembers);
    }
  } catch (error) {
    console.error("[team page] DB load note (using default roster):", error);
  }
  return sortTeamMembers(DEFAULT_TEAM_MEMBERS);
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <PageHeaderBanner
        imageSrc="/images/headers/team.jpg"
        imageAlt="Powerfit expert coaching team"
        eyebrow="The Roster"
        title={
          <>
            Meet Our <Accent>Expert Coaches</Accent>
          </>
        }
        description="Every Multigym Premium coach is chosen for mastery in their discipline — and for the ability to get you there faster."
        align="center"
      />

      <section className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28 lg:py-32">
        <GlowBackdrop className="-z-10" grid variant="corners" />
        <Container flush>
          <TeamGrid members={members} />
        </Container>
      </section>
    </>
  );
}
