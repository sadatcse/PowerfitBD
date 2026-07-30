import { type QueryFilter } from "mongoose";
import { PAGINATION } from "@/constants/config";
import { normalisePagination } from "@/utils/pagination";
import { escapeRegex } from "@/utils/sanitize";
import { type ListQuery, type SortOrder } from "@/types/api";

/**
 * Parses `?page=&limit=&search=&status=&sortBy=&sortOrder=` into a validated
 * shape. `allowedSortFields` is an allowlist — anything else falls back to the
 * default, which stops callers from sorting on unindexed or private fields.
 */
export function parseListQuery(
  searchParams: URLSearchParams,
  allowedSortFields: readonly string[],
  defaultSortBy = "displayOrder",
): ListQuery {
  const { page, limit } = normalisePagination(
    searchParams.get("page"),
    searchParams.get("limit") ?? PAGINATION.defaultLimit,
  );

  const requestedSortBy = searchParams.get("sortBy");
  const sortBy =
    requestedSortBy && allowedSortFields.includes(requestedSortBy)
      ? requestedSortBy
      : defaultSortBy;

  const sortOrder: SortOrder =
    searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

  const search = searchParams.get("search")?.trim();
  const status = searchParams.get("status")?.trim();

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    ...(search ? { search } : {}),
    ...(status && status !== "all" ? { status } : {}),
  };
}

/**
 * Builds a case-insensitive `$or` regex filter across the given fields.
 * The term is escaped so regex metacharacters can't be injected.
 */
export function buildSearchFilter<T>(
  search: string | undefined,
  fields: readonly string[],
): QueryFilter<T> {
  if (!search) return {};
  const pattern = new RegExp(escapeRegex(search), "i");
  return {
    $or: fields.map((field) => ({ [field]: pattern })),
  } as QueryFilter<T>;
}

/** Mongoose sort object, with `_id` as a tiebreaker for stable pagination. */
export function buildSort(
  sortBy: string,
  sortOrder: SortOrder,
): Record<string, 1 | -1> {
  const direction = sortOrder === "desc" ? -1 : 1;
  return { [sortBy]: direction, _id: 1 };
}
