import { type ReactNode } from "react";
import { Pill } from "@/components/common/Pill";
import { cn } from "@/utils/cn";

interface SectionTitleProps {
  /** Small tracked label above the heading, e.g. "THE VISIONARY". */
  eyebrow?: string;
  /** Optional icon inside the eyebrow pill; defaults to a pulsing dot. */
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Centred headings are used on Team, Contact, and Equipment. */
  align?: "left" | "center";
  /** The short gradient rule under the heading. */
  withRule?: boolean;
  className?: string;
  /** Heading level — keeps one `h1` per page for accessibility and SEO. */
  as?: "h1" | "h2" | "h3";
}

/**
 * The recurring section heading block: pill eyebrow, Bebas display heading,
 * optional gradient rule, and supporting copy. Wrap a word of the title in
 * `<Accent>` to give it the brand gradient.
 */
export function SectionTitle({
  eyebrow,
  eyebrowIcon,
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
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Pill icon={eyebrowIcon}>{eyebrow}</Pill> : null}

      <Heading
        className={cn(
          "text-balance-pretty text-gradient-silver",
          Heading === "h1"
            ? "text-[3rem] leading-[0.98] tracking-[0.02em] sm:text-7xl lg:text-[6rem]"
            : "text-[2.25rem] leading-[1.02] tracking-[0.03em] sm:text-5xl lg:text-[4rem]",
        )}
      >
        {title}
      </Heading>

      {withRule ? (
        <span
          aria-hidden
          className={cn(
            "block h-1 w-20 rounded-full bg-linear-to-r from-brand-bright to-gold",
            centered && "mx-auto",
          )}
        />
      ) : null}

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-body-lg text-sand/90 text-balance-pretty",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Gradient-highlighted word(s) inside a heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}
