import { body, param } from 'express-validator';

export const createProjectValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('sourceType')
    .notEmpty()
    .withMessage('Source type is required')
    .isIn(['research-paper', 'lecture-notes', 'report', 'text'])
    .withMessage('Invalid source type')
];

export const updateProjectValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('status')
    .optional()
    .isIn(['draft', 'processing', 'completed'])
    .withMessage('Invalid status')
];

export const projectIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID')
];
