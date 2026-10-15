import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * The page shell from Figma: a 1200px outer frame with a 40px page gutter and
 * an 80px inner inset, giving a 1040px content column on desktop. The inner
 * inset collapses on small screens so copy is not squeezed.
 */

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Restricted to layout tags — a bare `ElementType` also admits three.js JSX elements. */
  as?: "div" | "section" | "header" | "footer" | "main" | "article" | "nav";
  /** Drops the inner 80px inset for full-bleed rows (e.g. gallery grids). */
  flush?: boolean;
}

export function Container({
  children,
  className,
  as: Tag = "div",
  flush = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-(--container-shell) px-5 sm:px-8 lg:px-10",
        !flush && "lg:[&>*]:mx-auto lg:[&>*]:max-w-(--container-content)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
