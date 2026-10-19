import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, onSelectCourse }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    category,
    instructor,
    duration,
    lessonsCount,
    level,
    rating,
    studentsCount,
    description,
    tags = [],
  } = course;

  // Category specific icon / color accents
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Cloud Computing':
        return { bg: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)', badgeBg: '#e0f2fe', badgeColor: '#0369a1' };
      case 'Programming':
        return { bg: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', badgeBg: '#ede9fe', badgeColor: '#5b21b6' };
      case 'Web Development':
        return { bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', badgeBg: '#d1fae5', badgeColor: '#065f46' };
      case 'Data Science':
        return { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', badgeBg: '#fef3c7', badgeColor: '#92400e' };
      default:
        return { bg: 'linear-gradient(135deg, #64748b 0%, #334155 100%)', badgeBg: '#f1f5f9', badgeColor: '#334155' };
    }
  };

  const theme = getCategoryTheme(category);

  const handleCardClick = () => {
    navigate(`/player/${id}`);
  };

  return (
    <article className="course-card" onClick={handleCardClick} role="button" tabIndex={0}>
      {/* Thumbnail Placeholder */}
      <div className="card-thumbnail-container" style={{ background: theme.bg }}>
        <div className="thumbnail-pattern-overlay"></div>
        <div className="thumbnail-content">
          <div className="play-button-circle" title="Open course in Video Player">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="thumbnail-category-label">{category}</span>
        </div>

        {/* Duration badge overlay */}
        <div className="thumbnail-duration-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{duration}</span>
        </div>

        {/* Level badge overlay */}
        <div className="thumbnail-level-badge">
          {level}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Category & Rating */}
        <div className="card-header-meta">
          <span
            className="category-badge"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeColor }}
          >
            {category}
          </span>
          <div className="rating-pill" title={`Rating ${rating} out of 5`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <strong>{rating.toFixed(1)}</strong>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="course-title" title={title}>
          {title}
        </h3>

        {/* Short Description */}
        <p className="course-description">
          {description}
        </p>

        {/* Instructor */}
        <div className="instructor-row">
          <div className="instructor-avatar" style={{ backgroundColor: theme.badgeColor }}>
            {instructor.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div className="instructor-info">
            <span className="instructor-name">{instructor}</span>
            <span className="students-count">{studentsCount} enrolled</span>
          </div>
        </div>

        {/* Tags */}
        <div className="card-tags-list">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="course-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="card-footer">
        <div className="footer-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span>{lessonsCount} lessons</span>
        </div>

        <div className="card-actions-group">
          {onSelectCourse && (
            <button
              type="button"
              className="btn-card-preview"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCourse(course);
              }}
              title="Quick syllabus modal"
            >
              Preview
            </button>
          )}
          <button
            type="button"
            className="btn-card-action"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/player/${id}`);
            }}
            aria-label={`Watch ${title} in player`}
          >
            Watch &rarr;
          </button>
        </div>
      </div>
    </article>
  );
}
