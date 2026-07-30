import { z } from "zod";
import { STATUS } from "@/constants/config";

/** Building blocks reused across every entity schema. */

export const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid identifier.");

export const statusSchema = z.enum([STATUS.active, STATUS.inactive]);

export const displayOrderSchema = z
  .number()
  .int("Display order must be a whole number.")
  .min(0, "Display order cannot be negative.")
  .max(9999, "Display order is too large.");

/**
 * Optional social/profile URL. Empty strings are allowed so a user can clear
 * the field, and only http(s) is accepted to block `javascript:` payloads.
 */
export const optionalUrlSchema = z
  .string()
  .trim()
  .max(300, "URL is too long.")
  .refine(
    (value) =>
      value === "" || /^https?:\/\/[^\s]+$/i.test(value),
    "Enter a valid URL starting with http:// or https://",
  )
  .optional()
  .default("");

/** Accepts an absolute URL or a root-relative uploaded path. */
export const imageSchema = z
  .string()
  .trim()
  .min(1, "Image is required.")
  .refine(
    (value) => /^https?:\/\//i.test(value) || value.startsWith("/"),
    "Image must be a valid URL or uploaded path.",
  );
