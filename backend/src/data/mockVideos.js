/**
 * CourseHub — Mock Video & Course Data Repository
 * 
 * ============================================================================
 * ARCHITECTURAL NOTICE (PHASE 1, STEP 4)
 * ============================================================================
 * This module provides an in-memory mock repository for video/course metadata.
 * It is structured to mirror the attributes and query patterns that will be
 * implemented using Amazon DynamoDB (Single-Table Design) in Phase 2.
 * 
 * DO NOT claim this data is persisted in a live database or cloud storage.
 * ============================================================================
 */

export const INITIAL_MOCK_VIDEOS = [
  {
    id: 'course-1',
    title: 'AWS Cloud Architecture: S3, Lambda & DynamoDB',
    category: 'Cloud Computing',
    instructor: 'Prof. Ramesh Kulkarni',
    instructorRole: 'Cloud Solutions Architect',
    duration: '6h 30m',
    lessonsCount: 18,
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 312,
    studentsCount: '1,840',
    description:
      'Learn how to architect serverless video-on-demand applications leveraging Amazon S3 storage, Lambda event triggers, and DynamoDB single-table design.',
    status: 'ready',
    tags: ['AWS', 'Serverless', 'DynamoDB', 'S3'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-1/master.m3u8',
    createdAt: '2026-09-15T09:00:00.000Z',
    updatedAt: '2026-10-01T14:30:00.000Z',
  },
  {
    id: 'course-2',
    title: 'Modern JavaScript (ES2024) & TypeScript Deep Dive',
    category: 'Programming',
    instructor: 'Elena Rostova',
    instructorRole: 'Staff Frontend Engineer',
    duration: '8h 15m',
    lessonsCount: 26,
    level: 'Beginner to Advanced',
    rating: 4.8,
    reviewsCount: 489,
    studentsCount: '2,650',
    description:
      'Master modern ECMAScript standards, asynchronous workflows, ES modules, TypeScript generics, and strict type safety for enterprise applications.',
    status: 'ready',
    tags: ['JavaScript', 'TypeScript', 'ES Modules'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-2/master.m3u8',
    createdAt: '2026-09-18T10:15:00.000Z',
    updatedAt: '2026-10-05T11:20:00.000Z',
  },
  {
    id: 'course-3',
    title: 'Production-Ready Express.js & Microservices',
    category: 'Web Development',
    instructor: 'Marcus Vance',
    instructorRole: 'Principal Backend Architect',
    duration: '5h 45m',
    lessonsCount: 15,
    level: 'Intermediate',
    rating: 4.7,
    reviewsCount: 215,
    studentsCount: '1,290',
    description:
      'Build robust REST APIs using Node.js and Express. Learn middleware patterns, error boundaries, rate limiting, and structured logging.',
    status: 'ready',
    tags: ['Node.js', 'Express', 'REST API', 'CORS'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-3/master.m3u8',
    createdAt: '2026-09-20T12:00:00.000Z',
    updatedAt: '2026-10-08T16:45:00.000Z',
  },
  {
    id: 'course-4',
    title: 'Automated Video Transcoding with MediaConvert & EventBridge',
    category: 'Cloud Computing',
    instructor: 'Dr. Sarah Chen',
    instructorRole: 'Media Cloud Engineer',
    duration: '7h 10m',
    lessonsCount: 20,
    level: 'Advanced',
    rating: 4.95,
    reviewsCount: 178,
    studentsCount: '980',
    description:
      'Explore cloud-based media transcoding pipelines. Discover how AWS Elemental MediaConvert, EventBridge, and SQS deliver adaptive bitrate HLS streaming.',
    status: 'ready',
    tags: ['MediaConvert', 'EventBridge', 'SQS', 'HLS'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-4/master.m3u8',
    createdAt: '2026-09-22T08:30:00.000Z',
    updatedAt: '2026-10-10T09:10:00.000Z',
  },
  {
    id: 'course-5',
    title: 'Python for Data Analysis & Statistical Modeling',
    category: 'Data Science',
    instructor: 'Ananya Sharma',
    instructorRole: 'Lead Data Scientist',
    duration: '9h 20m',
    lessonsCount: 32,
    level: 'Beginner',
    rating: 4.85,
    reviewsCount: 620,
    studentsCount: '3,410',
    description:
      'Gain hands-on skills in NumPy, Pandas, Matplotlib, and exploratory data analysis. Process large-scale datasets with high efficiency.',
    status: 'ready',
    tags: ['Python', 'Pandas', 'NumPy', 'Visualization'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-5/master.m3u8',
    createdAt: '2026-09-25T14:00:00.000Z',
    updatedAt: '2026-10-12T13:15:00.000Z',
  },
  {
    id: 'course-6',
    title: 'CloudFront CDN, Edge Security & High-Availability Streaming',
    category: 'Cloud Computing',
    instructor: 'Prof. Ramesh Kulkarni',
    instructorRole: 'Cloud Solutions Architect',
    duration: '4h 50m',
    lessonsCount: 12,
    level: 'Intermediate',
    rating: 4.75,
    reviewsCount: 142,
    studentsCount: '870',
    description:
      'Distribute video content globally with low latency using Amazon CloudFront distributions, origin shielding, signed URLs, and CloudWatch metrics.',
    status: 'ready',
    tags: ['CloudFront', 'CDN', 'CloudWatch', 'Security'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-6/master.m3u8',
    createdAt: '2026-09-28T16:20:00.000Z',
    updatedAt: '2026-10-14T15:00:00.000Z',
  },
  {
    id: 'course-7',
    title: 'Full-Stack React 18: Component Architecture & State',
    category: 'Web Development',
    instructor: 'David Miller',
    instructorRole: 'Senior UI/UX Developer',
    duration: '6h 55m',
    lessonsCount: 22,
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 390,
    studentsCount: '2,180',
    description:
      'Design maintainable, responsive single-page applications with React 18 hooks, custom state reducers, and performant client-side rendering.',
    status: 'ready',
    tags: ['React', 'Hooks', 'Vite', 'Responsive UI'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-7/master.m3u8',
    createdAt: '2026-10-02T11:00:00.000Z',
    updatedAt: '2026-10-15T10:45:00.000Z',
  },
  {
    id: 'course-8',
    title: 'Machine Learning Pipelines & Cloud Model Deployment',
    category: 'Data Science',
    instructor: 'Ananya Sharma',
    instructorRole: 'Lead Data Scientist',
    duration: '8h 40m',
    lessonsCount: 25,
    level: 'Advanced',
    rating: 4.88,
    reviewsCount: 276,
    studentsCount: '1,540',
    description:
      'Build end-to-end ML workflows from data preprocessing to model evaluation and cloud container deployment for real-time inference.',
    status: 'ready',
    tags: ['Machine Learning', 'Pipelines', 'Scikit-Learn'],
    targetHlsManifest: 'https://d111111abcdef8.cloudfront.net/out/v1/course-8/master.m3u8',
    createdAt: '2026-10-05T09:30:00.000Z',
    updatedAt: '2026-10-16T12:00:00.000Z',
  },
];

// In-memory collection initialized with mock dataset
let mockVideosStore = [...INITIAL_MOCK_VIDEOS];

/**
 * Fetch all mock videos with optional filtering
 */
export const queryMockVideos = ({ category, search, status } = {}) => {
  let results = [...mockVideosStore];

  if (category && category !== 'All Courses') {
    results = results.filter((v) => v.category.toLowerCase() === category.toLowerCase());
  }

  if (status) {
    results = results.filter((v) => v.status.toLowerCase() === status.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.instructor.toLowerCase().includes(q) ||
        (Array.isArray(v.tags) && v.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  return results;
};

/**
 * Fetch a single mock video by its ID
 */
export const findMockVideoById = (id) => {
  if (!id) return null;
  return mockVideosStore.find((v) => v.id.toLowerCase() === id.toLowerCase()) || null;
};

/**
 * Insert a new mock video record
 */
export const insertMockVideo = (videoRecord) => {
  mockVideosStore.unshift(videoRecord);
  return videoRecord;
};

/**
 * Reset mock repository back to initial state (useful for tests)
 */
export const resetMockVideos = () => {
  mockVideosStore = [...INITIAL_MOCK_VIDEOS];
};
