"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/forms/Input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { ROUTES } from "@/constants/routes";
import { safeRedirectTarget } from "@/middleware/auth-matcher";
import { toApiError } from "@/lib/api/client";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

/** Dashboard sign-in form. Trades Firebase credentials for our session cookie. */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const toast = useToast();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signIn(values.email, values.password);
      const target = safeRedirectTarget(
        searchParams.get("next"),
        ROUTES.dashboard.root,
      );
      router.push(target);
      router.refresh();
    } catch (error) {
      const apiError = toApiError(error);
      setFormError(apiError.message || "Invalid email or password.");
      toast.error("Sign in failed", apiError.message);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
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
          placeholder="you@powerfit.com.bd"
          hasError={Boolean(errors.email)}
          {...register("email")}
        />
      </FormField>

      <FormField
        htmlFor="password"
        label="Password"
        required
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          hasError={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      {formError ? (
        <p role="alert" className="text-body-sm text-danger">
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" loading={isSubmitting} fullWidth>
        Sign In
      </Button>
    </form>
  );
}
