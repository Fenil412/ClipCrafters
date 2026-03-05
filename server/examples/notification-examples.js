/**
 * Notification Service Examples
 * Demonstrates how to use SMS, Email, and OTP services
 */

// ============================================
// 1. SMS SERVICE EXAMPLES
// ============================================

import smsService from '../src/services/notification/sms.service.js';
import emailService from '../src/services/notification/email.service.js';
import otpService from '../src/services/notification/otp.service.js';

// Example 1: Send basic SMS
async function sendBasicSMS() {
  try {
    const result = await smsService.sendSMS(
      '+919876543210',
      'Hello from ClipCrafters! Your video is ready.'
    );
    console.log('SMS sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 2: Send OTP via SMS
async function sendOTPSMS() {
  try {
    const result = await smsService.sendOTP('+919876543210', '482193');
    console.log('OTP SMS sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 3: Send project notification via SMS
async function sendProjectSMS() {
  try {
    const result = await smsService.sendProjectNotification(
      '+919876543210',
      'My AI Video Project'
    );
    console.log('Project notification sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 4: Send video complete notification via SMS
async function sendVideoCompleteSMS() {
  try {
    const result = await smsService.sendVideoCompleteNotification(
      '+919876543210',
      'Introduction to AI'
    );
    console.log('Video complete notification sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 5: Send welcome SMS
async function sendWelcomeSMSExample() {
  try {
    const result = await smsService.sendWelcomeSMS('+919876543210', 'John Doe');
    console.log('Welcome SMS sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ============================================
// 2. EMAIL SERVICE EXAMPLES
// ============================================

// Example 6: Send basic email
async function sendBasicEmail() {
  try {
    const result = await emailService.sendEmail({
      to: 'user@example.com',
      subject: 'Welcome to ClipCrafters',
      html: '<h1>Welcome!</h1><p>Start creating amazing videos today.</p>',
      text: 'Welcome! Start creating amazing videos today.'
    });
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 7: Send OTP via email
async function sendOTPEmail() {
  try {
    const result = await emailService.sendOTP(
      'user@example.com',
      '482193',
      'John Doe'
    );
    console.log('OTP email sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 8: Send welcome email
async function sendWelcomeEmailExample() {
  try {
    const result = await emailService.sendWelcomeEmail(
      'user@example.com',
      'John Doe'
    );
    console.log('Welcome email sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 9: Send project notification email
async function sendProjectEmail() {
  try {
    const result = await emailService.sendProjectNotification(
      'user@example.com',
      'John Doe',
      'My AI Video Project',
      'project_id_123'
    );
    console.log('Project notification email sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 10: Send video complete notification email
async function sendVideoCompleteEmail() {
  try {
    const result = await emailService.sendVideoCompleteNotification(
      'user@example.com',
      'John Doe',
      'Introduction to AI',
      'video_id_456'
    );
    console.log('Video complete email sent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ============================================
// 3. OTP SERVICE EXAMPLES
// ============================================

// Example 11: Generate OTP
function generateOTPExample() {
  const otp = otpService.generateOTP();
  console.log('Generated OTP:', otp);
}

// Example 12: Send OTP via SMS (full flow)
async function sendOTPviaSMSExample() {
  try {
    const result = await otpService.sendOTPviaSMS(
      'user_id_123',
      '+919876543210',
      'John Doe'
    );
    console.log('OTP sent via SMS:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 13: Send OTP via Email (full flow)
async function sendOTPviaEmailExample() {
  try {
    const result = await otpService.sendOTPviaEmail(
      'user_id_123',
      'user@example.com',
      'John Doe'
    );
    console.log('OTP sent via email:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 14: Verify OTP
async function verifyOTPExample() {
  try {
    const result = await otpService.verifyUserOTP('user_id_123', '482193');
    if (result.success) {
      console.log('OTP verified successfully!');
    } else {
      console.log('OTP verification failed:', result.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 15: Resend OTP
async function resendOTPExample() {
  try {
    const result = await otpService.resendOTP(
      'user_id_123',
      'email',
      'user@example.com',
      'John Doe'
    );
    console.log('OTP resent:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ============================================
// 4. INTEGRATION EXAMPLES
// ============================================

// Example 16: Complete OTP authentication flow
async function completeOTPFlow() {
  try {
    const userId = 'user_id_123';
    const email = 'user@example.com';
    const name = 'John Doe';

    // Step 1: Send OTP
    console.log('Step 1: Sending OTP...');
    const sendResult = await otpService.sendOTPviaEmail(userId, email, name);
    console.log('OTP sent:', sendResult.message);

    // Step 2: User enters OTP (simulated)
    const userEnteredOTP = '482193'; // In real app, this comes from user input

    // Step 3: Verify OTP
    console.log('Step 2: Verifying OTP...');
    const verifyResult = await otpService.verifyUserOTP(userId, userEnteredOTP);
    
    if (verifyResult.success) {
      console.log('✅ Authentication successful!');
      // Generate JWT token and proceed with login
    } else {
      console.log('❌ Authentication failed:', verifyResult.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 17: Send notifications after video generation
async function sendVideoNotifications(user, video) {
  try {
    // Send email notification
    await emailService.sendVideoCompleteNotification(
      user.email,
      user.name,
      video.title,
      video._id
    );

    // Send SMS notification if user has phone
    if (user.phone) {
      await smsService.sendVideoCompleteNotification(
        user.phone,
        video.title
      );
    }

    console.log('All notifications sent successfully!');
  } catch (error) {
    console.error('Error sending notifications:', error.message);
  }
}

// Example 18: Send welcome notifications after registration
async function sendWelcomeNotifications(user) {
  try {
    // Send welcome email
    await emailService.sendWelcomeEmail(user.email, user.name);

    // Send welcome SMS if user has phone
    if (user.phone) {
      await smsService.sendWelcomeSMS(user.phone, user.name);
    }

    console.log('Welcome notifications sent!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ============================================
// EXPORT EXAMPLES
// ============================================

export {
  // SMS Examples
  sendBasicSMS,
  sendOTPSMS,
  sendProjectSMS,
  sendVideoCompleteSMS,
  sendWelcomeSMSExample,
  
  // Email Examples
  sendBasicEmail,
  sendOTPEmail,
  sendWelcomeEmailExample,
  sendProjectEmail,
  sendVideoCompleteEmail,
  
  // OTP Examples
  generateOTPExample,
  sendOTPviaSMSExample,
  sendOTPviaEmailExample,
  verifyOTPExample,
  resendOTPExample,
  
  // Integration Examples
  completeOTPFlow,
  sendVideoNotifications,
  sendWelcomeNotifications
};

// ============================================
// RUN EXAMPLES (Uncomment to test)
// ============================================

// Uncomment the function you want to test:

// await sendBasicEmail();
// await sendOTPEmail();
// await sendWelcomeEmailExample();
// await completeOTPFlow();
