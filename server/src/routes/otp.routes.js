import express from 'express';
import { sendOTP, verifyOTP, resendOTP } from '../controllers/otp.controller.js';
import { body } from 'express-validator';
import { authLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

// Validators
const sendOTPValidator = [
  body('deliveryMethod')
    .notEmpty()
    .withMessage('Delivery method is required')
    .isIn(['sms', 'email'])
    .withMessage('Delivery method must be "sms" or "email"'),
  body('phone')
    .optional()
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage('Phone must be in E.164 format (e.g., +1234567890)'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
];

const verifyOTPValidator = [
  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers')
];

// Routes
router.post('/send-otp', authLimiter, sendOTPValidator, sendOTP);
router.post('/verify-otp', authLimiter, verifyOTPValidator, verifyOTP);
router.post('/resend-otp', authLimiter, sendOTPValidator, resendOTP);

export default router;
