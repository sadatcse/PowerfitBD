import axios, { AxiosError, type AxiosInstance } from "axios";
import { type ApiResponse, type FieldErrors } from "@/types/api";

/**
 * Shared Axios instance for all browser → API traffic.
 * `withCredentials` keeps the HttpOnly session cookie flowing on same-origin
 * requests, including when the app is served from a custom domain.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 20_000,
});

/** Normalised client-side error carrying the server's field errors. */
export class ApiRequestError extends Error {
  readonly status: number;
  readonly errors?: FieldErrors;

  constructor(message: string, status: number, errors?: FieldErrors) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

/** Turns any Axios failure into an `ApiRequestError` with a usable message. */
export function toApiError(error: unknown): ApiRequestError {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | (ApiResponse<null> & { errors?: FieldErrors })
      | undefined;

    return new ApiRequestError(
      data?.message ??
        (error.code === "ECONNABORTED"
          ? "The request timed out. Please try again."
          : "Network error. Check your connection and try again."),
      error.response?.status ?? 0,
      data?.errors,
    );
  }

  if (error instanceof Error) return new ApiRequestError(error.message, 0);
  return new ApiRequestError("Something went wrong.", 0);
}

/** Unwraps the `{ success, message, data }` envelope down to `data`. */
export async function request<T>(
  fn: () => Promise<{ data: ApiResponse<T> }>,
): Promise<T> {
  try {
    const response = await fn();
    return response.data.data;
  } catch (error) {
    throw toApiError(error);
  }
}
