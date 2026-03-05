import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    },
    otpHash: {
      type: String,
      required: [true, 'OTP hash is required']
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiry time is required']
    },
    deliveryMethod: {
      type: String,
      enum: ['sms', 'email'],
      required: [true, 'Delivery method is required']
    },
    recipient: {
      type: String,
      required: [true, 'Recipient is required'],
      trim: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// TTL index - automatically delete documents after expiry
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index for efficient queries
otpSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Otp', otpSchema);
