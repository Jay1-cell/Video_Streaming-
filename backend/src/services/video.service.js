/**
 * CourseHub — Video & Course Service
 * 
 * ============================================================================
 * ARCHITECTURAL NOTICE (PHASE 1, STEP 4)
 * ============================================================================
 * This service encapsulates the business logic for video course metadata.
 * In Phase 2, the data access methods will be migrated from the mock repository
 * to the Amazon DynamoDB Document Client (Single-Table Design: PK=COURSE#<id>, SK=METADATA).
 * ============================================================================
 */

import {
  queryMockVideos,
  findMockVideoById,
  insertMockVideo,
} from '../data/mockVideos.js';

export class VideoService {
  /**
   * List videos with optional category and keyword search filters
   * @param {object} filters { category, search, status }
   * @returns {Array<object>} list of matching videos
   */
  static async listVideos(filters = {}) {
    // In Phase 2: DynamoDB QueryCommand with GSI (e.g. GSI1PK = CATEGORY#<category>)
    return queryMockVideos(filters);
  }

  /**
   * Fetch a single video course by its unique ID
   * @param {string} id Video course identifier
   * @returns {object|null}
   */
  static async getVideoById(id) {
    // In Phase 2: DynamoDB GetItemCommand (PK: COURSE#<id>, SK: METADATA)
    return findMockVideoById(id);
  }

  /**
   * Create a new mock video metadata record
   * @param {object} payload { title, description, category, instructor, duration, status, tags }
   * @param {object} creatorInfo Information about the authenticated creator
   * @returns {object} created video record
   */
  static async createVideo(payload, creatorInfo = {}) {
    const timestamp = new Date().toISOString();
    const generatedId = `course-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    const newVideo = {
      id: generatedId,
      title: payload.title.trim(),
      description: payload.description.trim(),
      category: payload.category.trim(),
      instructor: payload.instructor?.trim() || creatorInfo.name || 'Instructor',
      instructorRole: payload.instructorRole?.trim() || 'Course Instructor',
      duration: payload.duration?.trim() || '0h 00m',
      lessonsCount: Number(payload.lessonsCount) || 1,
      level: payload.level?.trim() || 'Beginner',
      rating: 5.0,
      reviewsCount: 0,
      studentsCount: '0',
      status: payload.status || 'draft', // 'draft' | 'transcoding' | 'ready'
      tags: Array.isArray(payload.tags) ? payload.tags : [payload.category.trim()],
      targetHlsManifest: `https://d111111abcdef8.cloudfront.net/out/v1/${generatedId}/master.m3u8`,
      createdBy: creatorInfo.id || 'usr_dev_teacher',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // In Phase 2: DynamoDB PutItemCommand with ConditionExpression: attribute_not_exists(PK)
    return insertMockVideo(newVideo);
  }
}
