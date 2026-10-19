import React, { useEffect } from 'react';

export default function UploadModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content modal-upload" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close upload modal"
        >
          &times;
        </button>

        <div className="upload-modal-header">
          <div className="upload-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <h2 className="modal-title">Video Ingestion Pipeline</h2>
          <span className="phase-pill">Phase 2 Cloud Feature</span>
        </div>

        <div className="upload-modal-body">
          <p className="upload-modal-intro">
            Video uploads are currently disabled during <strong>Phase 1: Homepage & UI Prototyping</strong>.
          </p>

          <div className="pipeline-steps-card">
            <h4>Target AWS VOD Ingestion Architecture:</h4>
            <ol className="pipeline-list">
              <li>
                <strong>Client Upload:</strong> Request an Amazon S3 presigned URL from Express backend.
              </li>
              <li>
                <strong>Direct S3 Ingest:</strong> Upload raw `.mp4` video files directly to the ingest S3 bucket.
              </li>
              <li>
                <strong>Event Trigger:</strong> S3 `ObjectCreated` event triggers Amazon EventBridge & AWS Lambda.
              </li>
              <li>
                <strong>Transcoding:</strong> AWS Elemental MediaConvert encodes video into multi-resolution HLS (1080p, 720p, 480p).
              </li>
              <li>
                <strong>Metadata Storage:</strong> Final stream manifest URLs and video metadata saved to Amazon DynamoDB.
              </li>
            </ol>
          </div>

          <div className="notice-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              In accordance with project constraints, no AWS resources or real video uploads are active at this step.
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-primary-action" onClick={onClose}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
