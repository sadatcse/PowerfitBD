import { z } from "zod";

/** Subjects offered by the "Direct Transmission" select on the Contact page. */
export const CONTACT_SUBJECTS = [
  "Membership Inquiry",
  "Personal Training",
  "Corporate Packages",
  "Facility Tour",
  "Careers",
  "Other",
] as const;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer."),
  subject: z.enum(CONTACT_SUBJECTS, {
    message: "Select a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
  /** Honeypot — real users never fill this; bots usually do. */
  website: z.string().max(0, "Submission rejected.").optional().default(""),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactInput = z.output<typeof contactSchema>;
