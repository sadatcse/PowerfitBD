import { type Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/title/SectionTitle";
import { ErrorState } from "@/components/empty-state/ErrorState";
import { TeamGrid } from "@/components/sections/team/TeamGrid";
import { teamService } from "@/services/team.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { type TeamMember } from "@/types/team";
import { SITE } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description: `Meet the expert coaching staff behind ${SITE.legalName}.`,
  path: "/team",
});

async function getTeamMembers(): Promise<TeamMember[] | null> {
  try {
    return await teamService.listPublic();
  } catch (error) {
    console.error("[team page] Failed to load team members:", error);
    return null;
  }
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <section className="border-b border-line bg-ink-950 py-16 md:py-24">
        <Container>
          <SectionTitle
            as="h1"
            eyebrow="The Roster"
            title="Meet Our Expert Coaches"
            description="Every Powerfit coach is chosen for mastery in their discipline — and for the ability to get you there faster."
            align="center"
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="bg-ink-900 py-16 md:py-24 lg:py-[7.5rem]">
        <Container>
          {members === null ? (
            <ErrorState message="We could not load the coaching roster. Please refresh the page." />
          ) : (
            <TeamGrid members={members} />
          )}
        </Container>
      </section>
    </>
  );
}
