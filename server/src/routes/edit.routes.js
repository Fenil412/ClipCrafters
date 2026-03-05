import express from 'express';
import {
  createEditHistory,
  getEditHistoryByScene,
  getEditHistoryByVideo,
  getEditHistoryByUser
} from '../controllers/edit.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', createEditHistory);
router.get('/scene/:sceneId', getEditHistoryByScene);
router.get('/video/:videoId', getEditHistoryByVideo);
router.get('/user', getEditHistoryByUser);

export default router;
