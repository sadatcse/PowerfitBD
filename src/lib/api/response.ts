import { NextResponse } from "next/server";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { AppError } from "./errors";
import { type ApiResponse, type FieldErrors } from "@/types/api";

/**
 * Every route handler returns through these helpers so the client can rely on
 * one envelope shape: `{ success, message, data }`.
 */

export function ok<T>(
  data: T,
  message = "Success.",
  init?: ResponseInit,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { success: true, message, data },
    { status: 200, ...init },
  );
}

export function created<T>(
  data: T,
  message = "Created successfully.",
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status: 201 });
}

export function noContentOk(
  message = "Deleted successfully.",
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    { success: true, message, data: null },
    { status: 200 },
  );
}

export function fail(
  message: string,
  status = 400,
  errors?: FieldErrors,
): NextResponse<ApiResponse<null> & { errors?: FieldErrors }> {
  return NextResponse.json(
    { success: false, message, data: null, ...(errors ? { errors } : {}) },
    { status },
  );
}

/** Flattens a ZodError into `{ fieldPath: [messages] }`. */
export function zodToFieldErrors(error: ZodError): FieldErrors {
  const result: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_root";
    (result[key] ??= []).push(issue.message);
  }
  return result;
}

/**
 * Converts any thrown value into a safe response. Internal details are logged
 * server-side but never leaked to the client on a 500.
 */
export function handleApiError(
  error: unknown,
): NextResponse<ApiResponse<null> & { errors?: FieldErrors }> {
  if (error instanceof ZodError) {
    return fail("Validation failed.", 422, zodToFieldErrors(error));
  }

  if (error instanceof AppError) {
    return fail(error.message, error.statusCode, error.errors);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errors: FieldErrors = {};
    for (const [field, issue] of Object.entries(error.errors)) {
      (errors[field] ??= []).push(issue.message);
    }
    return fail("Validation failed.", 422, errors);
  }

  if (error instanceof mongoose.Error.CastError) {
    return fail("Malformed identifier.", 400);
  }

  // Duplicate key on a unique index.
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  ) {
    return fail("That record already exists.", 409);
  }

  console.error("[api] Unhandled error:", error);
  return fail("Something went wrong. Please try again.", 500);
}

/**
 * Wraps a route handler so thrown errors become well-formed responses.
 * Keeps handlers free of repetitive try/catch blocks.
 */
export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<NextResponse>,
) {
  return async (...args: Args): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
