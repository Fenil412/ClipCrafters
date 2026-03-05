import express from 'express';
import {
  getScenesByVideo,
  getScene,
  updateScene,
  deleteScene
} from '../controllers/scene.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/video/:videoId', getScenesByVideo);
router.get('/:id', getScene);
router.put('/:id', updateScene);
router.delete('/:id', deleteScene);

export default router;
