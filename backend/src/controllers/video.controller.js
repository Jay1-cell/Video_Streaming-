/**
 * CourseHub — Video Controller
 * 
 * Handles HTTP requests for video and course metadata operations.
 */

import { VideoService } from '../services/video.service.js';

export class VideoController {
  /**
   * GET /api/videos
   * Query parameters: category, search, status
   */
  static async getAllVideos(req, res, next) {
    try {
      const { category, search, status } = req.query;
      const videos = await VideoService.listVideos({ category, search, status });

      res.status(200).json({
        success: true,
        count: videos.length,
        filters: {
          category: category || 'All',
          search: search || null,
        },
        data: videos,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/videos/:id
   */
  static async getVideoById(req, res, next) {
    try {
      const { id } = req.params;
      const video = await VideoService.getVideoById(id);

      if (!video) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `Video or course with ID '${id}' was not found.`,
        });
      }

      res.status(200).json({
        success: true,
        data: video,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/videos
   * Requires Teacher role authentication
   */
  static async createVideo(req, res, next) {
    try {
      const payload = req.body;
      const creatorInfo = req.user || { name: 'Instructor', role: 'Teacher' };

      const createdVideo = await VideoService.createVideo(payload, creatorInfo);

      res.status(201).json({
        success: true,
        message: 'Video metadata created successfully (Mock Development Mode)',
        architectureNotice:
          'Phase 1 Prototype: Record saved to in-memory mock repository. Phase 2 will write to Amazon DynamoDB and issue S3 upload presigned URLs.',
        data: createdVideo,
      });
    } catch (err) {
      next(err);
    }
  }
}
