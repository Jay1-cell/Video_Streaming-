# CourseHub — Educational Video-on-Demand Platform

CourseHub is a scalable, cloud-native educational video-on-demand (VOD) platform designed for an MCA Cloud Computing project. The platform facilitates instructor-led course creation, video uploading, automated cloud-based video transcoding, adaptive bitrate streaming, and student learning workflows.

---

## Target Technology Stack

### Frontend & Backend
- **Frontend**: React (v18), Vite, React Router (v7), JavaScript (ES Modules), Custom CSS Design System
- **Backend**: Node.js (v22+), Express.js (ES Modules), REST APIs, Modular Layered Architecture

### Cloud Services (AWS Target Architecture)
- **Identity & Auth**: Amazon Cognito User Pools (JWT-based authentication, Teacher/Student user groups)
- **Database**: Amazon DynamoDB (NoSQL single-table design for courses, users, and video metadata)
- **Storage**: Amazon S3 (Raw video uploads and transcoded HLS chunks)
- **Compute & Serverless**: AWS Lambda (Event-driven processing and triggers)
- **Media Processing**: AWS Elemental MediaConvert (Automated multi-resolution HLS transcoding)
- **Event Orchestration**: Amazon EventBridge & Amazon SQS (Decoupled job processing and lifecycle events)
- **Content Delivery**: Amazon CloudFront (Global CDN for low-latency video streaming)
- **Monitoring & Logging**: Amazon CloudWatch (Metrics, alarms, and audit logs)

---

## Current Project Status: Phase 1, Step 4 (Backend API Foundation)

At this phase:
- Modular Express backend architecture (`server.js`, `app.js`, `routes`, `controllers`, `services`, `middleware`, `data`).
- REST endpoints for **Health** and **Video Course Metadata** (`GET /api/health`, `GET /api/videos`, `GET /api/videos/:id`, `POST /api/videos`).
- **Authorization Guard & Role Preparation**: Backend independently enforces `requireAuth` and `requireRole('Teacher')` on write operations.
- Input validation middleware checking title, description, and domain categories.
- Zero external database or cloud credentials configured yet (in-memory mock repository layer ready for DynamoDB DocumentClient).

---

## Project Structure

```
coursehub/
├── .gitignore               # Root git ignore rules (node_modules, builds, secrets, .env)
├── README.md                # Project documentation and setup guide
├── backend/                 # Express.js REST API service
│   ├── .env.example         # Environment template for backend
│   ├── package.json         # Backend dependencies and scripts
│   └── src/
│       ├── app.js           # Express application configuration & middleware
│       ├── server.js        # Server listener and graceful process termination
│       ├── routes/
│       │   ├── index.js     # API router mounting /api subroutes
│       │   ├── health.routes.js # GET /api/health
│       │   └── video.routes.js  # GET & POST /api/videos
│       ├── controllers/
│       │   ├── health.controller.js # Health status handler
│       │   └── video.controller.js  # Video catalog handlers
│       ├── services/
│       │   └── video.service.js     # Business logic & DynamoDB abstraction layer
│       ├── middleware/
│       │   ├── authGuard.js         # Authorization & role verification middleware
│       │   ├── videoValidator.js    # Payload validation for video creation
│       │   ├── notFoundHandler.js   # 404 handler returning JSON
│       │   └── errorHandler.js      # Centralized error handler
│       └── data/
│           └── mockVideos.js        # In-memory mock repository
└── frontend/                # React single-page application (Vite + React Router)
    ├── .env.example         # Environment template for frontend
    ├── index.html           # HTML entry document
    ├── package.json         # Frontend dependencies and scripts
    ├── vite.config.js       # Vite configuration
    └── src/
        ├── context/
        │   └── AuthContext.jsx       # Authentication state, session, and role provider
        ├── services/
        │   ├── authService.js       # Isolated prototype authentication service
        │   └── videoApi.js          # API client with resilient local fallback
        ├── components/
        │   ├── ProtectedRoute.jsx   # Role-based route guard
        │   ├── Navbar.jsx           # Role-aware navigation bar
        │   ├── Hero.jsx             # VOD search and introduction hero
        │   ├── CategoryFilters.jsx  # Domain category chips
        │   ├── CourseGrid.jsx       # Responsive course grid with empty/loading states
        │   ├── CourseCard.jsx       # Video course card with Watch & Preview actions
        │   ├── CourseModal.jsx      # Quick syllabus preview modal
        │   ├── UploadModal.jsx      # Phase 2 upload roadmap dialog
        │   └── Footer.jsx           # Platform footer with AWS stack badges
        ├── pages/
        │   ├── HomePage.jsx         # Main catalog, search, and category exploration
        │   ├── UploadPage.jsx       # Teacher-only video ingestion form
        │   ├── PlayerPage.jsx       # Video player page with stream status notices
        │   ├── Login.jsx            # Sign in with Teacher/Student role selection
        │   ├── Signup.jsx           # Registration with role selection
        │   ├── TeacherDashboard.jsx # Teacher course management and metrics
        │   ├── StudentDashboard.jsx # Student enrolled courses & continue learning
        │   └── Unauthorized.jsx     # 403 Forbidden page for restricted roles
        ├── data/
        │   └── sampleCourses.js     # Client-side sample course catalog
        ├── App.jsx                  # Main router and application skeleton
        ├── App.css                  # Comprehensive design system and responsive styles
        ├── index.css                # Global font and base typography resets
        └── main.jsx                 # React root bootstrap
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v22+ installed)
- **npm**: v9.0.0 or later

---

### Running the Backend

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Backend listens at `http://localhost:5001`.

