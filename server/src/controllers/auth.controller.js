import { validationResult } from 'express-validator';
import authService from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(errors.array()[0].msg, 400).send(res);
  }

  const result = await authService.registerUser(req.body);

  return ApiResponse.success('User registered successfully', result, 201).send(res);
});

/**
 * Login user
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(errors.array()[0].msg, 400).send(res);
  }

  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);

  return ApiResponse.success('Login successful', result).send(res);
});

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);

  return ApiResponse.success('Profile retrieved', user).send(res);
});
