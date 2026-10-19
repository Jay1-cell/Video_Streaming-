import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_COURSES } from '../data/sampleCourses.js';

export default function PlayerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Find course matching URL parameter (or default to first course if requested or null)
  const currentCourse = useMemo(() => {
    if (!courseId) return null;
    return SAMPLE_COURSES.find((c) => c.id === courseId) || null;
  }, [courseId]);

  // Related courses in the same category (or other sample courses)
  const relatedCourses = useMemo(() => {
    if (!currentCourse) return SAMPLE_COURSES.slice(0, 4);
    return SAMPLE_COURSES.filter((c) => c.id !== currentCourse.id).slice(0, 4);
  }, [currentCourse]);

  // Mock syllabus modules
  const syllabusLessons = useMemo(() => {
    if (!currentCourse) return [];
    return [
      { id: 1, title: 'Module 1: Architecture Overview & Prerequisites', duration: '18m 40s', active: true },
      { id: 2, title: 'Module 2: Cloud Ingestion & Storage Fundamentals', duration: '24m 15s', active: false },
      { id: 3, title: 'Module 3: Serverless Triggers & Processing Logic', duration: '32m 00s', active: false },
      { id: 4, title: 'Module 4: Security, Policies, & Delivery Optimization', duration: '21m 50s', active: false },
      { id: 5, title: 'Module 5: End-to-End Testing & Performance Monitoring', duration: '28m 10s', active: false },
    ];
  }, [currentCourse]);

  return (
    <div className="player-page-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="page-breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">&rsaquo;</span>
        <Link to="/" className="breadcrumb-link">Courses</Link>
        <span className="breadcrumb-separator">&rsaquo;</span>
        <span className="breadcrumb-current">
          {currentCourse ? currentCourse.title : 'Video Player'}
        </span>
      </div>

      <div className="player-page-content">
        {/* If no course is selected or courseId is invalid */}
        {!currentCourse ? (
          <div className="no-course-selected-wrapper">
            {/* Player Container with empty message (Requirement 6) */}
            <div className="video-player-frame empty-player-frame">
              <div className="player-overlay-message">
                <div className="player-warning-icon">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 className="player-empty-heading">No Playable Video Available</h2>
                <p className="player-empty-sub">
                  No video or course has been selected. Please choose a course from the catalog below to inspect the video player preview and syllabus.
                </p>
                <Link to="/" className="btn-primary-action">
                  Browse Full Course Catalog
                </Link>
              </div>
            </div>

            {/* Quick Picker for Sample Courses */}
            <div className="select-sample-section">
              <h3 className="section-title">Select a Course to Preview</h3>
              <p className="filter-subtitle">Choose from the client-side sample dataset to view player layout:</p>
              <div className="sample-courses-quickgrid">
                {SAMPLE_COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="quick-course-card"
                    onClick={() => navigate(`/player/${course.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="quick-badge">{course.category}</span>
                    <h4 className="quick-title">{course.title}</h4>
                    <span className="quick-meta">{course.duration} &bull; {course.instructor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Course Player View */
          <div className="player-layout-grid">
            {/* Left Column: Player & Course Info */}
            <div className="player-main-column">
              {/* Video Player Area with clear notice (Requirement 6 & 9) */}
              <div className="video-player-frame">
                {/* Simulated Top Bar */}
                <div className="player-top-bar">
                  <span className="player-course-label">
                    CourseHub VOD &bull; {currentCourse.title}
                  </span>
                  <span className="player-status-badge">Phase 1 Preview</span>
                </div>

                {/* Main Video Screen with prominent unavailable stream message */}
                <div className="player-screen-center">
                  <div className="player-alert-box">
                    <div className="player-stream-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </div>
                    <h3 className="stream-unavailable-title">No Playable Video Stream Available</h3>
                    <p className="stream-unavailable-desc">
                      Real-time HLS video streaming via <strong>AWS CloudFront CDN</strong> and automated transcoding with <strong>AWS Elemental MediaConvert</strong> are planned for Phase 3.
                    </p>
                    <div className="stream-notice-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <span>No AWS resources or live video streams are connected at this phase.</span>
                    </div>
                  </div>
                </div>

                {/* Mock Player Control Bar */}
                <div className="player-controls-bar">
                  <button type="button" className="ctrl-btn" disabled title="Streaming disabled in Phase 1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  <div className="ctrl-timeline-bar">
                    <div className="ctrl-progress-fill" style={{ width: '0%' }}></div>
                  </div>

                  <span className="ctrl-timestamp">00:00 / {currentCourse.duration}</span>

                  <span className="ctrl-resolution-badge" title="Target HLS Output">
                    HLS (Phase 3)
                  </span>

                  <button type="button" className="ctrl-btn" disabled title="Volume">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Course Title & Metadata Under Player */}
              <div className="player-course-details">
                <div className="player-meta-badges">
                  <span className="category-badge">{currentCourse.category}</span>
                  <span className="badge badge-neutral">{currentCourse.level}</span>
                  <span className="badge badge-neutral">{currentCourse.duration}</span>
                  <div className="rating-pill">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <strong>{currentCourse.rating.toFixed(1)}</strong> ({currentCourse.reviewsCount} reviews)
                  </div>
                </div>

                <h1 className="player-course-title">{currentCourse.title}</h1>

                {/* Instructor Card */}
                <div className="player-instructor-card">
                  <div className="instructor-avatar large-avatar">
                    {currentCourse.instructor.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <strong className="instructor-title-name">{currentCourse.instructor}</strong>
                    <p className="instructor-subtitle">{currentCourse.instructorRole} &bull; {currentCourse.studentsCount} Students Enrolled</p>
                  </div>
                </div>

                {/* Course Overview */}
                <div className="course-overview-section">
                  <h3 className="section-title">Course Overview</h3>
                  <p className="overview-text">{currentCourse.description}</p>
                </div>

                {/* Topics Covered */}
                <div className="course-topics-section">
                  <h4 className="topics-heading">Key Architecture Concepts</h4>
                  <div className="tag-list">
                    {currentCourse.tags.map((tag) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Syllabus & Related Courses */}
            <aside className="player-sidebar-column">
              {/* Syllabus Playlist Card */}
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <h3 className="sidebar-card-title">Course Modules ({syllabusLessons.length})</h3>
                  <span className="sidebar-meta">{currentCourse.lessonsCount} Total Lessons</span>
                </div>
                <div className="syllabus-list">
                  {syllabusLessons.map((item) => (
                    <div
                      key={item.id}
                      className={`syllabus-item ${item.active ? 'active-lesson' : ''}`}
                    >
                      <div className="lesson-play-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="lesson-info">
                        <span className="lesson-title">{item.title}</span>
                        <span className="lesson-duration">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Courses Card */}
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <h3 className="sidebar-card-title">More Sample Courses</h3>
                </div>
                <div className="related-courses-list">
                  {relatedCourses.map((item) => (
                    <div
                      key={item.id}
                      className="related-course-item"
                      onClick={() => navigate(`/player/${item.id}`)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="related-badge">{item.category}</div>
                      <h4 className="related-title">{item.title}</h4>
                      <span className="related-meta">{item.duration} &bull; {item.instructor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
