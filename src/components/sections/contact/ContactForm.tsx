"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { useToast } from "@/hooks/useToast";
import { apiClient, toApiError } from "@/lib/api/client";
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { API_ROUTES } from "@/constants/routes";
import { type ApiResponse } from "@/types/api";

const SUBJECT_OPTIONS = CONTACT_SUBJECTS.map((subject) => ({
  label: subject,
  value: subject,
}));

/**
 * "Direct Transmission" contact form (Figma 12:827). Posts to `/api/contact`,
 * which validates, sanitises, and rate-limits the submission server-side.
 */
export function ContactForm() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data } = await apiClient.post<ApiResponse<{ received: boolean }>>(
        API_ROUTES.contact,
        values,
      );
      toast.success(data.message);
      reset();
    } catch (error) {
      toast.apiError(toApiError(error));
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          htmlFor="fullName"
          label="Full Name"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Jonathan Vane"
            hasError={Boolean(errors.fullName)}
            {...register("fullName")}
          />
        </FormField>

        <FormField
          htmlFor="email"
          label="Email Address"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            hasError={Boolean(errors.email)}
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField
        htmlFor="subject"
        label="Subject"
        required
        error={errors.subject?.message}
      >
        <Select
          id="subject"
          options={SUBJECT_OPTIONS}
          placeholder="Select a subject"
          hasError={Boolean(errors.subject)}
          defaultValue=""
          {...register("subject")}
        />
      </FormField>

      <FormField
        htmlFor="message"
        label="Message"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={6}
          placeholder="Tell us what you're looking for…"
          hasError={Boolean(errors.message)}
          {...register("message")}
        />
      </FormField>

      {/* Honeypot — hidden from sighted users, real form controls trap bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button type="submit" size="lg" loading={isSubmitting} className="self-start">
        Send Transmission
      </Button>
    </form>
  );
}
