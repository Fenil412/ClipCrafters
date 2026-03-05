import mongoose from 'mongoose';

const aiGenerationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ID is required'],
      index: true
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      index: true
    },
    agentType: {
      type: String,
      enum: ['script-agent', 'visual-agent', 'voice-agent', 'factcheck-agent'],
      required: [true, 'Agent type is required'],
      index: true
    },
    inputData: {
      type: mongoose.Schema.Types.Mixed
    },
    outputData: {
      type: mongoose.Schema.Types.Mixed
    },
    modelUsed: {
      type: String,
      trim: true,
      maxlength: [100, 'Model name cannot exceed 100 characters']
    },
    tokensUsed: {
      type: Number,
      default: 0,
      min: [0, 'Tokens used cannot be negative']
    },
    latencyMs: {
      type: Number,
      default: 0,
      min: [0, 'Latency cannot be negative']
    },
    status: {
      type: String,
      enum: ['success', 'failed'],
      required: [true, 'Status is required']
    },
    errorMessage: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for analytics and monitoring
aiGenerationSchema.index({ projectId: 1, agentType: 1 });
aiGenerationSchema.index({ agentType: 1, status: 1, createdAt: -1 });
aiGenerationSchema.index({ projectId: 1, createdAt: -1 });

export default mongoose.model('AIGeneration', aiGenerationSchema);
