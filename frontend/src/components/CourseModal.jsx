import React, { useEffect } from 'react';

export default function CourseModal({ course, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <span className="modal-category-tag">{course.category}</span>
          <h2 className="modal-title">{course.title}</h2>
          <div className="modal-meta-row">
            <span>By <strong>{course.instructor}</strong> ({course.instructorRole})</span>
            <span>&bull;</span>
            <span>{course.duration}</span>
            <span>&bull;</span>
            <span>{course.lessonsCount} lessons</span>
            <span>&bull;</span>
            <span>{course.level}</span>
          </div>
        </div>

        {/* Video Player Placeholder */}
        <div className="modal-video-placeholder">
          <div className="player-inner">
            <div className="player-play-btn">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="player-title">Preview Stream: {course.title}</p>
            <span className="player-badge">AWS CloudFront HLS Stream Placeholder</span>
            <p className="player-notice">
              Video streaming is disabled in Phase 1. Subsequent phases will integrate S3 bucket storage, AWS Elemental MediaConvert adaptive HLS output, and CloudFront CDN distribution.
            </p>
          </div>
        </div>

        {/* Modal Description & Syllabus */}
        <div className="modal-body">
          <h3 className="modal-section-title">About this Course</h3>
          <p className="modal-description-text">{course.description}</p>

          <h3 className="modal-section-title">Topics Covered</h3>
          <div className="modal-tags">
            {course.tags.map((tag) => (
              <span key={tag} className="modal-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="modal-callout">
            <strong>MCA Project Architecture Note:</strong>
            <p>
              Course metadata is currently loaded from a local client-side dataset. In Phase 2 & 3, courses will be indexed in Amazon DynamoDB and streamed dynamically via AWS CloudFront CDN.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
