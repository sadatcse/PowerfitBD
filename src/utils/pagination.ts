import { PAGINATION } from "@/constants/config";
import { type PaginationMeta } from "@/types/api";

/** Clamps a user-supplied page/limit pair into a safe range. */
export function normalisePagination(
  page: unknown,
  limit: unknown,
): { page: number; limit: number; skip: number } {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const safePage =
    Number.isFinite(parsedPage) && parsedPage >= 1
      ? Math.floor(parsedPage)
      : PAGINATION.defaultPage;

  const safeLimit =
    Number.isFinite(parsedLimit) && parsedLimit >= 1
      ? Math.min(Math.floor(parsedLimit), PAGINATION.maxLimit)
      : PAGINATION.defaultLimit;

  return { page: safePage, limit: safeLimit, skip: (safePage - 1) * safeLimit };
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * Produces the page buttons to render, inserting `"..."` gaps so the control
 * stays a fixed width no matter how many pages exist.
 * e.g. `[1, "...", 4, 5, 6, "...", 20]`
 */
export function getPageRange(
  currentPage: number,
  totalPages: number,
  siblings = 1,
): (number | "...")[] {
  const totalNumbers = siblings * 2 + 5;

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblings, 1);
  const rightSibling = Math.min(currentPage + siblings, totalPages);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + siblings * 2;
    return [
      ...Array.from({ length: leftCount }, (_, i) => i + 1),
      "...",
      totalPages,
    ];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + siblings * 2;
    return [
      1,
      "...",
      ...Array.from(
        { length: rightCount },
        (_, i) => totalPages - rightCount + 1 + i,
      ),
    ];
  }

  return [
    1,
    "...",
    ...Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i,
    ),
    "...",
    totalPages,
  ];
}

/** Human-readable "Showing 11–20 of 143" summary. */
export function getResultSummary(meta: PaginationMeta): string {
  if (meta.total === 0) return "No results";
  const from = (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);
  return `Showing ${from}–${to} of ${meta.total}`;
}
