import "server-only";
import Team, { type TeamDocument } from "@/models/Team";
import { TEAM_SEARCH_FIELDS, TEAM_SORT_FIELDS } from "@/lib/validations/team";
import { type TeamMember } from "@/types/team";
import { connectToDatabase } from "@/lib/db/mongoose";
import { DEFAULT_TEAM_MEMBERS } from "@/constants/team";
import { createCrudService } from "./crud.service";

const baseTeamService = createCrudService<TeamDocument, TeamMember>({
  model: Team,
  resourceName: "Team member",
  searchFields: TEAM_SEARCH_FIELDS,
  sortFields: TEAM_SORT_FIELDS,
});

/**
 * Ensures initial default team members are seeded into MongoDB safely
 * with duplicate prevention using atomic upsert.
 */
export async function ensureTeamSeeded() {
  await connectToDatabase();
  const count = await Team.countDocuments();
  if (count === 0) {
    console.warn("[team.service] Auto-seeding default team members into MongoDB database...");
    for (let idx = 0; idx < DEFAULT_TEAM_MEMBERS.length; idx++) {
      const item = DEFAULT_TEAM_MEMBERS[idx];
      if (!item) continue;
      const { _id: _ignore, ...cleanItem } = item;
      await Team.updateOne(
        { name: item.name },
        {
          $setOnInsert: {
            ...cleanItem,
            displayOrder: idx + 1,
            status: "active",
          },
        },
        { upsert: true },
      );
    }
  }
}

export const teamService = {
  ...baseTeamService,

  async list(searchParams: URLSearchParams) {
    await ensureTeamSeeded();
    return baseTeamService.list(searchParams);
  },

  async listPublic(limit = 100) {
    await ensureTeamSeeded();
    return baseTeamService.listPublic(limit);
  },

  async counts() {
    await ensureTeamSeeded();
    return baseTeamService.counts();
  },
};
