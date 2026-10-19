import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { SAMPLE_COURSES } from '../data/sampleCourses.js';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Teacher courses from sample dataset
  const teacherCourses = SAMPLE_COURSES.slice(0, 3); // Featured instructor courses
  const draftCourses = []; // Empty state demonstration

  const displayedCourses = activeTab === 'drafts' ? draftCourses : teacherCourses;

  return (
    <div className="dashboard-page-wrapper">
      {/* Breadcrumb */}
      <div className="page-breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">&rsaquo;</span>
        <span className="breadcrumb-current">Teacher Dashboard</span>
      </div>

      <div className="dashboard-content">
        {/* Welcome Header */}
        <header className="dashboard-hero-card">
          <div className="dashboard-hero-info">
            <div className="role-pill-badge teacher-badge">Instructor Account</div>
            <h1 className="dashboard-welcome-title">
              Welcome back, <span className="highlight-text">{user?.name || 'Instructor'}</span>!
            </h1>
            <p className="dashboard-subtitle">
              Manage your educational video curriculum, monitor student engagement, and upload new video modules.
            </p>
          </div>

          <div className="dashboard-hero-actions">
            <Link to="/upload" className="btn-primary-action upload-hero-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Video Course
            </Link>
          </div>
        </header>

        {/* Prototype Architecture Banner */}
        <div className="prototype-dashboard-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <strong>Phase 1 Teacher Dashboard Prototype:</strong>
            <span>
              {' '}Currently displaying local sample course records. DynamoDB CRUD persistence and Amazon S3 video upload will be wired in Phase 2.
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-label">Active Courses</div>
            <div className="stat-card-value">3</div>
            <span className="stat-subtext">Published to CourseHub</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Total Video Lessons</div>
            <div className="stat-card-value">64</div>
            <span className="stat-subtext">HLS Transcoding Ready</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Total Students Enrolled</div>
            <div className="stat-card-value">5,780</div>
            <span className="stat-subtext">&uarr; 14% this month</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Average Instructor Rating</div>
            <div className="stat-card-value">4.9 &#9733;</div>
            <span className="stat-subtext">Across 716 reviews</span>
          </div>
        </div>

        {/* My Courses Section */}
        <section className="dashboard-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">My Courses</h2>
              <p className="section-subheading">Courses authored by you and available on CourseHub</p>
            </div>

            <div className="dashboard-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'all' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Published ({teacherCourses.length})
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'drafts' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('drafts')}
              >
                Drafts ({draftCourses.length})
              </button>
            </div>
          </div>

          {displayedCourses.length === 0 ? (
            /* Empty State for Course Management */
            <div className="dashboard-empty-card">
              <div className="empty-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3 className="empty-title">No Draft Courses Found</h3>
              <p className="empty-desc">
                All of your current video course modules are published and live. Use the upload interface to create a new course draft.
              </p>
              <Link to="/upload" className="btn-primary-action">
                Upload New Course Video
              </Link>
            </div>
          ) : (
            /* Teacher Courses Grid */
            <div className="teacher-courses-grid">
              {displayedCourses.map((course) => (
                <div key={course.id} className="teacher-course-card">
                  <div className="teacher-card-thumb">
                    <span className="thumb-badge">{course.category}</span>
                    <span className="thumb-duration">{course.duration}</span>
                  </div>

                  <div className="teacher-card-body">
                    <h3 className="teacher-course-title">{course.title}</h3>
                    <p className="teacher-course-desc">{course.description}</p>

                    <div className="teacher-card-meta">
                      <span><strong>{course.lessonsCount}</strong> Lessons</span>
                      <span>&bull;</span>
                      <span><strong>{course.studentsCount}</strong> Enrolled</span>
                      <span>&bull;</span>
                      <span>Rating: <strong>{course.rating} &#9733;</strong></span>
                    </div>

                    <div className="teacher-card-actions">
                      <button
                        type="button"
                        className="btn-action-outline"
                        onClick={() => navigate(`/player/${course.id}`)}
                      >
                        Preview in Player
                      </button>
                      <button
                        type="button"
                        className="btn-action-primary"
                        onClick={() => navigate('/upload')}
                      >
                        Add Video Lesson
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Video Ingestion & Pipeline Activity Area */}
        <section className="dashboard-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Course Management & Ingestion Queue</h2>
              <p className="section-subheading">AWS Elemental MediaConvert & S3 status overview (Phase 2 Preview)</p>
            </div>
          </div>

          <div className="pipeline-activity-table-card">
            <table className="management-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Domain</th>
                  <th>Ingestion Pipeline</th>
                  <th>DynamoDB Record</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>AWS Cloud Architecture: S3, Lambda & DynamoDB</strong></td>
                  <td>Cloud Computing</td>
                  <td><span className="status-badge-ready">Ready (Mock HLS)</span></td>
                  <td><span className="db-badge">Indexed</span></td>
                  <td>
                    <button type="button" className="table-btn" onClick={() => navigate('/player/course-1')}>
                      View Stream
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Modern JavaScript (ES2024) & TypeScript Deep Dive</strong></td>
                  <td>Programming</td>
                  <td><span className="status-badge-ready">Ready (Mock HLS)</span></td>
                  <td><span className="db-badge">Indexed</span></td>
                  <td>
                    <button type="button" className="table-btn" onClick={() => navigate('/player/course-2')}>
                      View Stream
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>Production-Ready Express.js & Microservices</strong></td>
                  <td>Web Development</td>
                  <td><span className="status-badge-ready">Ready (Mock HLS)</span></td>
                  <td><span className="db-badge">Indexed</span></td>
                  <td>
                    <button type="button" className="table-btn" onClick={() => navigate('/player/course-3')}>
                      View Stream
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
