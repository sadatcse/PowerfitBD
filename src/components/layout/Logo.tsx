import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { cn } from "@/utils/cn";

interface LogoProps {
  /** Several Figma screens pair the mark with a wordmark; some show the mark alone. */
  showWordmark?: boolean;
  /** The wordmark appears in gold on Pricing/Gallery and white elsewhere. */
  tone?: "white" | "gold";
  className?: string;
}

/**
 * Brand lockup. Asset geometry is preserved from Figma: a 49.73 × 48 mark
 * (~1.036 aspect) rendered inside a 48px-tall box.
 */
export function Logo({
  showWordmark = true,
  tone = "white",
  className,
}: LogoProps) {
  return (
    <Link
      href={ROUTES.home}
      aria-label={`${SITE.legalName} — home`}
      className={cn("flex items-center gap-3", className)}
    >
      <Image
        src="/images/brand/powerfit-logo.png"
        alt=""
        width={50}
        height={48}
        priority
        className="h-10 w-[41.5px] shrink-0 object-contain lg:h-12 lg:w-[49.73px]"
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-[1.5rem] leading-none tracking-[0.03em] uppercase",
            tone === "gold" ? "text-gold" : "text-white",
          )}
        >
          {SITE.name}
        </span>
      ) : null}
    </Link>
  );
}
