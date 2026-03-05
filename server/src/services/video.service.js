import { Video, Scene, Project } from '../models/index.js';
import aiService from './ai.service.js';
import logger from '../utils/logger.js';

class VideoService {
  /**
   * Create video from text input
   */
  async createVideoFromText(projectId, userId, textInput, title) {
    try {
      // Verify project exists and user has access
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }

      const hasAccess = project.owner.toString() === userId ||
        project.collaborators.some(c => c.toString() === userId);

      if (!hasAccess) {
        throw new Error('Access denied');
      }

      // Create video record
      const video = await Video.create({
        projectId,
        title: title || 'Untitled Video',
        generationStatus: 'processing',
        createdBy: userId
      });

      // Add video to project
      await Project.findByIdAndUpdate(projectId, {
        $push: { videos: video._id },
        status: 'processing'
      });

      logger.info(`Video created: ${video._id}`);

      // Generate script asynchronously
      this.generateVideoContent(video._id, projectId, textInput).catch(err => {
        logger.error('Video generation failed:', err);
      });

      return video;
    } catch (error) {
      logger.error('Create video error:', error);
      throw error;
    }
  }

  /**
   * Generate video content (script and scenes)
   */
  async generateVideoContent(videoId, projectId, textInput) {
    try {
      // Generate script
      const scriptResult = await aiService.generateScript(textInput, projectId, videoId);
      
      // Update video with script
      await Video.findByIdAndUpdate(videoId, {
        script: scriptResult.script
      });

      // Generate scenes
      const scenesResult = await aiService.generateScenes(scriptResult.script, projectId, videoId);

      // Create scene records
      const scenePromises = scenesResult.scenes.map((sceneData, index) => 
        Scene.create({
          videoId,
          sceneNumber: index + 1,
          scriptText: sceneData.scriptText,
          visualPrompt: sceneData.visualPrompt,
          duration: sceneData.duration || 5,
          aiGenerated: true,
          confidenceScore: sceneData.confidenceScore || 0.8,
          sourceReference: sceneData.sourceReference
        })
      );

      const scenes = await Promise.all(scenePromises);

      // Update video with scenes
      await Video.findByIdAndUpdate(videoId, {
        scenes: scenes.map(s => s._id),
        generationStatus: 'completed'
      });

      logger.info(`Video generation completed: ${videoId}`);

      return { video: videoId, scenes };
    } catch (error) {
      await Video.findByIdAndUpdate(videoId, {
        generationStatus: 'failed'
      });
      throw error;
    }
  }

  /**
   * Get video by ID
   */
  async getVideo(videoId, userId) {
    try {
      const video = await Video.findById(videoId)
        .populate('projectId', 'title owner collaborators')
        .populate('createdBy', 'name email')
        .populate('scenes');

      if (!video) {
        throw new Error('Video not found');
      }

      // Check access
      const hasAccess = video.projectId.owner.toString() === userId ||
        video.projectId.collaborators.some(c => c.toString() === userId);

      if (!hasAccess) {
        throw new Error('Access denied');
      }

      return video;
    } catch (error) {
      logger.error('Get video error:', error);
      throw error;
    }
  }

  /**
   * Get scenes by video ID
   */
  async getScenesByVideo(videoId, userId) {
    try {
      const video = await Video.findById(videoId).populate('projectId');

      if (!video) {
        throw new Error('Video not found');
      }

      const hasAccess = video.projectId.owner.toString() === userId ||
        video.projectId.collaborators.some(c => c.toString() === userId);

      if (!hasAccess) {
        throw new Error('Access denied');
      }

      const scenes = await Scene.find({ videoId }).sort({ sceneNumber: 1 });

      return scenes;
    } catch (error) {
      logger.error('Get scenes error:', error);
      throw error;
    }
  }
}

export default new VideoService();
