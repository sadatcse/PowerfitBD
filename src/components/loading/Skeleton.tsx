import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

/** Shimmer block used to reserve layout while data loads. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-sm bg-line/60", className)}
    />
  );
}

/** Row placeholder matching the dashboard table's column rhythm. */
export function SkeletonTableRows({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-line">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <td key={colIndex} className="px-4 py-4">
              <Skeleton className={colIndex === 0 ? "h-10 w-40" : "h-4 w-24"} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/** Card placeholder for the public grids (team, gallery, equipment). */
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="aspect-[4/5] w-full" />
      <Skeleton className="h-5 w-3/5" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}
