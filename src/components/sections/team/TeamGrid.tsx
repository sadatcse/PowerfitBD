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
    <ul className="flex items-center gap-2 pt-1">
      {entries.map((key) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <li key={key}>
            <a
              href={socials[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              className="grid size-8 place-items-center border border-line text-muted transition-colors hover:border-brand hover:text-brand"
            >
              <Icon className="size-3" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Coach/staff grid for the public Team page (Figma 12:690) with skeleton image loading. */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) {
    return (
      <EmptyState
        title="Meet the team, soon"
        description="Our coaching roster is being finalised. Check back shortly, or reach out and we'll introduce you personally."
      />
    );
  }

  return (
    <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <StaggerItem key={member._id}>
          <article className="group flex h-full flex-col border border-line bg-ink-950 transition-colors duration-300 hover:border-brand">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <ImageWithSkeleton
                src={member.image}
                alt={member.name}
                fill
                priority={index < 6}
                sizes={IMAGE_SIZES.third}
                className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                wrapperClassName="h-full w-full"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/10 to-transparent pointer-events-none z-20"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="text-display-4 text-white">{member.name}</h3>
              <p className="eyebrow text-brand">{member.designation}</p>

              <p className="mt-1 text-body-sm text-sand">
                {member.description}
              </p>
              <div className="mt-auto pt-2">
                <SocialRow socials={member.socials} />
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
