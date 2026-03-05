import logger from '../utils/logger.js';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return ApiResponse.error(errors.join(', '), 400).send(res);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return ApiResponse.error(`${field} already exists`, 409).send(res);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error('Invalid token', 401).send(res);
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error('Token expired', 401).send(res);
  }

  // Mongoose CastError
  if (err.name === 'CastError') {
    return ApiResponse.error('Invalid ID format', 400).send(res);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(message, statusCode).send(res);
};

/**
 * 404 Not Found handler
 */
export const notFound = (req, res) => {
  return ApiResponse.error(`Route ${req.originalUrl} not found`, 404).send(res);
};
