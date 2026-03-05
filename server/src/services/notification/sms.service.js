import twilio from 'twilio';
import { config } from '../../config/env.js';
import logger from '../../utils/logger.js';

class SMSService {
  constructor() {
    if (!config.twilio.accountSid || !config.twilio.authToken) {
      logger.warn('Twilio credentials not configured. SMS service will not work.');
      this.client = null;
    } else {
      this.client = twilio(config.twilio.accountSid, config.twilio.authToken);
      logger.info('Twilio SMS service initialized');
    }
  }

  /**
   * Send SMS message
   * @param {string} to - Recipient phone number (E.164 format: +1234567890)
   * @param {string} message - SMS message content
   * @returns {Promise<object>} - Twilio message response
   */
  async sendSMS(to, message) {
    try {
      if (!this.client) {
        throw new Error('Twilio client not initialized. Check your credentials.');
      }

      if (!config.twilio.phoneNumber) {
        throw new Error('Twilio phone number not configured');
      }

      // Validate phone number format
      if (!to.startsWith('+')) {
        throw new Error('Phone number must be in E.164 format (e.g., +1234567890)');
      }

      logger.info(`Sending SMS to ${to}`);

      const response = await this.client.messages.create({
        body: message,
        from: config.twilio.phoneNumber,
        to: to
      });

      logger.info(`SMS sent successfully. SID: ${response.sid}`);

      return {
        success: true,
        sid: response.sid,
        status: response.status,
        to: response.to,
        from: response.from
      };
    } catch (error) {
      logger.error('SMS sending failed:', error);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  /**
   * Send OTP via SMS
   * @param {string} to - Recipient phone number
   * @param {string} otp - OTP code
   * @returns {Promise<object>}
   */
  async sendOTP(to, otp) {
    const message = `Your ClipCrafters verification code is ${otp}. It expires in 5 minutes. Do not share this code with anyone.`;
    return await this.sendSMS(to, message);
  }

  /**
   * Send project notification via SMS
   * @param {string} to - Recipient phone number
   * @param {string} projectTitle - Project title
   * @returns {Promise<object>}
   */
  async sendProjectNotification(to, projectTitle) {
    const message = `Your project "${projectTitle}" video is ready! Check it out on ClipCrafters.`;
    return await this.sendSMS(to, message);
  }

  /**
   * Send video generation complete notification
   * @param {string} to - Recipient phone number
   * @param {string} videoTitle - Video title
   * @returns {Promise<object>}
   */
  async sendVideoCompleteNotification(to, videoTitle) {
    const message = `Great news! Your video "${videoTitle}" has been generated successfully. View it now on ClipCrafters.`;
    return await this.sendSMS(to, message);
  }

  /**
   * Send welcome SMS
   * @param {string} to - Recipient phone number
   * @param {string} name - User name
   * @returns {Promise<object>}
   */
  async sendWelcomeSMS(to, name) {
    const message = `Welcome to ClipCrafters, ${name}! Start creating amazing AI-powered videos today.`;
    return await this.sendSMS(to, message);
  }
}

export default new SMSService();
