import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { SAMPLE_COURSES } from '../data/sampleCourses.js';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [learningTab, setLearningTab] = useState('in-progress');

  // Enrolled sample courses for student
  const enrolledCourses = SAMPLE_COURSES.slice(0, 4);
  const savedCourses = []; // Empty state demonstration

  return (
    <div className="dashboard-page-wrapper">
      {/* Breadcrumb */}
      <div className="page-breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">&rsaquo;</span>
        <span className="breadcrumb-current">Student Dashboard</span>
      </div>

      <div className="dashboard-content">
        {/* Welcome Header */}
        <header className="dashboard-hero-card">
          <div className="dashboard-hero-info">
            <div className="role-pill-badge student-badge">Student Account</div>
            <h1 className="dashboard-welcome-title">
              Welcome back, <span className="highlight-text">{user?.name || 'Student'}</span>!
            </h1>
            <p className="dashboard-subtitle">
              Track your cloud architecture learning journey, resume your video lessons, and explore new technical courses.
            </p>
          </div>

          <div className="dashboard-hero-actions">
            <Link to="/" className="btn-primary-action">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Browse Course Catalog
            </Link>
          </div>
        </header>

        {/* Prototype Notice */}
        <div className="prototype-dashboard-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <strong>Phase 1 Student Experience:</strong>
            <span>
              {' '}Students have full access to browse and watch all available video courses in the player. Upload and teacher management features are restricted to instructor accounts.
            </span>
          </div>
        </div>

        {/* Learning Metrics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-label">Enrolled Courses</div>
            <div className="stat-card-value">4</div>
            <span className="stat-subtext">Active learning tracks</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Completed Lessons</div>
            <div className="stat-card-value">18</div>
            <span className="stat-subtext">Across all enrolled domains</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Watch Time</div>
            <div className="stat-card-value">12.5 hrs</div>
            <span className="stat-subtext">&uarr; 3.2 hrs this week</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Certificates in Progress</div>
            <div className="stat-card-value">2</div>
            <span className="stat-subtext">AWS & React tracks</span>
          </div>
        </div>

        {/* Continue Learning Section */}
        <section className="dashboard-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Continue Learning</h2>
              <p className="section-subheading">Pick up right where you left off</p>
            </div>

            <div className="dashboard-tabs">
              <button
                type="button"
                className={`tab-btn ${learningTab === 'in-progress' ? 'tab-active' : ''}`}
                onClick={() => setLearningTab('in-progress')}
              >
                In Progress (1)
              </button>
              <button
                type="button"
                className={`tab-btn ${learningTab === 'saved' ? 'tab-active' : ''}`}
                onClick={() => setLearningTab('saved')}
              >
                Saved for Later ({savedCourses.length})
              </button>
            </div>
          </div>

          {learningTab === 'saved' ? (
            /* Empty State for Saved Courses */
            <div className="dashboard-empty-card">
              <div className="empty-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="empty-title">No Saved Courses</h3>
              <p className="empty-desc">
                You haven't bookmarked any courses for later yet. Browse the catalog to discover interesting topics.
              </p>
              <Link to="/" className="btn-primary-action">
                Explore Available Courses
              </Link>
            </div>
          ) : (
            /* Active Course in Progress */
            <div className="resume-learning-card">
              <div className="resume-card-thumb">
                <span className="thumb-badge">Cloud Computing</span>
                <span className="thumb-duration">6h 30m</span>
              </div>

              <div className="resume-card-body">
                <div className="resume-badge-row">
                  <span className="badge badge-primary">Current Module: Lesson 4</span>
                  <span className="progress-percentage">45% Completed</span>
                </div>

                <h3 className="resume-course-title">
                  AWS Cloud Architecture: S3, Lambda & DynamoDB
                </h3>
                <p className="resume-course-sub">
                  Next up: <strong>Module 4: Security, Policies, & Delivery Optimization (21m 50s)</strong>
                </p>

                {/* Progress Bar */}
                <div className="learning-progress-track">
                  <div className="learning-progress-fill" style={{ width: '45%' }}></div>
                </div>

                <div className="resume-action-row">
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => navigate('/player/course-1')}
                  >
                    Resume Video Lesson &rarr;
                  </button>
                  <span className="instructor-credit">Instructor: Prof. Ramesh Kulkarni</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Available Courses Section */}
        <section className="dashboard-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">Available Courses For You</h2>
              <p className="section-subheading">Recommended courses ready to stream</p>
            </div>
            <Link to="/" className="section-link">
              View All Catalog &rarr;
            </Link>
          </div>

          <div className="student-courses-grid">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="student-course-card">
                <div className="student-thumb-wrapper">
                  <span className="student-card-cat">{course.category}</span>
                  <span className="student-card-dur">{course.duration}</span>
                </div>
                <div className="student-card-body">
                  <h4 className="student-card-title">{course.title}</h4>
                  <p className="student-card-inst">By {course.instructor}</p>
                  <div className="student-card-meta">
                    <span>{course.lessonsCount} lessons</span>
                    <span>&bull;</span>
                    <span>{course.level}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-student-watch"
                    onClick={() => navigate(`/player/${course.id}`)}
                  >
                    Watch Course &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
