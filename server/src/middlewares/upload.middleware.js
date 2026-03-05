import multer from 'multer';
import path from 'path';
import { config } from '../config/env.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt|mp4|avi|mov|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, MP4, AVI, MOV, MKV are allowed.'));
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: config.maxFileSize
  },
  fileFilter: fileFilter
});

// Error handler for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return ApiResponse.error('File too large', 400).send(res);
    }
    return ApiResponse.error(err.message, 400).send(res);
  } else if (err) {
    return ApiResponse.error(err.message, 400).send(res);
  }
  next();
};

export default upload;
