import { EditHistory } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Create edit history record
 * POST /api/edits
 */
export const createEditHistory = asyncHandler(async (req, res) => {
  const { sceneId, videoId, editType, previousValue, newValue, aiSuggested, version } = req.body;

  if (!sceneId || !videoId || !editType) {
    return ApiResponse.error('Scene ID, Video ID, and Edit Type are required', 400).send(res);
  }

  const editHistory = await EditHistory.create({
    sceneId,
    videoId,
    userId: req.user.id,
    editType,
    previousValue,
    newValue,
    aiSuggested: aiSuggested || false,
    version: version || 1
  });

  return ApiResponse.success('Edit history created', editHistory, 201).send(res);
});

/**
 * Get edit history for scene
 * GET /api/edits/scene/:sceneId
 */
export const getEditHistoryByScene = asyncHandler(async (req, res) => {
  const editHistory = await EditHistory.find({ sceneId: req.params.sceneId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  return ApiResponse.success('Edit history retrieved', editHistory).send(res);
});

/**
 * Get edit history for video
 * GET /api/edits/video/:videoId
 */
export const getEditHistoryByVideo = asyncHandler(async (req, res) => {
  const editHistory = await EditHistory.find({ videoId: req.params.videoId })
    .populate('userId', 'name email')
    .populate('sceneId', 'sceneNumber')
    .sort({ createdAt: -1 });

  return ApiResponse.success('Edit history retrieved', editHistory).send(res);
});

/**
 * Get edit history by user
 * GET /api/edits/user
 */
export const getEditHistoryByUser = asyncHandler(async (req, res) => {
  const editHistory = await EditHistory.find({ userId: req.user.id })
    .populate('sceneId', 'sceneNumber')
    .populate('videoId', 'title')
    .sort({ createdAt: -1 })
    .limit(50);

  return ApiResponse.success('Edit history retrieved', editHistory).send(res);
});
