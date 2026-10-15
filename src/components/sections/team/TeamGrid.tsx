"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { ImageWithSkeleton } from "@/components/common/ImageWithSkeleton";
import { EmptyState } from "@/components/empty-state/EmptyState";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { IMAGE_SIZES } from "@/utils/image";
import { type TeamMember, type TeamSocials } from "@/types/team";

const SOCIAL_ICONS: Record<keyof TeamSocials, typeof FaFacebookF> = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  twitter: FaXTwitter,
};

function SocialRow({ socials }: { socials: TeamSocials }) {
  const entries = (Object.keys(SOCIAL_ICONS) as (keyof TeamSocials)[]).filter(
    (key) => socials[key],
  );
  if (entries.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((key) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <li key={key}>
            <a
              href={socials[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              className="grid size-9 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-brand-bright hover:bg-brand"
            >
              <Icon className="size-3.5" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Coach roster — full-bleed portraits with 3D tilt and floating name plates. */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) {
    return (
      <EmptyState
        title="Meet the team, soon"
        description="Our coaching roster is being finalised. Check back shortly, or reach out and we'll introduce you personally."
        className="rounded-3xl"
      />
    );
  }

  return (
    <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
      {members.map((member, index) => (
        <StaggerItem key={member._id} className="h-full">
          <TiltCard max={10} className="rounded-[1.75rem]">
            <article className="group preserve-3d relative flex h-full flex-col rounded-[1.75rem]">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900">
                <ImageWithSkeleton
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={index < 6}
                  sizes={IMAGE_SIZES.third}
                  className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-110"
                  wrapperClassName="h-full w-full"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 bg-linear-to-t from-ink-950 via-ink-950/20 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 bg-linear-to-tr from-brand/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <TiltLayer depth={60} className="absolute top-5 right-5 z-30">
                <SocialRow socials={member.socials} />
              </TiltLayer>

              <TiltLayer depth={45} className="absolute inset-x-4 bottom-4 z-30">
                <div className="glass-strong rounded-2xl p-5">
                  <p className="eyebrow text-[0.7rem] text-brand-bright">{member.designation}</p>
                  <h3 className="mt-1 text-[1.75rem] leading-none tracking-[0.03em] text-white">
                    {member.name}
                  </h3>
                  {member.description ? (
                    <p className="mt-2 line-clamp-2 text-body-xs leading-relaxed text-sand/80">
                      {member.description}
                    </p>
                  ) : null}
                </div>
              </TiltLayer>
            </article>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
