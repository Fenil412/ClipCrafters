import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { User } from '../models/index.js';

/**
 * Verify JWT token and attach user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.error('No token provided', 401).send(res);
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return ApiResponse.error('User not found', 401).send(res);
      }

      req.user = user;
      next();
    } catch (error) {
      return ApiResponse.error('Invalid or expired token', 401).send(res);
    }
  } catch (error) {
    return ApiResponse.error('Authentication failed', 401).send(res);
  }
};

/**
 * Check if user has required role
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error('Unauthorized', 401).send(res);
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error('Forbidden - Insufficient permissions', 403).send(res);
    }

    next();
  };
};
