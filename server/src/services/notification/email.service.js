import { Resend } from 'resend';
import { config } from '../../config/env.js';
import logger from '../../utils/logger.js';

class EmailService {
  constructor() {
    if (!config.resend.apiKey) {
      logger.warn('Resend API key not configured. Email service will not work.');
      this.client = null;
    } else {
      this.client = new Resend(config.resend.apiKey);
      logger.info('Resend email service initialized');
    }
  }

  /**
   * Send email
   * @param {object} options - Email options
   * @param {string|string[]} options.to - Recipient email(s)
   * @param {string} options.subject - Email subject
   * @param {string} options.html - HTML content
   * @param {string} options.text - Plain text content (optional)
   * @returns {Promise<object>}
   */
  async sendEmail({ to, subject, html, text }) {
    try {
      if (!this.client) {
        throw new Error('Resend client not initialized. Check your API key.');
      }

      // In development, redirect to verified email
      const recipient = config.nodeEnv === 'development' && config.resend.verifiedEmail
        ? config.resend.verifiedEmail
        : to;

      if (config.nodeEnv === 'development' && config.resend.verifiedEmail) {
        logger.info(`Development mode: Redirecting email from ${to} to ${recipient}`);
      }

      logger.info(`Sending email to ${recipient}`);

      const response = await this.client.emails.send({
        from: config.resend.from,
        to: Array.isArray(recipient) ? recipient : [recipient],
        subject: subject,
        html: html,
        text: text
      });

      logger.info(`Email sent successfully. ID: ${response.data?.id}`);

      return {
        success: true,
        id: response.data?.id,
        to: recipient
      };
    } catch (error) {
      logger.error('Email sending failed:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Send OTP via email
   * @param {string} to - Recipient email
   * @param {string} otp - OTP code
   * @param {string} name - User name
   * @returns {Promise<object>}
   */
  async sendOTP(to, otp, name = 'User') {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0; border-radius: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 ClipCrafters</h1>
              <p>Verification Code</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Your verification code is:</p>
              <div class="otp-box">${otp}</div>
              <p>This code will expire in <strong>5 minutes</strong>.</p>
              <div class="warning">
                <strong>⚠️ Security Notice:</strong> Never share this code with anyone. ClipCrafters will never ask for your verification code.
              </div>
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2024 ClipCrafters. All rights reserved.</p>
              <p>AI-Powered Video Editing System</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to,
      subject: 'Your ClipCrafters Verification Code',
      html,
      text: `Your ClipCrafters verification code is ${otp}. It expires in 5 minutes.`
    });
  }

  /**
   * Send welcome email
   * @param {string} to - Recipient email
   * @param {string} name - User name
   * @returns {Promise<object>}
   */
  async sendWelcomeEmail(to, name) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .feature-item { margin: 15px 0; padding-left: 25px; position: relative; }
            .feature-item:before { content: "✓"; position: absolute; left: 0; color: #667eea; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎬 Welcome to ClipCrafters!</h1>
              <p>Your AI-Powered Video Editing Journey Starts Here</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Welcome to ClipCrafters! We're excited to have you on board.</p>
              <div class="features">
                <h3>What you can do:</h3>
                <div class="feature-item">Create AI-powered videos from text</div>
                <div class="feature-item">Edit scenes with precision</div>
                <div class="feature-item">Collaborate with your team</div>
                <div class="feature-item">Generate voiceovers automatically</div>
                <div class="feature-item">Track your project history</div>
              </div>
              <p style="text-align: center;">
                <a href="http://localhost:3000/dashboard" class="button">Get Started</a>
              </p>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Happy creating!</p>
              <p><strong>The ClipCrafters Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to,
      subject: 'Welcome to ClipCrafters - AI Video Editing',
      html,
      text: `Welcome to ClipCrafters, ${name}! Start creating amazing AI-powered videos today.`
    });
  }

  /**
   * Send project notification email
   * @param {string} to - Recipient email
   * @param {string} name - User name
   * @param {string} projectTitle - Project title
   * @param {string} projectId - Project ID
   * @returns {Promise<object>}
   */
  async sendProjectNotification(to, name, projectTitle, projectId) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .project-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Video Ready!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Great news! Your project is ready.</p>
              <div class="project-box">
                <h3>${projectTitle}</h3>
                <p>Your AI-generated video has been successfully created and is ready to view.</p>
              </div>
              <p style="text-align: center;">
                <a href="http://localhost:3000/projects/${projectId}" class="button">View Project</a>
              </p>
              <p>You can now review, edit, and share your video.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to,
      subject: `Your project "${projectTitle}" is ready!`,
      html,
      text: `Your project "${projectTitle}" video is ready! View it at: http://localhost:3000/projects/${projectId}`
    });
  }

  /**
   * Send video generation complete notification
   * @param {string} to - Recipient email
   * @param {string} name - User name
   * @param {string} videoTitle - Video title
   * @param {string} videoId - Video ID
   * @returns {Promise<object>}
   */
  async sendVideoCompleteNotification(to, name, videoTitle, videoId) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Video Generated Successfully!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Your video <strong>"${videoTitle}"</strong> has been generated successfully!</p>
              <p style="text-align: center;">
                <a href="http://localhost:3000/videos/${videoId}" class="button">Watch Video</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to,
      subject: `Video "${videoTitle}" generated successfully!`,
      html,
      text: `Your video "${videoTitle}" has been generated successfully! Watch it at: http://localhost:3000/videos/${videoId}`
    });
  }
}

export default new EmailService();
