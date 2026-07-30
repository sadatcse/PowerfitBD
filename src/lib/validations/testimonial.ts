import { z } from "zod";
import { displayOrderSchema, imageSchema, statusSchema } from "./common";
import { RATING, STATUS } from "@/constants/config";

export const testimonialCreateSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters.")
    .max(80, "Client name must be 80 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(120, "Company must be 120 characters or fewer.")
    .optional()
    .default(""),
  designation: z
    .string()
    .trim()
    .max(120, "Designation must be 120 characters or fewer.")
    .optional()
    .default(""),
  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters.")
    .max(1500, "Review must be 1500 characters or fewer."),
  rating: z.coerce
    .number()
    .int("Rating must be a whole number.")
    .min(RATING.min, `Rating must be at least ${RATING.min}.`)
    .max(RATING.max, `Rating must be at most ${RATING.max}.`),
  image: imageSchema,
  displayOrder: displayOrderSchema.optional().default(0),
  status: statusSchema.optional().default(STATUS.active),
});

export const testimonialUpdateSchema = testimonialCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update.",
  });

export type TestimonialFormValues = z.input<typeof testimonialCreateSchema>;
export type TestimonialCreateInput = z.output<typeof testimonialCreateSchema>;
export type TestimonialUpdateInput = z.output<typeof testimonialUpdateSchema>;

export const TESTIMONIAL_SORT_FIELDS = [
  "displayOrder",
  "clientName",
  "company",
  "rating",
  "status",
  "createdAt",
  "updatedAt",
] as const;

export const TESTIMONIAL_SEARCH_FIELDS = [
  "clientName",
  "company",
  "designation",
  "review",
] as const;
