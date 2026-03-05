import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config/env.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import { generalLimiter } from './middlewares/rateLimit.middleware.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import videoRoutes from './routes/video.routes.js';
import sceneRoutes from './routes/scene.routes.js';
import editRoutes from './routes/edit.routes.js';
import otpRoutes from './routes/otp.routes.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use('/api', generalLimiter);

// Static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', otpRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/scenes', sceneRoutes);
app.use('/api/edits', editRoutes);

// Root route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'AI Agentic Video Editing System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      videos: '/api/videos',
      scenes: '/api/scenes',
      edits: '/api/edits'
    }
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
