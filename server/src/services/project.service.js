import { Project, User } from '../models/index.js';
import logger from '../utils/logger.js';

class ProjectService {
  /**
   * Create new project
   */
  async createProject(userId, projectData) {
    try {
      const project = await Project.create({
        ...projectData,
        owner: userId
      });

      // Add project to user's projects array
      await User.findByIdAndUpdate(userId, {
        $push: { projects: project._id }
      });

      logger.info(`Project created: ${project._id} by user: ${userId}`);

      return await project.populate('owner', 'name email');
    } catch (error) {
      logger.error('Create project error:', error);
      throw error;
    }
  }

  /**
   * Get all projects for a user
   */
  async getProjectsByUser(userId, filters = {}) {
    try {
      const query = {
        $or: [
          { owner: userId },
          { collaborators: userId }
        ]
      };

      if (filters.status) {
        query.status = filters.status;
      }

      const projects = await Project.find(query)
        .populate('owner', 'name email')
        .populate('collaborators', 'name email')
        .populate('videos', 'title generationStatus duration')
        .sort({ createdAt: -1 });

      return projects;
    } catch (error) {
      logger.error('Get projects error:', error);
      throw error;
    }
  }

  /**
   * Get project by ID
   */
  async getProjectById(projectId, userId) {
    try {
      const project = await Project.findById(projectId)
        .populate('owner', 'name email')
        .populate('collaborators', 'name email')
        .populate({
          path: 'videos',
          select: 'title generationStatus duration createdAt',
          options: { sort: { createdAt: -1 } }
        });

      if (!project) {
        throw new Error('Project not found');
      }

      // Check if user has access
      const hasAccess = project.owner._id.toString() === userId ||
        project.collaborators.some(c => c._id.toString() === userId);

      if (!hasAccess) {
        throw new Error('Access denied');
      }

      return project;
    } catch (error) {
      logger.error('Get project error:', error);
      throw error;
    }
  }

  /**
   * Update project
   */
  async updateProject(projectId, userId, updateData) {
    try {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      // Check ownership
      if (project.owner.toString() !== userId) {
        throw new Error('Only project owner can update');
      }

      Object.assign(project, updateData);
      await project.save();

      logger.info(`Project updated: ${projectId}`);

      return await project.populate('owner', 'name email');
    } catch (error) {
      logger.error('Update project error:', error);
      throw error;
    }
  }

  /**
   * Delete project
   */
  async deleteProject(projectId, userId) {
    try {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      // Check ownership
      if (project.owner.toString() !== userId) {
        throw new Error('Only project owner can delete');
      }

      await project.deleteOne();

      // Remove from user's projects
      await User.findByIdAndUpdate(userId, {
        $pull: { projects: projectId }
      });

      logger.info(`Project deleted: ${projectId}`);

      return { message: 'Project deleted successfully' };
    } catch (error) {
      logger.error('Delete project error:', error);
      throw error;
    }
  }

  /**
   * Add collaborator to project
   */
  async addCollaborator(projectId, userId, collaboratorEmail) {
    try {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      if (project.owner.toString() !== userId) {
        throw new Error('Only project owner can add collaborators');
      }

      const collaborator = await User.findOne({ email: collaboratorEmail });

      if (!collaborator) {
        throw new Error('Collaborator not found');
      }

      if (project.collaborators.includes(collaborator._id)) {
        throw new Error('User is already a collaborator');
      }

      project.collaborators.push(collaborator._id);
      await project.save();

      logger.info(`Collaborator added to project: ${projectId}`);

      return await project.populate('collaborators', 'name email');
    } catch (error) {
      logger.error('Add collaborator error:', error);
      throw error;
    }
  }
}

export default new ProjectService();
