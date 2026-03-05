import videoService from '../services/video.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Generate video from text
 * POST /api/videos/generate
 */
export const generateVideo = asyncHandler(async (req, res) => {
  const { projectId, text, title } = req.body;

  if (!projectId || !text) {
    return ApiResponse.error('Project ID and text are required', 400).send(res);
  }

  const video = await videoService.createVideoFromText(
    projectId,
    req.user.id,
    text,
    title
  );

  return ApiResponse.success(
    'Video generation started',
    video,
    201
  ).send(res);
});

/**
 * Upload video file
 * POST /api/videos/upload
 */
export const uploadVideo = asyncHandler(async (req, res) => {
  if (!req.file) {
    return ApiResponse.error('No file uploaded', 400).send(res);
  }

  const { projectId, title } = req.body;

  if (!projectId) {
    return ApiResponse.error('Project ID is required', 400).send(res);
  }

  // Handle file upload logic here
  const fileUrl = `/uploads/${req.file.filename}`;

  return ApiResponse.success('Video uploaded successfully', {
    filename: req.file.filename,
    url: fileUrl,
    size: req.file.size
  }).send(res);
});

/**
 * Get video by ID
 * GET /api/videos/:id
 */
export const getVideo = asyncHandler(async (req, res) => {
  const video = await videoService.getVideo(req.params.id, req.user.id);

  return ApiResponse.success('Video retrieved', video).send(res);
});

/**
 * Get scenes for video
 * GET /api/videos/:id/scenes
 */
export const getVideoScenes = asyncHandler(async (req, res) => {
  const scenes = await videoService.getScenesByVideo(req.params.id, req.user.id);

  return ApiResponse.success('Scenes retrieved', scenes).send(res);
});
