import React from 'react';
import CourseCard from './CourseCard.jsx';

export default function CourseGrid({
  courses,
  selectedCategory,
  searchQuery,
  sortBy,
  onSortChange,
  onResetFilters,
  onSelectCourse,
  isLoading = false,
  errorMessage = null,
}) {
  // Error state display
  if (errorMessage) {
    return (
      <div className="state-card error-state" role="alert">
        <div className="state-icon error-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="state-title">Data Error</h3>
        <p className="state-desc">{errorMessage}</p>
        <button type="button" className="btn-primary-action" onClick={onResetFilters}>
          Reset Filters
        </button>
      </div>
    );
  }

  // Loading state display
  if (isLoading) {
    return (
      <div className="state-card loading-state" aria-busy="true">
        <div className="loading-spinner"></div>
        <h3 className="state-title">Loading Catalog...</h3>
        <p className="state-desc">Filtering course catalog client-side</p>
      </div>
    );
  }

  return (
    <section className="courses-section" id="courses-grid-section">
      {/* Grid Toolbar: Results count & Sort control */}
      <div className="grid-toolbar">
        <div className="toolbar-info">
          <h2 className="toolbar-title">
            {selectedCategory === 'All Courses' ? 'All Available Courses' : selectedCategory}
          </h2>
          <span className="results-badge">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
        </div>

        <div className="toolbar-controls">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="highest-rated">Highest Rated</option>
            <option value="lessons">Most Lessons</option>
            <option value="title">Course Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Empty Results State */}
      {courses.length === 0 ? (
        <div className="state-card empty-state" role="region" aria-label="No courses found">
          <div className="state-icon empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="state-title">No Matching Courses Found</h3>
          <p className="state-desc">
            We couldn't find any courses matching{' '}
            {searchQuery ? <strong>"{searchQuery}"</strong> : ''}{' '}
            {selectedCategory !== 'All Courses' ? `in "${selectedCategory}"` : ''}.
          </p>
          <p className="state-suggestion">
            Try adjusting your search terms, choosing a different category, or clearing filters.
          </p>
          <button type="button" className="btn-primary-action" onClick={onResetFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        /* Course Grid */
        <div className="courses-grid" role="list">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      )}
    </section>
  );
}
