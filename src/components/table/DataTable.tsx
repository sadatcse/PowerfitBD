"use client";

import { type ReactNode } from "react";
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from "react-icons/lu";
import { EmptyState } from "../empty-state/EmptyState";
import { SkeletonTableRows } from "../loading/Skeleton";
import { type SortOrder } from "@/types/api";
import { cn } from "@/utils/cn";

/**
 * Generic, fully typed table used by every dashboard list.
 *
 * Columns declare how to render a cell rather than the table knowing about any
 * particular entity, so a new module needs only a column array.
 */

export interface Column<T> {
  /** Stable key; when `sortable`, must match an API sort field. */
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortable?: boolean;
  /** Tailwind width/alignment classes for the column. */
  className?: string;
  /** Hides the column below `md` to keep small screens readable. */
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  /** Stable React key per row. */
  rowKey: (row: T) => string;
  loading?: boolean;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSortChange?: (key: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  sortBy,
  sortOrder = "asc",
  onSortChange,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Records you create will appear in this table.",
  emptyAction,
  className,
}: DataTableProps<T>) {
  const showEmpty = !loading && rows.length === 0;

  if (showEmpty) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div
      className={cn(
        "scrollbar-slim w-full overflow-x-auto border border-line bg-ink-900",
        className,
      )}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-ink-950/60">
            {columns.map((column) => {
              const isSorted = sortBy === column.key;
              const canSort = Boolean(column.sortable && onSortChange);

              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    isSorted
                      ? sortOrder === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={cn(
                    "px-4 py-3.5 font-sans text-body-xs font-bold tracking-[0.12em] text-muted uppercase",
                    column.hideOnMobile && "hidden md:table-cell",
                    column.className,
                  )}
                >
                  {canSort ? (
                    <button
                      type="button"
                      onClick={() => onSortChange?.(column.key)}
                      className={cn(
                        "inline-flex items-center gap-1.5 transition-colors hover:text-white",
                        isSorted && "text-brand",
                      )}
                    >
                      {column.header}
                      {isSorted ? (
                        sortOrder === "asc" ? (
                          <LuArrowUp className="size-3" aria-hidden />
                        ) : (
                          <LuArrowDown className="size-3" aria-hidden />
                        )
                      ) : (
                        <LuArrowUpDown className="size-3 opacity-50" aria-hidden />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <SkeletonTableRows rows={6} columns={columns.length} />
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-line/70 transition-colors last:border-0 hover:bg-ink-850"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-4 align-middle text-body-sm text-sand",
                      column.hideOnMobile && "hidden md:table-cell",
                      column.className,
                    )}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
