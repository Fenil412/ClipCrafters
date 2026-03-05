import express from 'express';
import {
  generateVideo,
  uploadVideo,
  getVideo,
  getVideoScenes
} from '../controllers/video.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import upload, { handleUploadError } from '../middlewares/upload.middleware.js';
import { uploadLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/generate', generateVideo);
router.post('/upload', uploadLimiter, upload.single('video'), handleUploadError, uploadVideo);
router.get('/:id', getVideo);
router.get('/:id/scenes', getVideoScenes);

export default router;
