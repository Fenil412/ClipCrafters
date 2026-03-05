import app from './src/app.js';
import connectDB from './src/config/database.js';
import { config } from './src/config/env.js';
import logger from './src/utils/logger.js';
import fs from 'fs';

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
  logger.info('Uploads directory created');
}

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  logger.info(`API available at http://localhost:${config.port}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});
