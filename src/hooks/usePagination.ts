"use client";

import { useCallback, useState } from "react";
import { PAGINATION } from "@/constants/config";
import { type SortOrder } from "@/types/api";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSortBy?: string;
  initialSortOrder?: SortOrder;
}

/**
 * Owns list-view query state (page, page size, sort, search, status filter)
 * and keeps them consistent — e.g. any filter change resets to page 1, so the
 * user never lands on an out-of-range page.
 */
export function usePagination({
  initialPage = PAGINATION.defaultPage,
  initialLimit = PAGINATION.defaultLimit,
  initialSortBy = "displayOrder",
  initialSortOrder = "asc",
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const [search, setSearchState] = useState("");
  const [status, setStatusState] = useState("all");

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setPage(1);
  }, []);

  const setStatus = useCallback((value: string) => {
    setStatusState(value);
    setPage(1);
  }, []);

  const setLimit = useCallback((value: number) => {
    setLimitState(value);
    setPage(1);
  }, []);

  /** Clicking the active column flips direction; a new column starts ascending. */
  const toggleSort = useCallback((key: string) => {
    setSortBy((currentKey) => {
      setSortOrder((currentOrder) =>
        currentKey === key && currentOrder === "asc" ? "desc" : "asc",
      );
      return key;
    });
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimitState(initialLimit);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    setSearchState("");
    setStatusState("all");
  }, [initialPage, initialLimit, initialSortBy, initialSortOrder]);

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    status,
    setPage,
    setLimit,
    setSearch,
    setStatus,
    toggleSort,
    reset,
  };
}

export type PaginationState = ReturnType<typeof usePagination>;
