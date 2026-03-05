import mongoose from 'mongoose';

const editHistorySchema = new mongoose.Schema(
  {
    sceneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scene',
      required: [true, 'Scene ID is required'],
      index: true
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, 'Video ID is required'],
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    },
    editType: {
      type: String,
      enum: ['script', 'visual', 'voice', 'scene-order'],
      required: [true, 'Edit type is required']
    },
    previousValue: {
      type: mongoose.Schema.Types.Mixed
    },
    newValue: {
      type: mongoose.Schema.Types.Mixed
    },
    aiSuggested: {
      type: Boolean,
      default: false
    },
    version: {
      type: Number,
      required: [true, 'Version is required'],
      min: [1, 'Version must be at least 1']
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for efficient queries
editHistorySchema.index({ sceneId: 1, createdAt: -1 });
editHistorySchema.index({ videoId: 1, createdAt: -1 });
editHistorySchema.index({ userId: 1, createdAt: -1 });
editHistorySchema.index({ videoId: 1, editType: 1 });

export default mongoose.model('EditHistory', editHistorySchema);
