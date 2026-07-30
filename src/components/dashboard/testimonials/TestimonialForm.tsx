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
import {
  testimonialCreateSchema,
  type TestimonialFormValues,
} from "@/lib/validations/testimonial";
import { type ApiResponse } from "@/types/api";
import { type Testimonial } from "@/types/testimonial";

const RATING_OPTIONS = [1, 2, 3, 4, 5].map((value) => ({
  label: `${value} Star${value === 1 ? "" : "s"}`,
  value: String(value),
}));

interface TestimonialFormProps {
  mode: "create" | "edit";
  testimonialId?: string;
  initialValues?: Testimonial;
}

const DEFAULTS: TestimonialFormValues = {
  clientName: "",
  company: "",
  designation: "",
  review: "",
  rating: 5,
  image: "",
  displayOrder: 0,
  status: "active",
};

/** Create/edit form for a Testimonial — shared by both dashboard routes. */
export function TestimonialForm({
  mode,
  testimonialId,
  initialValues,
}: TestimonialFormProps) {
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialCreateSchema),
    defaultValues: initialValues
      ? {
          clientName: initialValues.clientName,
          company: initialValues.company,
          designation: initialValues.designation,
          review: initialValues.review,
          rating: initialValues.rating,
          image: initialValues.image,
          displayOrder: initialValues.displayOrder,
          status: initialValues.status,
        }
      : DEFAULTS,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        await apiClient.post<ApiResponse<Testimonial>>(
          API_ROUTES.testimonials,
          values,
        );
        toast.success("Testimonial created.");
      } else if (testimonialId) {
        await apiClient.patch<ApiResponse<Testimonial>>(
          API_ROUTES.testimonialById(testimonialId),
          values,
        );
        toast.success("Testimonial updated.");
      }
      router.push(ROUTES.dashboard.testimonials);
      router.refresh();
    } catch (error) {
      toast.apiError(toApiError(error));
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          htmlFor="clientName"
          label="Client Name"
          required
          error={errors.clientName?.message}
        >
          <Input
            id="clientName"
            hasError={Boolean(errors.clientName)}
            {...register("clientName")}
          />
        </FormField>

        <FormField htmlFor="company" label="Company" error={errors.company?.message}>
          <Input
            id="company"
            hasError={Boolean(errors.company)}
            {...register("company")}
          />
        </FormField>
      </div>

      <FormField
        htmlFor="designation"
        label="Designation"
        error={errors.designation?.message}
      >
        <Input
          id="designation"
          placeholder="e.g. Marketing Director"
          hasError={Boolean(errors.designation)}
          {...register("designation")}
        />
      </FormField>

      <FormField htmlFor="review" label="Review" required error={errors.review?.message}>
        <Textarea
          id="review"
          rows={4}
          hasError={Boolean(errors.review)}
          {...register("review")}
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
              folder="testimonials"
              hasError={Boolean(errors.image)}
            />
          )}
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-3">
        <FormField htmlFor="rating" label="Rating" required error={errors.rating?.message}>
          <Select
            id="rating"
            options={RATING_OPTIONS}
            hasError={Boolean(errors.rating)}
            {...register("rating", { valueAsNumber: true })}
          />
        </FormField>

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
          {mode === "create" ? "Create Testimonial" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.push(ROUTES.dashboard.testimonials)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
