import sceneService from '../services/scene.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Get scenes by video ID
 * GET /api/scenes/video/:videoId
 */
export const getScenesByVideo = asyncHandler(async (req, res) => {
  const scenes = await sceneService.getScenesByVideo(req.params.videoId, req.user.id);

  return ApiResponse.success('Scenes retrieved', scenes).send(res);
});

/**
 * Get scene by ID
 * GET /api/scenes/:id
 */
export const getScene = asyncHandler(async (req, res) => {
  const scene = await sceneService.getScene(req.params.id, req.user.id);

  return ApiResponse.success('Scene retrieved', scene).send(res);
});

/**
 * Update scene
 * PUT /api/scenes/:id
 */
export const updateScene = asyncHandler(async (req, res) => {
  const { scriptText, visualPrompt, voiceoverUrl, visualUrl, duration } = req.body;

  const updateData = {};
  if (scriptText !== undefined) updateData.scriptText = scriptText;
  if (visualPrompt !== undefined) updateData.visualPrompt = visualPrompt;
  if (voiceoverUrl !== undefined) updateData.voiceoverUrl = voiceoverUrl;
  if (visualUrl !== undefined) updateData.visualUrl = visualUrl;
  if (duration !== undefined) updateData.duration = duration;

  const scene = await sceneService.updateScene(req.params.id, req.user.id, updateData);

  return ApiResponse.success('Scene updated successfully', scene).send(res);
});

/**
 * Delete scene
 * DELETE /api/scenes/:id
 */
export const deleteScene = asyncHandler(async (req, res) => {
  const result = await sceneService.deleteScene(req.params.id, req.user.id);

  return ApiResponse.success(result.message, null).send(res);
});
