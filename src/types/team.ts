import { type Status } from "@/constants/config";

/** Social profiles attached to a team member. All optional. */
export interface TeamSocials {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

/** A team member as serialised over the API (never the raw Mongoose doc). */
export interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
  socials: TeamSocials;
  displayOrder: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

/** Fields accepted when creating a member. */
export interface TeamMemberInput {
  name: string;
  designation: string;
  description: string;
  image: string;
  socials?: TeamSocials;
  displayOrder?: number;
  status?: Status;
}

/** Every field is optional on PATCH. */
export type TeamMemberUpdateInput = Partial<TeamMemberInput>;
