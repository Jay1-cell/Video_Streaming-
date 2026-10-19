/**
 * CourseHub — Frontend API Client for Video & Course Metadata
 * 
 * ============================================================================
 * ARCHITECTURAL NOTICE (PHASE 1, STEP 4)
 * ============================================================================
 * This service communicates with the Express backend REST API (`/api/videos`).
 * It includes an automated fallback to the local sample dataset if the backend
 * server is unreachable or offline, ensuring zero UI regressions.
 * ============================================================================
 */

import { SAMPLE_COURSES } from '../data/sampleCourses.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

/**
 * Fetch video courses from the backend API with fallback
 */
export const fetchVideos = async ({ category, search } = {}) => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All Courses') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());

    const url = `${API_BASE_URL}/videos${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const json = await res.json();
    return { data: json.data, source: 'backend-api' };
  } catch (err) {
    console.info('[VideoAPI] Backend unreachable or offline. Falling back to local sample dataset:', err.message);

    // Fallback filter on local dataset
    let fallback = [...SAMPLE_COURSES];
    if (category && category !== 'All Courses') {
      fallback = fallback.filter((c) => c.category === category);
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      fallback = fallback.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return { data: fallback, source: 'local-fallback' };
  }
};

/**
 * Fetch single video course by ID with fallback
 */
export const fetchVideoById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/videos/${id}`, {
      headers: { Accept: 'application/json' },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API returned status ${res.status}`);

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.info(`[VideoAPI] Backend unavailable for ID ${id}. Using local sample lookup.`);
    return SAMPLE_COURSES.find((c) => c.id === id) || null;
  }
};

/**
 * Create a new video course record via Teacher-authorized POST /api/videos
 */
export const createVideoMetadata = async (videoPayload, userToken = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (userToken) {
    headers['Authorization'] = `Bearer ${userToken}`;
    headers['X-Mock-Role'] = 'Teacher';
  }

  const res = await fetch(`${API_BASE_URL}/videos`, {
    method: 'POST',
    headers,
    body: JSON.stringify(videoPayload),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || json.error || 'Failed to create video metadata.');
  }

  return json;
};
