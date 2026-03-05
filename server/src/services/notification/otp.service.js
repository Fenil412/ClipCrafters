import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Otp } from '../../models/index.js';
import smsService from './sms.service.js';
import emailService from './email.service.js';
import logger from '../../utils/logger.js';

class OTPService {
  /**
   * Generate 6-digit OTP
   * @returns {string} - 6-digit OTP
   */
  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Hash OTP for secure storage
   * @param {string} otp - Plain OTP
   * @returns {Promise<string>} - Hashed OTP
   */
  async hashOTP(otp) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(otp, salt);
  }

  /**
   * Verify OTP
   * @param {string} plainOTP - Plain OTP from user
   * @param {string} hashedOTP - Hashed OTP from database
   * @returns {Promise<boolean>}
   */
  async verifyOTP(plainOTP, hashedOTP) {
    return await bcrypt.compare(plainOTP, hashedOTP);
  }

  /**
   * Create and store OTP
   * @param {string} userId - User ID
   * @param {string} deliveryMethod - 'sms' or 'email'
   * @param {string} recipient - Phone number or email
   * @returns {Promise<object>}
   */
  async createOTP(userId, deliveryMethod, recipient) {
    try {
      // Generate OTP
      const otp = this.generateOTP();
      const otpHash = await this.hashOTP(otp);

      // Set expiry (5 minutes from now)
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      // Delete any existing OTPs for this user
      await Otp.deleteMany({ userId });

      // Store OTP in database
      const otpRecord = await Otp.create({
        userId,
        otpHash,
        expiresAt,
        deliveryMethod,
        recipient
      });

      logger.info(`OTP created for user ${userId} via ${deliveryMethod}`);

      return {
        otpRecord,
        plainOTP: otp // Only return this for sending, never store
      };
    } catch (error) {
      logger.error('Create OTP error:', error);
      throw error;
    }
  }

  /**
   * Send OTP via SMS
   * @param {string} userId - User ID
   * @param {string} phone - Phone number
   * @param {string} name - User name (optional)
   * @returns {Promise<object>}
   */
  async sendOTPviaSMS(userId, phone, name = 'User') {
    try {
      // Create OTP
      const { plainOTP } = await this.createOTP(userId, 'sms', phone);

      // Send via SMS
      const smsResponse = await smsService.sendOTP(phone, plainOTP);

      logger.info(`OTP sent via SMS to ${phone}`);

      return {
        success: true,
        message: 'OTP sent successfully via SMS',
        deliveryMethod: 'sms',
        recipient: phone,
        smsResponse
      };
    } catch (error) {
      logger.error('Send OTP via SMS error:', error);
      throw new Error(`Failed to send OTP via SMS: ${error.message}`);
    }
  }

  /**
   * Send OTP via Email
   * @param {string} userId - User ID
   * @param {string} email - Email address
   * @param {string} name - User name
   * @returns {Promise<object>}
   */
  async sendOTPviaEmail(userId, email, name = 'User') {
    try {
      // Create OTP
      const { plainOTP } = await this.createOTP(userId, 'email', email);

      // Send via Email
      const emailResponse = await emailService.sendOTP(email, plainOTP, name);

      logger.info(`OTP sent via email to ${email}`);

      return {
        success: true,
        message: 'OTP sent successfully via email',
        deliveryMethod: 'email',
        recipient: email,
        emailResponse
      };
    } catch (error) {
      logger.error('Send OTP via email error:', error);
      throw new Error(`Failed to send OTP via email: ${error.message}`);
    }
  }

  /**
   * Verify OTP for user
   * @param {string} userId - User ID
   * @param {string} otp - OTP to verify
   * @returns {Promise<object>}
   */
  async verifyUserOTP(userId, otp) {
    try {
      // Find OTP record
      const otpRecord = await Otp.findOne({ userId }).sort({ createdAt: -1 });

      if (!otpRecord) {
        return {
          success: false,
          message: 'No OTP found. Please request a new one.'
        };
      }

      // Check if expired
      if (new Date() > otpRecord.expiresAt) {
        await otpRecord.deleteOne();
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.'
        };
      }

      // Verify OTP
      const isValid = await this.verifyOTP(otp, otpRecord.otpHash);

      if (!isValid) {
        return {
          success: false,
          message: 'Invalid OTP. Please try again.'
        };
      }

      // OTP is valid, delete it
      await otpRecord.deleteOne();

      logger.info(`OTP verified successfully for user ${userId}`);

      return {
        success: true,
        message: 'OTP verified successfully',
        deliveryMethod: otpRecord.deliveryMethod
      };
    } catch (error) {
      logger.error('Verify OTP error:', error);
      throw error;
    }
  }

  /**
   * Resend OTP
   * @param {string} userId - User ID
   * @param {string} deliveryMethod - 'sms' or 'email'
   * @param {string} recipient - Phone or email
   * @param {string} name - User name
   * @returns {Promise<object>}
   */
  async resendOTP(userId, deliveryMethod, recipient, name = 'User') {
    try {
      // Delete existing OTP
      await Otp.deleteMany({ userId });

      // Send new OTP
      if (deliveryMethod === 'sms') {
        return await this.sendOTPviaSMS(userId, recipient, name);
      } else if (deliveryMethod === 'email') {
        return await this.sendOTPviaEmail(userId, recipient, name);
      } else {
        throw new Error('Invalid delivery method. Use "sms" or "email".');
      }
    } catch (error) {
      logger.error('Resend OTP error:', error);
      throw error;
    }
  }
}

export default new OTPService();
