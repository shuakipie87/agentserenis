import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error';
import logger from '../utils/logger';

/**
 * Shape of the JWT access token payload after verification.
 */
export interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Augment Express Request to carry authenticated user info.
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

/**
 * Extracts and verifies a Bearer JWT from the Authorization header.
 * On success, attaches `req.user` with { userId, role }.
 * On failure, throws a 401 AppError.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw AppError.unauthorized('Missing or malformed authorization header');
    }

    const token = authHeader.slice(7); // strip "Bearer "

    if (!token) {
      throw AppError.unauthorized('Token not provided');
    }

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      logger.error('JWT_ACCESS_SECRET is not configured');
      throw AppError.internal('Authentication service misconfigured');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      next(AppError.unauthorized('Token has expired', 'TOKEN_EXPIRED'));
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      next(AppError.unauthorized('Invalid token', 'TOKEN_INVALID'));
      return;
    }

    next(AppError.unauthorized('Authentication failed'));
  }
}

/**
 * Authorization middleware that requires the authenticated user to have the ADMIN role.
 * Must be used after `authenticate` middleware.
 */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    next(AppError.unauthorized('Authentication required'));
    return;
  }

  if (req.user.role !== 'ADMIN') {
    next(AppError.forbidden('Admin access required', 'ADMIN_REQUIRED'));
    return;
  }

  next();
}
