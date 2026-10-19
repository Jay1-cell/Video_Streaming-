import React from 'react';

export default function Hero({ searchQuery, onSearchChange, onSearchClear, totalCoursesCount }) {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        {/* Top Badges */}
        <div className="hero-badge-group">
          <span className="badge badge-primary">MCA Cloud Computing Project</span>
          <span className="badge badge-neutral">VOD Architecture</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-heading">
          Master Modern Tech with <span className="highlight-text">Video-on-Demand</span> Learning
        </h1>

        <p className="hero-description">
          CourseHub delivers high-definition, modular video courses in Cloud Architecture, Full-Stack Programming, and Data Science. Designed for scalable cloud streaming with AWS DynamoDB, S3, and MediaConvert.
        </p>

        {/* Search Bar Container */}
        <div className="hero-search-wrapper">
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by course title, instructor, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search courses"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={onSearchClear}
                aria-label="Clear search query"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-bullet"></span>
            <strong>{totalCoursesCount}</strong> Sample Courses
          </div>
          <div className="stat-pill">
            <span className="stat-bullet"></span>
            <strong>4</strong> Core Disciplines
          </div>
          <div className="stat-pill">
            <span className="stat-bullet"></span>
            <strong>Client-Side</strong> Live Filtering
          </div>
        </div>
      </div>
    </section>
  );
}
