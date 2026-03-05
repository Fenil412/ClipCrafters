import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ID is required'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    duration: {
      type: Number,
      default: 0,
      min: [0, 'Duration cannot be negative']
    },
    script: {
      type: String,
      trim: true
    },
    voiceoverUrl: {
      type: String,
      trim: true
    },
    finalVideoUrl: {
      type: String,
      trim: true
    },
    generationStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      index: true
    },
    aiAgentVersion: {
      type: String,
      trim: true
    },
    scenes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scene'
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required']
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for efficient queries
videoSchema.index({ projectId: 1, generationStatus: 1 });
videoSchema.index({ projectId: 1, createdAt: -1 });

export default mongoose.model('Video', videoSchema);
