/**
 * CourseHub — Express Application Configuration
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Allowed frontend origins (configurable via FRONTEND_URL or local Vite dev ports)
const configuredOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = [
  configuredOrigin,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like curl, mobile apps, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Mock-Role'],
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight sanitized request logging in development
if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
    });
    next();
  });
}

// API Root Index
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'CourseHub Backend REST API',
    version: '1.0.0',
    description: 'Educational Video-on-Demand Platform API',
    status: 'healthy',
    documentation: {
      health: 'GET /api/health',
      videos: 'GET /api/videos',
      singleVideo: 'GET /api/videos/:id',
      createVideo: 'POST /api/videos (Teacher auth required)',
    },
    cloudTarget: 'AWS (DynamoDB, S3, MediaConvert, EventBridge, CloudFront)',
  });
});

// Mount API routes
app.use('/api', apiRouter);

// 404 Not Found Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
