/** Typed application errors that route handlers can throw freely. */

export class AppError extends Error {
  readonly statusCode: number;
  readonly errors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode = 500,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace?.(this, new.target);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Invalid request.", errors?: Record<string, string[]>) {
    super(message, 400, errors);
  }
}

export class ValidationError extends AppError {
  constructor(
    errors: Record<string, string[]>,
    message = "Validation failed.",
  ) {
    super(message, 422, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required.") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found.`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "That record already exists.") {
    super(message, 409);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests. Please slow down.") {
    super(message, 429);
  }
}
