import Image from "next/image";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";

const TILES = [
  { id: 1, label: "Strength Lab", image: "/images/services/strength-lab.jpg", tall: true },
  { id: 2, label: "Cardio Deck", image: "/images/services/cardio-evolution.jpg", tall: false },
  { id: 3, label: "Group Training", image: "/images/services/group-training.jpg", tall: false },
  { id: 4, label: "Shiya Masjid Branch", image: "/images/branches/shia-masjid.jpg", tall: false },
  { id: 5, label: "Community Floor", image: "/images/about/community.jpg", tall: true },
  { id: 6, label: "Personal Coaching", image: "/images/services/personal-coaching.jpg", tall: false },
  { id: 7, label: "Olympic Weight Room", image: "/images/gallery/facility-2.jpg", tall: false },
  { id: 8, label: "Lalmatia Branch", image: "/images/branches/lalmatia.jpg", tall: true },
  { id: 9, label: "Performance Zone", image: "/images/gallery/facility-5.jpg", tall: false },
] as const;

/** Photography grid for the public Gallery page (Figma 12:1211). */
export function GalleryGrid() {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
      {TILES.map((tile) => (
        <StaggerItem
          key={tile.id}
          className={cn(tile.tall && "sm:row-span-2")}
        >
          <figure
            className={cn(
              "group relative w-full overflow-hidden border border-line",
              tile.tall ? "aspect-3/5 sm:h-full sm:aspect-auto" : "aspect-square",
            )}
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              sizes={IMAGE_SIZES.third}
              className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-body-sm font-bold tracking-[0.05em] text-white uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {tile.label}
            </figcaption>
          </figure>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
