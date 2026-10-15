import { LuArrowUpRight, LuClock, LuMail, LuMapPin, LuNavigation, LuPhone } from "react-icons/lu";
import { TiltCard } from "@/components/three/TiltCard";
import { BRANCHES, OPERATING_HOURS, SITE } from "@/constants/site";

const DIRECT = [
  { Icon: LuPhone, label: "Hotline", value: SITE.hotline, href: `tel:${SITE.hotline.replace(/\s/g, "")}` },
  { Icon: LuMail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
] as const;

/** Direct contact tiles, hours, and the branch list beside the form. */
export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {DIRECT.map(({ Icon, label, value, href }) => (
        <TiltCard key={label} max={8} className="rounded-2xl">
          <a
            href={href}
            className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-brand-bright/40"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand to-brand-bright text-white shadow-[0_10px_25px_-8px_rgb(255_45_45/0.8)]">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body-xs font-bold tracking-[0.15em] text-muted uppercase">
                {label}
              </p>
              <p className="truncate text-body-lg font-bold text-white">{value}</p>
            </div>
            <LuArrowUpRight className="size-5 text-muted transition-all group-hover:rotate-45 group-hover:text-brand-bright" aria-hidden />
          </a>
        </TiltCard>
      ))}

      <div className="rounded-2xl border border-gold/30 bg-linear-to-br from-gold/10 to-transparent p-5">
        <p className="flex items-center gap-2 text-body-xs font-bold tracking-[0.15em] text-gold uppercase">
          <LuClock className="size-4" aria-hidden />
          Operating Hours
        </p>
        <dl className="mt-3 flex flex-col gap-2">
          {OPERATING_HOURS.map((entry) => (
            <div key={entry.days} className="flex items-baseline justify-between gap-2">
              <dt className="text-body-sm text-sand">{entry.days}</dt>
              <dd className="font-display text-[1.35rem] leading-none text-white">{entry.time}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="glass flex flex-col gap-1 rounded-2xl p-3">
        <p className="px-3 pt-2 pb-1 text-body-xs font-bold tracking-[0.15em] text-muted uppercase">
          Our Locations
        </p>
        {BRANCHES.map((branch) => (
          <div
            key={branch.id}
            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
          >
            <LuMapPin className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden />
            <div className="min-w-0 flex-1">
              <a
                href={branch.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm font-bold text-white transition-colors hover:text-gold"
              >
                {branch.name}
              </a>
              <p className="mt-0.5 text-body-xs leading-relaxed text-sand/75">{branch.address}</p>
            </div>
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Directions to ${branch.name}`}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 text-mist ring-1 ring-white/10 transition-all hover:bg-brand hover:text-white"
            >
              <LuNavigation className="size-3.5" aria-hidden />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
