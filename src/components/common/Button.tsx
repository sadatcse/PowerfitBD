"use client";

import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "../loading/Spinner";

/**
 * The single button primitive for the whole app.
 *
 * Variants map 1:1 to the Figma buttons: solid crimson, outlined white,
 * solid gold (membership CTAs), and the underlined text link used for
 * "VIEW MAP" / "GET DIRECTIONS".
 */

export type ButtonVariant =
  | "primary"
  | "outline"
  | "gold"
  | "ghost"
  | "danger"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-sans text-body-sm font-bold uppercase " +
  "tracking-[0.1em] transition-all duration-200 ease-(--ease-out-expo) " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-hover hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-ink-900 hover:-translate-y-0.5 active:translate-y-0",
  gold: "bg-gold text-ink-900 hover:bg-gold-hover hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "border border-line bg-transparent text-mist hover:border-brand hover:text-white",
  danger: "bg-danger text-white hover:bg-danger/85",
  link: "border-b-2 border-brand pb-1.5 text-brand hover:border-white hover:text-white tracking-normal",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5",
  md: "px-8 py-3",
  lg: "px-10 py-[18px]",
};

/** `link` variant has no box padding — it is underlined text. */
function sizeFor(variant: ButtonVariant, size: ButtonSize): string {
  return variant === "link" ? "" : SIZES[size];
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** Opens in a new tab with the matching rel for safety. */
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      ...rest
    } = props;

    const classes = cn(
      BASE,
      VARIANTS[variant],
      sizeFor(variant, size),
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        {loading ? <Spinner size="sm" /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </>
    );

    if ("href" in rest && rest.href !== undefined) {
      const { href, external, ...anchorProps } = rest as ButtonAsLink;
      return (
        <Link
          ref={ref}
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...anchorProps}
        >
          {content}
        </Link>
      );
    }

    const buttonProps = rest as ButtonAsButton;
    return (
      <button
        ref={ref}
        type={buttonProps.type ?? "button"}
        className={classes}
        disabled={buttonProps.disabled ?? loading}
        {...buttonProps}
      >
        {content}
      </button>
    );
  },
);
