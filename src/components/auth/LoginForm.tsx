"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { ROUTES } from "@/constants/routes";
import { safeRedirectTarget } from "@/middleware/auth-matcher";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

/** Parse raw Firebase/API errors into user-friendly smart messages. */
function formatAuthError(error: unknown): string {
  const rawMessage = error instanceof Error ? error.message : String(error);
  
  if (
    rawMessage.includes("auth/invalid-credential") || 
    rawMessage.includes("auth/user-not-found") || 
    rawMessage.includes("auth/wrong-password") || 
    rawMessage.includes("auth/invalid-email")
  ) {
    return "Incorrect email or password. Please verify your staff credentials and try again.";
  }

  if (rawMessage.includes("auth/too-many-requests")) {
    return "Access temporarily blocked due to multiple failed attempts. Please try again in a few minutes.";
  }

  if (rawMessage.includes("auth/user-disabled")) {
    return "This staff account has been disabled. Please contact your Powerfit administrator.";
  }

  if (rawMessage.includes("auth/network-request-failed")) {
    return "Network connection error. Please check your internet connection and try again.";
  }

  if (rawMessage.startsWith("Firebase:")) {
    return "Invalid staff credentials provided. Please double-check your email and password.";
  }

  return rawMessage || "Invalid email or password.";
}

/** Dashboard sign-in form. Trades Firebase credentials for our session cookie. */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const toast = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
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
      const smartMessage = formatAuthError(error);
      setFormError(smartMessage);
      
      // Highlight both input fields on invalid credentials
      setError("email", {
        type: "manual",
        message: "Verify email address",
      });
      setError("password", {
        type: "manual",
        message: "Verify password",
      });

      toast.error("Sign in failed", smartMessage);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Email Field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sand/90"
        >
          <span>Email Address <span className="text-brand-bright">*</span></span>
        </label>
        <div className="relative flex items-center">
          <HiEnvelope className="absolute left-3.5 text-muted text-lg pointer-events-none transition-colors group-focus-within:text-gold" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@powerfit.com.bd"
            aria-invalid={Boolean(errors.email)}
            className={`w-full rounded-xl bg-ink-950/80 border pl-11 pr-10 py-3.5 text-sm text-mist placeholder:text-muted/60 transition-all duration-200 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-danger focus:border-danger focus:ring-danger/30"
                : "border-line/70 focus:border-gold/80 focus:ring-gold/20 hover:border-line"
            }`}
            {...register("email")}
          />
        </div>
        {errors.email?.message ? (
          <p id="email-error" role="alert" className="text-xs text-danger flex items-center gap-1 mt-0.5">
            <HiExclamationTriangle className="shrink-0" />
            {errors.email.message}
          </p>
        ) : null}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sand/90">
          <span>Password <span className="text-brand-bright">*</span></span>
        </div>
        <div className="relative flex items-center">
          <HiLockClosed className="absolute left-3.5 text-muted text-lg pointer-events-none" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••••••"
            aria-invalid={Boolean(errors.password)}
            className={`w-full rounded-xl bg-ink-950/80 border pl-11 pr-11 py-3.5 text-sm text-mist placeholder:text-muted/60 transition-all duration-200 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-danger focus:border-danger focus:ring-danger/30"
                : "border-line/70 focus:border-gold/80 focus:ring-gold/20 hover:border-line"
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-muted hover:text-mist focus:outline-none p-1 rounded-md transition-colors"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <HiEyeSlash className="text-lg" /> : <HiEye className="text-lg" />}
          </button>
        </div>
        {errors.password?.message ? (
          <p id="password-error" role="alert" className="text-xs text-danger flex items-center gap-1 mt-0.5">
            <HiExclamationTriangle className="shrink-0" />
            {errors.password.message}
          </p>
        ) : null}
      </div>

      {/* Remember Me & Options */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-sand select-none group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-line bg-ink-950 text-gold focus:ring-gold/30 accent-brand cursor-pointer"
          />
          <span className="group-hover:text-mist transition-colors">Keep me signed in</span>
        </label>
      </div>

      {/* Form Error Alert */}
      {formError ? (
        <div role="alert" className="rounded-xl bg-danger/10 border border-danger/30 p-3.5 text-xs text-danger flex items-start gap-2.5 animate-fadeIn">
          <HiExclamationTriangle className="text-base shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{formError}</div>
        </div>
      ) : null}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        fullWidth
        rightIcon={<HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />}
        className="mt-2 rounded-xl bg-gradient-to-r from-brand via-brand to-brand-bright hover:from-brand-bright hover:to-gold hover:text-ink-950 font-bold tracking-wider shadow-lg shadow-brand/25 hover:shadow-gold/25 transition-all duration-300 py-4"
      >
        Access Staff Dashboard
      </Button>
    </form>
  );
}