---

### Running the Frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Backend API Specification & Example Requests

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns server operational status, uptime, and target cloud architecture.
- **Example Request**:
  ```bash
  curl http://localhost:5001/api/health
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "service": "coursehub-backend",
    "version": "1.0.0",
    "uptime": 12.45,
    "timestamp": "2026-10-18T18:15:00.000Z",
    "environment": "development",
    "cloudArchitectureTarget": "AWS (DynamoDB, S3, MediaConvert, EventBridge, CloudFront)"
  }
  ```

---

### 2. List All Videos / Courses
- **Endpoint**: `GET /api/videos`
- **Query Parameters**:
  - `category` *(optional)*: Filter by domain (`Cloud Computing`, `Programming`, `Web Development`, `Data Science`)
  - `search` *(optional)*: Keyword search across title, description, instructor, and tags
- **Example Requests**:
  ```bash
  # Fetch all courses
  curl http://localhost:5001/api/videos

  # Filter by category
  curl "http://localhost:5001/api/videos?category=Cloud%20Computing"

  # Search by keyword
  curl "http://localhost:5001/api/videos?search=DynamoDB"
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 3,
    "filters": {
      "category": "Cloud Computing",
      "search": null
    },
    "data": [
      {
        "id": "course-1",
        "title": "AWS Cloud Architecture: S3, Lambda & DynamoDB",
        "category": "Cloud Computing",
        "instructor": "Prof. Ramesh Kulkarni",
        "duration": "6h 30m",
        "status": "ready",
        "targetHlsManifest": "https://d111111abcdef8.cloudfront.net/out/v1/course-1/master.m3u8"
      }
    ]
  }
  ```

---

### 3. Get Single Video by ID
- **Endpoint**: `GET /api/videos/:id`
- **Example Request**:
  ```bash
  curl http://localhost:5001/api/videos/course-1
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "course-1",
      "title": "AWS Cloud Architecture: S3, Lambda & DynamoDB",
      "category": "Cloud Computing",
      "instructor": "Prof. Ramesh Kulkarni",
      "duration": "6h 30m",
      "lessonsCount": 18,
      "status": "ready",
      "rating": 4.9
    }
  }
  ```
- **Missing Record Response (404 Not Found)**:
  ```json
  {
    "success": false,
    "error": "Not Found",
    "message": "Video or course with ID 'nonexistent' was not found."
  }
  ```

---

