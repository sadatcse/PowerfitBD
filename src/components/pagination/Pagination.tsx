"use client";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getPageRange, getResultSummary } from "@/utils/pagination";
import { type PaginationMeta } from "@/types/api";
import { cn } from "@/utils/cn";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
  /** Hides the "Showing 1–10 of 42" summary in tight layouts. */
  hideSummary?: boolean;
}

const CONTROL =
  "grid size-9 place-items-center border border-line text-body-sm font-bold " +
  "transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

/** Page control shared by every paginated list in the dashboard. */
export function Pagination({
  meta,
  onPageChange,
  className,
  hideSummary = false,
}: PaginationProps) {
  if (meta.totalPages <= 1 && meta.total === 0) return null;

  const pages = getPageRange(meta.page, meta.totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 pt-2",
        className,
      )}
    >
      {!hideSummary ? (
        <p className="text-body-sm text-muted">{getResultSummary(meta)}</p>
      ) : (
        <span />
      )}

      <ul className="flex items-center gap-1.5">
        <li>
          <button
            type="button"
            className={cn(CONTROL, "text-mist hover:border-brand hover:text-white")}
            onClick={() => onPageChange(meta.page - 1)}
            disabled={!meta.hasPrevPage}
            aria-label="Previous page"
          >
            <LuChevronLeft className="size-4" aria-hidden />
          </button>
        </li>

        {pages.map((page, index) =>
          page === "..." ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="px-1 text-body-sm text-muted"
            >
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === meta.page ? "page" : undefined}
                className={cn(
                  CONTROL,
                  page === meta.page
                    ? "border-brand bg-brand text-white"
                    : "text-mist hover:border-brand hover:text-white",
                )}
              >
                {page}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className={cn(CONTROL, "text-mist hover:border-brand hover:text-white")}
            onClick={() => onPageChange(meta.page + 1)}
            disabled={!meta.hasNextPage}
            aria-label="Next page"
          >
            <LuChevronRight className="size-4" aria-hidden />
          </button>
        </li>
      </ul>
    </nav>
  );
}
