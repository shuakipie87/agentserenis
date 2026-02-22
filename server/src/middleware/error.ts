import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger';

/**
 * Custom application error with HTTP status code and machine-readable error code.
 * Only operational errors (isOperational = true) are safe to expose to clients.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    isOperational: boolean = true,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    this.name = 'AppError';

    // Maintains proper stack trace in V8
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, code: string = 'BAD_REQUEST', details?: Record<string, unknown>): AppError {
    return new AppError(message, 400, code, true, details);
  }

  static unauthorized(message: string = 'Authentication required', code: string = 'UNAUTHORIZED'): AppError {
    return new AppError(message, 401, code);
  }

  static forbidden(message: string = 'Insufficient permissions', code: string = 'FORBIDDEN'): AppError {
    return new AppError(message, 403, code);
  }

  static notFound(message: string = 'Resource not found', code: string = 'NOT_FOUND'): AppError {
    return new AppError(message, 404, code);
  }

  static conflict(message: string, code: string = 'CONFLICT'): AppError {
    return new AppError(message, 409, code);
  }

  static tooManyRequests(message: string = 'Too many requests', code: string = 'RATE_LIMIT_EXCEEDED'): AppError {
    return new AppError(message, 429, code);
  }

  static internal(message: string = 'Internal server error', code: string = 'INTERNAL_ERROR'): AppError {
    return new AppError(message, 500, code, false);
  }
}

/**
 * Maps Prisma-specific error codes to user-friendly AppError responses.
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): AppError {
  switch (error.code) {
    case 'P2002': {
      const target = (error.meta?.target as string[]) ?? ['field'];
      const fields = Array.isArray(target) ? target.join(', ') : target;
      return AppError.conflict(
        `A record with this ${fields} already exists`,
        'UNIQUE_CONSTRAINT_VIOLATION'
      );
    }
    case 'P2025':
      return AppError.notFound(
        'The requested record was not found',
        'RECORD_NOT_FOUND'
      );
    case 'P2003':
      return AppError.badRequest(
        'Operation failed due to a foreign key constraint',
        'FOREIGN_KEY_VIOLATION'
      );
    case 'P2014':
      return AppError.badRequest(
        'The change would violate a required relation',
        'RELATION_VIOLATION'
      );
    default:
      return AppError.internal(
        'A database error occurred',
        'DATABASE_ERROR'
      );
  }
}

/**
 * Maps Zod validation errors to a structured error response with field-level details.
 */
function handleZodError(error: ZodError): AppError {
  const fieldErrors = error.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
    code: e.code,
  }));

  return new AppError(
    'Validation failed',
    422,
    'VALIDATION_ERROR',
    true,
    { fields: fieldErrors }
  );
}

/**
 * Global error handler middleware. Must be registered last in the middleware chain.
 * Catches all errors, maps them to consistent JSON responses, and logs appropriately.
 */
export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = (req.headers['x-request-id'] as string) ?? 'unknown';

  // Zod validation errors
  if (err instanceof ZodError) {
    const appError = handleZodError(err);
    logger.warn(
      { requestId, path: req.path, method: req.method, code: appError.code },
      appError.message
    );
    res.status(appError.statusCode).json({
      error: {
        code: appError.code,
        message: appError.message,
        details: appError.details,
        requestId,
      },
    });
    return;
  }

  // Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const appError = handlePrismaError(err);
    logger.warn(
      { requestId, path: req.path, method: req.method, prismaCode: err.code, code: appError.code },
      appError.message
    );
    res.status(appError.statusCode).json({
      error: {
        code: appError.code,
        message: appError.message,
        requestId,
      },
    });
    return;
  }

  // Prisma validation errors (invalid data sent to Prisma)
  if (err instanceof Prisma.PrismaClientValidationError) {
    logger.warn(
      { requestId, path: req.path, method: req.method },
      'Prisma validation error'
    );
    res.status(400).json({
      error: {
        code: 'DATABASE_VALIDATION_ERROR',
        message: 'Invalid data provided',
        requestId,
      },
    });
    return;
  }

  // Application errors (our custom errors)
  if (err instanceof AppError) {
    if (err.isOperational) {
      logger.warn(
        { requestId, path: req.path, method: req.method, code: err.code },
        err.message
      );
    } else {
      logger.error(
        { err, requestId, path: req.path, method: req.method, code: err.code },
        err.message
      );
    }
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
        requestId,
      },
    });
    return;
  }

  // JSON parse errors from express.json()
  if (err instanceof SyntaxError && 'body' in err) {
    logger.warn({ requestId, path: req.path }, 'Invalid JSON in request body');
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Request body contains invalid JSON',
        requestId,
      },
    });
    return;
  }

  // Unhandled / unknown errors - never leak internals
  logger.error(
    { err, requestId, path: req.path, method: req.method },
    'Unhandled error'
  );
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      requestId,
    },
  });
}
