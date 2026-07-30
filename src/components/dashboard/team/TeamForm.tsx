"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/forms/FormField";
import { ImageUploadField } from "@/components/forms/ImageUploadField";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { useToast } from "@/hooks/useToast";
import { apiClient, toApiError } from "@/lib/api/client";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { STATUS_OPTIONS } from "@/constants/config";
import { teamCreateSchema, type TeamFormValues } from "@/lib/validations/team";
import { type ApiResponse } from "@/types/api";
import { type TeamMember } from "@/types/team";

const SOCIAL_FIELDS = [
  { name: "socials.facebook", label: "Facebook URL" },
  { name: "socials.linkedin", label: "LinkedIn URL" },
  { name: "socials.instagram", label: "Instagram URL" },
  { name: "socials.twitter", label: "Twitter / X URL" },
] as const;

interface TeamFormProps {
  mode: "create" | "edit";
  memberId?: string;
  initialValues?: TeamMember;
}

const DEFAULTS: TeamFormValues = {
  name: "",
  designation: "",
  description: "",
  image: "",
  socials: { facebook: "", linkedin: "", instagram: "", twitter: "" },
  displayOrder: 0,
  status: "active",
};

/** Create/edit form for a Team member — shared by both dashboard routes. */
export function TeamForm({ mode, memberId, initialValues }: TeamFormProps) {
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamCreateSchema),
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          designation: initialValues.designation,
          description: initialValues.description,
          image: initialValues.image,
          socials: {
            facebook: initialValues.socials.facebook ?? "",
            linkedin: initialValues.socials.linkedin ?? "",
            instagram: initialValues.socials.instagram ?? "",
            twitter: initialValues.socials.twitter ?? "",
          },
          displayOrder: initialValues.displayOrder,
          status: initialValues.status,
        }
      : DEFAULTS,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        await apiClient.post<ApiResponse<TeamMember>>(API_ROUTES.team, values);
        toast.success("Team member created.");
      } else if (memberId) {
        await apiClient.patch<ApiResponse<TeamMember>>(
          API_ROUTES.teamById(memberId),
          values,
        );
        toast.success("Team member updated.");
      }
      router.push(ROUTES.dashboard.team);
      router.refresh();
    } catch (error) {
      toast.apiError(toApiError(error));
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField htmlFor="name" label="Full Name" required error={errors.name?.message}>
          <Input id="name" hasError={Boolean(errors.name)} {...register("name")} />
        </FormField>

        <FormField
          htmlFor="designation"
          label="Designation"
          required
          error={errors.designation?.message}
        >
          <Input
            id="designation"
            placeholder="Head Coach"
            hasError={Boolean(errors.designation)}
            {...register("designation")}
          />
        </FormField>
      </div>

      <FormField
        htmlFor="description"
        label="Bio"
        required
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          rows={4}
          hasError={Boolean(errors.description)}
          {...register("description")}
        />
      </FormField>

      <FormField htmlFor="image" label="Photo" required error={errors.image?.message}>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageUploadField
              value={field.value}
              onChange={field.onChange}
              folder="team"
              hasError={Boolean(errors.image)}
            />
          )}
        />
      </FormField>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-body-xs font-bold tracking-[0.1em] text-mist uppercase">
          Social Links (optional)
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {SOCIAL_FIELDS.map((social) => (
            <Input
              key={social.name}
              placeholder={social.label}
              aria-label={social.label}
              {...register(social.name)}
            />
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          htmlFor="displayOrder"
          label="Display Order"
          hint="Lower numbers appear first."
          error={errors.displayOrder?.message}
        >
          <Input
            id="displayOrder"
            type="number"
            min={0}
            hasError={Boolean(errors.displayOrder)}
            {...register("displayOrder", { valueAsNumber: true })}
          />
        </FormField>

        <FormField htmlFor="status" label="Status" error={errors.status?.message}>
          <Select
            id="status"
            options={STATUS_OPTIONS}
            hasError={Boolean(errors.status)}
            {...register("status")}
          />
        </FormField>
      </div>

      <div className="flex gap-4">
        <Button type="submit" size="lg" loading={isSubmitting}>
          {mode === "create" ? "Create Member" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.push(ROUTES.dashboard.team)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
