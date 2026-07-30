import { LuClock, LuMail, LuPhone } from "react-icons/lu";
import { BRANCHES, OPERATING_HOURS, SITE } from "@/constants/site";

const DIRECT = [
  { Icon: LuPhone, label: "Hotline", value: SITE.hotline, href: `tel:${SITE.hotline.replace(/\s/g, "")}` },
  { Icon: LuMail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
] as const;

/** Direct contact details + branch list shown beside the form (Figma 12:827). */
export function ContactInfo() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        {DIRECT.map(({ Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="group flex items-center gap-4 border border-line bg-ink-950 p-5 transition-colors hover:border-brand"
          >
            <span className="grid size-11 shrink-0 place-items-center border border-brand/40 bg-brand/10 text-brand">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-body-xs font-bold tracking-[0.15em] text-muted uppercase">
                {label}
              </p>
              <p className="text-body font-bold text-white transition-colors group-hover:text-brand">
                {value}
              </p>
            </div>
          </a>
        ))}

        <div className="flex items-start gap-4 border border-line bg-ink-950 p-5">
          <span className="grid size-11 shrink-0 place-items-center border border-brand/40 bg-brand/10 text-brand">
            <LuClock className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-body-xs font-bold tracking-[0.15em] text-muted uppercase">
              Operating Hours
            </p>
            <dl className="mt-1 flex flex-col gap-1">
              {OPERATING_HOURS.map((entry) => (
                <div key={entry.days} className="flex items-baseline gap-2">
                  <dt className="text-body-sm text-sand">{entry.days}:</dt>
                  <dd className="text-body-sm font-bold text-white">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-display-4 text-white">Our Locations</h3>
        {BRANCHES.map((branch) => (
          <a
            key={branch.id}
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-l-2 border-line py-1 pl-4 transition-colors hover:border-brand"
          >
            <p className="text-body-sm font-bold text-white">{branch.name}</p>
            <p className="text-body-xs text-sand">{branch.address}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
