import { Scene, Video, EditHistory } from '../models/index.js';
import logger from '../utils/logger.js';

class SceneService {
  /**
   * Update scene
   */
  async updateScene(sceneId, userId, updateData) {
    try {
      const scene = await Scene.findById(sceneId).populate({
        path: 'videoId',
        populate: { path: 'projectId' }
      });

      if (!scene) {
        throw new Error('Scene not found');
      }

      // Check access
      const project = scene.videoId.projectId;
      const hasAccess = project.owner.toString() === userId ||
        project.collaborators.some(c => c.toString() === userId);

      if (!hasAccess) {
        throw new Error('Access denied');
      }

      // Track changes for edit history
      const changes = [];
      
      if (updateData.scriptText && updateData.scriptText !== scene.scriptText) {
        changes.push({
          editType: 'script',
          previousValue: scene.scriptText,
          newValue: updateData.scriptText
        });
      }

      if (updateData.visualPrompt && updateData.visualPrompt !== scene.visualPrompt) {
        changes.push({
          editType: 'visual',
          previousValue: scene.visualPrompt,
          newValue: updateData.visualPrompt
        });
      }

      // Update scene
      Object.assign(scene, updateData);
      scene.version += 1;
      await scene.save();

      // Create edit history records
      for (const change of changes) {
        await EditHistory.create({
          sceneId: scene._id,
          videoId: scene.videoId._id,
          userId,
          editType: change.editType,
          previousValue: change.previousValue,
          newValue: change.newValue,
          aiSuggested: false,
          version: scene.version
        });
      }

      logger.info(`Scene updated: ${sceneId}`);

      return scene;
    } catch (error) {
      logger.error('Update scene error:', error);
      throw error;
    }
  }

  /**
   * Get scene by ID
   */
  async getScene(sceneId, userId) {
    try {
      const scene = await Scene.findById(sceneId).populate({
        path: 'videoId',
        populate: { path: 'projectId' }
      });

      if (!scene) {
        throw new Error('Scene not found');
      }

      const project = scene.videoId.projectId;
      const hasAccess = project.owner.toString() === userId ||
        project.collaborators.some(c => c.toString() === userId);

      if (!hasAccess) {
        throw new Error('Access denied');
      }

      return scene;
    } catch (error) {
      logger.error('Get scene error:', error);
      throw error;
    }
  }

  /**
   * Delete scene
   */
  async deleteScene(sceneId, userId) {
    try {
      const scene = await Scene.findById(sceneId).populate({
        path: 'videoId',
        populate: { path: 'projectId' }
      });

      if (!scene) {
        throw new Error('Scene not found');
      }

      const project = scene.videoId.projectId;
      const hasAccess = project.owner.toString() === userId;

      if (!hasAccess) {
        throw new Error('Only project owner can delete scenes');
      }

      await scene.deleteOne();

      // Remove from video
      await Video.findByIdAndUpdate(scene.videoId, {
        $pull: { scenes: sceneId }
      });

      logger.info(`Scene deleted: ${sceneId}`);

      return { message: 'Scene deleted successfully' };
    } catch (error) {
      logger.error('Delete scene error:', error);
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
      logger.error('Get scenes by video error:', error);
      throw error;
    }
  }
}

export default new SceneService();
