import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionTitleProps {
  /** Small tracked label above the heading, e.g. "THE VISIONARY". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Centred headings are used on Team, Contact, and Equipment. */
  align?: "left" | "center";
  /** The short crimson rule under centred headings in the design. */
  withRule?: boolean;
  className?: string;
  /** Heading level — keeps one `h1` per page for accessibility and SEO. */
  as?: "h1" | "h2" | "h3";
}

/**
 * The recurring section heading block: eyebrow, Bebas display heading,
 * optional rule, and supporting copy.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  withRule = false,
  className,
  as: Heading = "h2",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="eyebrow text-brand">{eyebrow}</span>
      ) : null}

      <Heading
        className={cn(
          "text-balance-pretty",
          Heading === "h1"
            ? "text-[2.75rem] leading-[1.05] tracking-[0.02em] sm:text-6xl lg:text-display-1"
            : "text-[2rem] leading-[1.1] tracking-[0.03em] sm:text-4xl lg:text-display-2",
        )}
      >
        {title}
      </Heading>

      {withRule ? (
        <span
          aria-hidden
          className={cn("block h-0.5 w-16 bg-brand", centered && "mx-auto")}
        />
      ) : null}

      {description ? (
        <p
          className={cn(
            "max-w-xl text-body-lg text-sand text-balance-pretty",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
