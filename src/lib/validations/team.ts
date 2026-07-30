import { z } from "zod";
import {
  displayOrderSchema,
  imageSchema,
  optionalUrlSchema,
  statusSchema,
} from "./common";
import { STATUS } from "@/constants/config";

/** Shared by the dashboard form (via RHF resolver) and the API route. */

export const teamSocialsSchema = z.object({
  facebook: optionalUrlSchema,
  linkedin: optionalUrlSchema,
  instagram: optionalUrlSchema,
  twitter: optionalUrlSchema,
});

export const teamCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  designation: z
    .string()
    .trim()
    .min(2, "Designation must be at least 2 characters.")
    .max(120, "Designation must be 120 characters or fewer."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(2000, "Description must be 2000 characters or fewer."),
  image: imageSchema,
  socials: teamSocialsSchema.optional().default({
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  }),
  displayOrder: displayOrderSchema.optional().default(0),
  status: statusSchema.optional().default(STATUS.active),
});

/** PATCH semantics: every field optional, but at least one must be present. */
export const teamUpdateSchema = teamCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update.",
  });

export type TeamFormValues = z.input<typeof teamCreateSchema>;
export type TeamCreateInput = z.output<typeof teamCreateSchema>;
export type TeamUpdateInput = z.output<typeof teamUpdateSchema>;

/** Sort fields the API will honour — anything else is ignored. */
export const TEAM_SORT_FIELDS = [
  "displayOrder",
  "name",
  "designation",
  "status",
  "createdAt",
  "updatedAt",
] as const;

/** Fields the search box matches against. */
export const TEAM_SEARCH_FIELDS = [
  "name",
  "designation",
  "description",
] as const;
