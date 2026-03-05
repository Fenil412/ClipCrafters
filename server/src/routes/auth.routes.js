import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import { authLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

router.post('/register', authLimiter, registerValidator, register);
router.post('/login', authLimiter, loginValidator, login);
router.get('/me', authenticate, getMe);

export default router;
