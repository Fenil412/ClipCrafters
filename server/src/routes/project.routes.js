import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addCollaborator
} from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  createProjectValidator,
  updateProjectValidator,
  projectIdValidator
} from '../validators/project.validator.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', createProjectValidator, createProject);
router.get('/', getProjects);
router.get('/:id', projectIdValidator, getProject);
router.put('/:id', updateProjectValidator, updateProject);
router.delete('/:id', projectIdValidator, deleteProject);
router.post('/:id/collaborators', projectIdValidator, addCollaborator);

export default router;
