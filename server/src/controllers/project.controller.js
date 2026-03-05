import { validationResult } from 'express-validator';
import projectService from '../services/project.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Create new project
 * POST /api/projects
 */
export const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(errors.array()[0].msg, 400).send(res);
  }

  const project = await projectService.createProject(req.user.id, req.body);

  return ApiResponse.success('Project created successfully', project, 201).send(res);
});

/**
 * Get all projects for current user
 * GET /api/projects
 */
export const getProjects = asyncHandler(async (req, res) => {
  const filters = {
    status: req.query.status
  };

  const projects = await projectService.getProjectsByUser(req.user.id, filters);

  return ApiResponse.success('Projects retrieved', projects).send(res);
});

/**
 * Get project by ID
 * GET /api/projects/:id
 */
export const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id, req.user.id);

  return ApiResponse.success('Project retrieved', project).send(res);
});

/**
 * Update project
 * PUT /api/projects/:id
 */
export const updateProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(errors.array()[0].msg, 400).send(res);
  }

  const project = await projectService.updateProject(req.params.id, req.user.id, req.body);

  return ApiResponse.success('Project updated successfully', project).send(res);
});

/**
 * Delete project
 * DELETE /api/projects/:id
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const result = await projectService.deleteProject(req.params.id, req.user.id);

  return ApiResponse.success(result.message, null).send(res);
});

/**
 * Add collaborator to project
 * POST /api/projects/:id/collaborators
 */
export const addCollaborator = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return ApiResponse.error('Collaborator email is required', 400).send(res);
  }

  const project = await projectService.addCollaborator(req.params.id, req.user.id, email);

  return ApiResponse.success('Collaborator added successfully', project).send(res);
});
