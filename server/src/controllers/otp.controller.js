import { validationResult } from 'express-validator';
import otpService from '../services/notification/otp.service.js';
import { User } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Send OTP to user
 * POST /api/auth/send-otp
 */
export const sendOTP = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(errors.array()[0].msg, 400).send(res);
  }

  const { phone, email, deliveryMethod } = req.body;

  // Validate delivery method
  if (!deliveryMethod || !['sms', 'email'].includes(deliveryMethod)) {
    return ApiResponse.error('Delivery method must be "sms" or "email"', 400).send(res);
  }

  // Validate recipient based on delivery method
  if (deliveryMethod === 'sms' && !phone) {
    return ApiResponse.error('Phone number is required for SMS delivery', 400).send(res);
  }

  if (deliveryMethod === 'email' && !email) {
    return ApiResponse.error('Email is required for email delivery', 400).send(res);
  }

  try {
    // Find user by phone or email
    let user;
    if (deliveryMethod === 'sms') {
      user = await User.findOne({ phone });
      if (!user) {
        return ApiResponse.error('User not found with this phone number', 404).send(res);
      }
    } else {
      user = await User.findOne({ email });
      if (!user) {
        return ApiResponse.error('User not found with this email', 404).send(res);
      }
    }

    // Send OTP
    let result;
    if (deliveryMethod === 'sms') {
      result = await otpService.sendOTPviaSMS(user._id, phone, user.name);
    } else {
      result = await otpService.sendOTPviaEmail(user._id, email, user.name);
    }

    return ApiResponse.success(result.message, {
      deliveryMethod: result.deliveryMethod,
      recipient: result.recipient
    }).send(res);
  } catch (error) {
    return ApiResponse.error(error.message, 500).send(res);
  }
});

/**
 * Verify OTP
 * POST /api/auth/verify-otp
 */
export const verifyOTP = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(errors.array()[0].msg, 400).send(res);
  }

  const { otp, phone, email } = req.body;

  if (!otp) {
    return ApiResponse.error('OTP is required', 400).send(res);
  }

  if (!phone && !email) {
    return ApiResponse.error('Phone number or email is required', 400).send(res);
  }

  try {
    // Find user
    let user;
    if (phone) {
      user = await User.findOne({ phone });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return ApiResponse.error('User not found', 404).send(res);
    }

    // Verify OTP
    const result = await otpService.verifyUserOTP(user._id, otp);

    if (!result.success) {
      return ApiResponse.error(result.message, 400).send(res);
    }

    // Generate JWT token for authenticated user
    const authService = (await import('../services/auth.service.js')).default;
    const token = authService.generateJWT(user._id);

    return ApiResponse.success(result.message, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }).send(res);
  } catch (error) {
    return ApiResponse.error(error.message, 500).send(res);
  }
});

/**
 * Resend OTP
 * POST /api/auth/resend-otp
 */
export const resendOTP = asyncHandler(async (req, res) => {
  const { phone, email, deliveryMethod } = req.body;

  if (!deliveryMethod || !['sms', 'email'].includes(deliveryMethod)) {
    return ApiResponse.error('Delivery method must be "sms" or "email"', 400).send(res);
  }

  try {
    // Find user
    let user;
    const recipient = deliveryMethod === 'sms' ? phone : email;

    if (deliveryMethod === 'sms') {
      user = await User.findOne({ phone });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return ApiResponse.error('User not found', 404).send(res);
    }

    // Resend OTP
    const result = await otpService.resendOTP(
      user._id,
      deliveryMethod,
      recipient,
      user.name
    );

    return ApiResponse.success(result.message, {
      deliveryMethod: result.deliveryMethod,
      recipient: result.recipient
    }).send(res);
  } catch (error) {
    return ApiResponse.error(error.message, 500).send(res);
  }
});
