import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Schema definition for request validation.
 * Each key corresponds to a part of the Express request object.
 */
interface ValidationSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

/**
 * Creates a middleware that validates request body, params, and/or query
 * against the provided Zod schemas.
 *
 * On success, replaces req.body / req.params / req.query with the parsed
 * (and potentially transformed) values from Zod.
 *
 * On failure, passes the ZodError to the global error handler which
 * returns a structured 422 response.
 *
 * Usage:
 *   router.post('/products', validate({ body: createProductSchema }), handler);
 *   router.get('/products/:id', validate({ params: idParamSchema }), handler);
 */
export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const errors: ZodError[] = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (result.success) {
        req.body = result.data;
      } else {
        errors.push(result.error);
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (result.success) {
        (req as Request).params = result.data;
      } else {
        errors.push(result.error);
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (result.success) {
        (req as Request).query = result.data;
      } else {
        errors.push(result.error);
      }
    }

    if (errors.length > 0) {
      // Merge all validation errors into a single ZodError
      const allIssues = errors.flatMap((e) => e.issues);
      const mergedError = new ZodError(allIssues);
      next(mergedError);
      return;
    }

    next();
  };
}
