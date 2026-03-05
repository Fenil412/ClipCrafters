import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ai-video-editing',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  fastApiUrl: process.env.FASTAPI_URL || 'http://localhost:8000',
  openAiApiKey: process.env.OPENAI_API_KEY,
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 100000000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Twilio Configuration
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER
  },
  
  // Resend Email Configuration
  resend: {
    apiKey: process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY,
    apiUrl: process.env.EMAIL_API_URL || 'https://api.resend.com/emails',
    from: process.env.EMAIL_FROM || 'ClipCrafters <no-reply@clipcrafters.app>',
    verifiedEmail: process.env.RESEND_VERIFIED_EMAIL
  }
};