### 4. Create Video Metadata (Teacher-Only)
- **Endpoint**: `POST /api/videos`
- **Authorization**: Requires Bearer token with Teacher role or `x-mock-role: Teacher`
- **Example Request**:
  ```bash
  curl -X POST http://localhost:5001/api/videos \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer prototype-token-teacher-123" \
    -H "x-mock-role: Teacher" \
    -d '{
      "title": "Event-Driven Microservices with AWS EventBridge & Lambda",
      "description": "Comprehensive walkthrough of decoupled asynchronous event patterns in AWS for serverless systems.",
      "category": "Cloud Computing",
      "instructor": "Prof. Ramesh Kulkarni",
      "duration": "4h 15m",
      "status": "draft",
      "tags": ["AWS", "EventBridge", "Lambda"]
    }'
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Video metadata created successfully (Mock Development Mode)",
    "architectureNotice": "Phase 1 Prototype: Record saved to in-memory mock repository. Phase 2 will write to Amazon DynamoDB and issue S3 upload presigned URLs.",
    "data": {
      "id": "course-mf8w4-89k2",
      "title": "Event-Driven Microservices with AWS EventBridge & Lambda",
      "category": "Cloud Computing",
      "status": "draft",
      "createdAt": "2026-10-18T18:15:30.000Z"
    }
  }
  ```

- **Unauthorized Response without Token (401 Unauthorized)**:
  ```json
  {
    "success": false,
    "error": "Unauthorized",
    "message": "Authentication required. Please provide a valid Authorization Bearer token."
  }
  ```

- **Forbidden Response with Student Token (403 Forbidden)**:
  ```json
  {
    "success": false,
    "error": "Forbidden",
    "message": "Access denied. Endpoint requires 'Teacher' authorization. Current role: 'Student'."
  }
  ```

- **Validation Failure Response (400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": "Validation Error",
    "message": "One or more required fields failed validation.",
    "errors": [
      { "field": "title", "message": "Title must be at least 5 characters long." },
      { "field": "description", "message": "Description must be at least 15 characters long." },
      { "field": "category", "message": "Category is required. Must be one of: Cloud Computing, Programming, Web Development, Data Science." }
    ]
  }
  ```

---

## Prototype Authentication Testing

The platform includes a convenient **Local Prototype Authentication Mode**:

### Roles & Access Matrix
| Role | Permitted Pages & APIs | Restricted Pages & APIs |
| :--- | :--- | :--- |
| **Guest (Logged Out)** | `/`, `/player`, `/login`, `/signup`, `GET /api/videos` | `/upload`, `/teacher/dashboard`, `POST /api/videos` |
| **Student** | `/`, `/player`, `/student/dashboard`, `GET /api/videos` | `/upload`, `POST /api/videos` *(returns 403 Forbidden)* |
| **Teacher** | `/`, `/player`, `/upload`, `/teacher/dashboard`, `POST /api/videos` | `/student/dashboard` |

### Quick Test Accounts (Available on `/login` via One-Click Buttons):
- **Teacher**: Click "Fill Teacher" &rarr; Email: `teacher@coursehub.edu`, Password: `teacher123`, Role: `Teacher`
- **Student**: Click "Fill Student" &rarr; Email: `student@coursehub.edu`, Password: `student123`, Role: `Student`

---

## Security Limitations & Production Roadmap

> [!IMPORTANT]
> **Prototype Limitations:**
> 1. In Phase 1 Step 4, write operations are **development-only mock operations**; they do not persist to a live database.
> 2. Client-side route guards control interface visibility only; the backend independently enforces `authGuard` on write endpoints.
> 3. No real video uploads, streaming, or external databases are active yet.

### Production Roadmap (Phase 2 & 3):
1. **Amazon Cognito User Pools**: Replace prototype token inspection in `authGuard.js` with cryptographic JWT validation using `@aws-jwt-verify` against the Cognito JWKS endpoint.
2. **Amazon DynamoDB Repository**: Swap `mockVideos.js` with `@aws-sdk/lib-dynamodb` executing `PutCommand`, `GetCommand`, and `QueryCommand` using a Single-Table Design schema.
3. **Amazon S3 Presigned URLs**: Introduce `POST /api/videos/upload-url` returning presigned PUT URLs for browser-to-S3 direct ingestion.
