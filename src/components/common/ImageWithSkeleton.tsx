"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/loading/Skeleton";
import { cn } from "@/utils/cn";

interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string;
  skeletonClassName?: string;
}

/**
 * Enhanced Next Image component that displays an animated skeleton shimmer block
 * until the image has fully loaded, then smoothly fades the image in.
 */
export function ImageWithSkeleton({
  src,
  alt,
  className,
  wrapperClassName,
  skeletonClassName,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!loaded && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10 size-full bg-ink-800/90 animate-pulse",
            skeletonClassName,
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          !loaded ? "opacity-0" : "opacity-100",
          className,
        )}
        {...props}
      />
    </div>
  );
}
