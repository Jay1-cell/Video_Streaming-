/**
 * CourseHub — Video API Routes
 */

import { Router } from 'express';
import { VideoController } from '../controllers/video.controller.js';
import { requireAuth, requireRole } from '../middleware/authGuard.js';
import { validateVideoInput } from '../middleware/videoValidator.js';

const router = Router();

// Public read endpoints for video catalog
router.get('/', VideoController.getAllVideos);
router.get('/:id', VideoController.getVideoById);

// Teacher-protected write endpoint
// In production: Amazon Cognito JWT token validation + 'Teachers' group membership
router.post(
  '/',
  requireAuth,
  requireRole('Teacher'),
  validateVideoInput,
  VideoController.createVideo
);

export default router;
