"use client";

import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { ImageWithSkeleton } from "@/components/common/ImageWithSkeleton";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";
import { GALLERY_IMAGES } from "@/constants/site";

/** Photography grid for the public Gallery page (Figma 12:1211) with skeleton image loading. */
export function GalleryGrid() {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
      {GALLERY_IMAGES.map((image, index) => {
        const tall = index % 5 === 0;

        return (
          <StaggerItem key={image} className={cn(tall && "sm:row-span-2")}>
            <figure
              className={cn(
                "group relative w-full overflow-hidden border border-line",
                tall ? "aspect-3/5 sm:h-full sm:aspect-auto" : "aspect-square",
              )}
            >
              <ImageWithSkeleton
                src={image}
                alt={`Powerfit gallery photo ${index + 1}`}
                fill
                priority={index < 6}
                sizes={IMAGE_SIZES.third}
                className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                wrapperClassName="h-full w-full"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-20"
              />
            </figure>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
