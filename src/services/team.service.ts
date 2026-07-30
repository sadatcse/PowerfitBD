import "server-only";
import Team, { type TeamDocument } from "@/models/Team";
import { TEAM_SEARCH_FIELDS, TEAM_SORT_FIELDS } from "@/lib/validations/team";
import { type TeamMember } from "@/types/team";
import { createCrudService } from "./crud.service";

export const teamService = createCrudService<TeamDocument, TeamMember>({
  model: Team,
  resourceName: "Team member",
  searchFields: TEAM_SEARCH_FIELDS,
  sortFields: TEAM_SORT_FIELDS,
});
