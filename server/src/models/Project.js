import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required'],
      index: true
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'processing', 'completed'],
      default: 'draft',
      index: true
    },
    sourceType: {
      type: String,
      enum: ['research-paper', 'lecture-notes', 'report', 'text'],
      required: [true, 'Source type is required']
    },
    sourceFile: {
      type: String,
      trim: true
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Compound index for efficient queries
projectSchema.index({ owner: 1, status: 1 });
projectSchema.index({ owner: 1, createdAt: -1 });

export default mongoose.model('Project', projectSchema);
