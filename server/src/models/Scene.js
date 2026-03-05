import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, 'Video ID is required'],
      index: true
    },
    sceneNumber: {
      type: Number,
      required: [true, 'Scene number is required'],
      min: [1, 'Scene number must be at least 1']
    },
    scriptText: {
      type: String,
      trim: true,
      maxlength: [5000, 'Script text cannot exceed 5000 characters']
    },
    visualPrompt: {
      type: String,
      trim: true,
      maxlength: [1000, 'Visual prompt cannot exceed 1000 characters']
    },
    visualUrl: {
      type: String,
      trim: true
    },
    voiceoverUrl: {
      type: String,
      trim: true
    },
    duration: {
      type: Number,
      default: 0,
      min: [0, 'Duration cannot be negative']
    },
    aiGenerated: {
      type: Boolean,
      default: true
    },
    sourceReference: {
      type: String,
      trim: true,
      maxlength: [500, 'Source reference cannot exceed 500 characters']
    },
    confidenceScore: {
      type: Number,
      min: [0, 'Confidence score must be between 0 and 1'],
      max: [1, 'Confidence score must be between 0 and 1'],
      default: null
    },
    version: {
      type: Number,
      default: 1,
      min: [1, 'Version must be at least 1']
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for efficient queries
sceneSchema.index({ videoId: 1, sceneNumber: 1 }, { unique: true });
sceneSchema.index({ videoId: 1, version: -1 });

export default mongoose.model('Scene', sceneSchema);
