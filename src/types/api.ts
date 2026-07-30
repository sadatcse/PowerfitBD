/** The single response envelope every route handler returns. */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/** Field-level validation errors, keyed by form field path. */
export type FieldErrors = Record<string, string[]>;

export interface ApiErrorResponse {
  success: false;
  message: string;
  data: null;
  errors?: FieldErrors;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Payload shape for every list endpoint. */
export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

export type SortOrder = "asc" | "desc";

/** Normalised query string accepted by the list endpoints. */
export interface ListQuery {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sortBy: string;
  sortOrder: SortOrder;
}
