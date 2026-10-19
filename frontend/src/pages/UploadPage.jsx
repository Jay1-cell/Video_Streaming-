import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_CATEGORIES } from '../data/sampleCourses.js';

const MAX_FILE_SIZE_MB = 500;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Cloud Computing',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const fileInputRef = useRef(null);

  const availableCategories = SAMPLE_CATEGORIES.filter((cat) => cat !== 'All Courses');

  // Format bytes to readable string
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate video file
  const validateFile = (file) => {
    if (!file) {
      setFileError('Please select a video file.');
      return false;
    }

    const isMp4ByName = file.name.toLowerCase().endsWith('.mp4');
    const isMp4ByType = file.type === 'video/mp4';

    if (!isMp4ByName && !isMp4ByType) {
      setFileError('Invalid file format. Only MP4 videos (.mp4) are supported for cloud transcoding.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        `File size (${formatFileSize(file.size)}) exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`
      );
      return false;
    }

    setFileError('');
    return true;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setValidationResult(null);
    if (file) {
      setSelectedFile(file);
      validateFile(file);
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setValidationResult(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      validateFile(file);
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationResult(null);

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Course/video title is required.';
    } else if (formData.title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters.';
    }

    if (!formData.description.trim()) {
      errors.description = 'Course/video description is required.';
    } else if (formData.description.trim().length < 15) {
      errors.description = 'Description must be at least 15 characters.';
    }

    if (!formData.category) {
      errors.category = 'Please select a valid category.';
    }

    const isFileValid = validateFile(selectedFile);
    if (!isFileValid && !fileError) {
      errors.file = 'A valid MP4 video file is required.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0 && isFileValid && selectedFile) {
      // NOTE: Requirement 5: Do NOT pretend that a file has been uploaded or saved.
      setValidationResult({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        fileName: selectedFile.name,
        fileSizeFormatted: formatFileSize(selectedFile.size),
        validatedAt: new Date().toLocaleTimeString(),
      });
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Cloud Computing',
    });
    setSelectedFile(null);
    setFileError('');
    setFieldErrors({});
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-page-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="page-breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">&rsaquo;</span>
        <span className="breadcrumb-current">Upload Course Video</span>
      </div>

      <div className="upload-page-content">
        {/* Page Header */}
        <header className="page-header">
          <div className="header-badge-row">
            <span className="badge badge-primary">Course Ingestion Portal</span>
            <span className="badge badge-neutral">Phase 1 UI Form</span>
          </div>
          <h1 className="page-title">Upload Video Material</h1>
          <p className="page-subtitle">
            Prepare video course modules for transcoding and delivery across the CourseHub platform.
          </p>
        </header>

        {/* AWS Status Callout Notice (Requirement 4 & 5) */}
        <div className="aws-notice-card" role="region" aria-label="AWS integration notice">
          <div className="notice-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="notice-content">
            <h4 className="notice-heading">Notice: AWS S3 Video Ingestion Not Connected</h4>
            <p className="notice-text">
              Real-time video upload to <strong>Amazon S3</strong> and automated transcoding via <strong>AWS Elemental MediaConvert</strong> are scheduled for Phase 2. 
              Submitting this form executes client-side validation only. <strong>No video file will be transmitted, uploaded, or saved to cloud storage.</strong>
            </p>
          </div>
        </div>

        {/* Form & Sidebar Grid */}
        <div className="upload-grid-layout">
          {/* Main Upload Form */}
          <div className="form-card">
            <form onSubmit={handleSubmit} noValidate>
              {/* Title Field */}
              <div className="form-group">
                <label htmlFor="course-title" className="form-label">
                  Video / Course Title <span className="required-star">*</span>
                </label>
                <input
                  id="course-title"
                  name="title"
                  type="text"
                  className={`form-input ${fieldErrors.title ? 'input-error' : ''}`}
                  placeholder="e.g. Master DynamoDB Single-Table Design with Node.js"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {fieldErrors.title && <span className="field-error-msg">{fieldErrors.title}</span>}
              </div>

              {/* Category Field */}
              <div className="form-group">
                <label htmlFor="course-category" className="form-label">
                  Category / Domain <span className="required-star">*</span>
                </label>
                <select
                  id="course-category"
                  name="category"
                  className={`form-select ${fieldErrors.category ? 'input-error' : ''}`}
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {fieldErrors.category && <span className="field-error-msg">{fieldErrors.category}</span>}
              </div>

              {/* Description Field */}
              <div className="form-group">
                <label htmlFor="course-desc" className="form-label">
                  Course Description & Learning Outcomes <span className="required-star">*</span>
                </label>
                <textarea
                  id="course-desc"
                  name="description"
                  rows={4}
                  className={`form-textarea ${fieldErrors.description ? 'input-error' : ''}`}
                  placeholder="Provide an overview of the concepts covered, target audience, and prerequisite knowledge..."
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                {fieldErrors.description && <span className="field-error-msg">{fieldErrors.description}</span>}
              </div>

              {/* Video File Upload Dropzone (Requirements 2 & 3) */}
              <div className="form-group">
                <label className="form-label">
                  Video File (MP4 Only) <span className="required-star">*</span>
                </label>
                <div
                  className={`file-dropzone ${isDragOver ? 'drag-over' : ''} ${fileError ? 'dropzone-error' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload video file"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp4,video/mp4"
                    className="hidden-file-input"
                    onChange={handleFileChange}
                  />

                  <div className="dropzone-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>

                  <p className="dropzone-prompt">
                    <strong>Click to browse</strong> or drag and drop your video file here
                  </p>
                  <p className="dropzone-limits">
                    Format: <strong>MP4 (.mp4) only</strong> &bull; Size limit: <strong>{MAX_FILE_SIZE_MB} MB</strong>
                  </p>
                </div>

                {fileError && <span className="field-error-msg">{fileError}</span>}

                {/* Selected File Details Box */}
                {selectedFile && !fileError && (
                  <div className="selected-file-card">
                    <div className="file-info-col">
                      <div className="file-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </div>
                      <div className="file-text-details">
                        <strong className="file-name">{selectedFile.name}</strong>
                        <span className="file-meta">
                          {formatFileSize(selectedFile.size)} &bull; MP4 Video &bull; Validated for Ingest
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="file-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setFileError('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      title="Remove file"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="form-action-row">
                <button type="submit" className="btn-primary-action">
                  Validate & Check Form
                </button>
                <button type="button" className="btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Architecture Context */}
          <aside className="upload-sidebar">
            {/* Validation Outcome Box (Requirement 5) */}
            {validationResult ? (
              <div className="validation-result-card" role="region" aria-label="Validation result">
                <div className="result-header">
                  <span className="result-status-dot"></span>
                  <h3 className="result-title">Client-Side Validation Passed</h3>
                </div>
                <p className="result-desc">
                  All required fields and file requirements (MP4 format under {MAX_FILE_SIZE_MB} MB) were verified successfully.
                </p>

                <div className="result-summary-box">
                  <div className="summary-row">
                    <span>Title:</span>
                    <strong>{validationResult.title}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Category:</span>
                    <strong>{validationResult.category}</strong>
                  </div>
                  <div className="summary-row">
                    <span>File:</span>
                    <strong>{validationResult.fileName} ({validationResult.fileSizeFormatted})</strong>
                  </div>
                  <div className="summary-row">
                    <span>Checked At:</span>
                    <strong>{validationResult.validatedAt}</strong>
                  </div>
                </div>

                <div className="prototype-disclaimer-box">
                  <strong>Prototype Status Notice:</strong>
                  <p>
                    In accordance with project requirements, no video has been uploaded or stored. AWS S3 presigned URL generation and DynamoDB storage will be enabled in Phase 2.
                  </p>
                </div>

                <button type="button" className="btn-secondary full-width" onClick={handleReset}>
                  Upload Another File Preview
                </button>
              </div>
            ) : (
              <div className="roadmap-card">
                <h3 className="roadmap-title">Target AWS VOD Pipeline</h3>
                <p className="roadmap-subtitle">How uploads will work in Phase 2:</p>
                <ul className="pipeline-steps-list">
                  <li>
                    <span className="step-num">1</span>
                    <div>
                      <strong>Presigned S3 URL</strong>
                      <p>Backend generates temporary secure upload credentials.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <div>
                      <strong>Direct S3 Ingest</strong>
                      <p>Browser streams raw MP4 directly to the raw video S3 bucket.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <div>
                      <strong>MediaConvert Transcode</strong>
                      <p>AWS Elemental MediaConvert produces multi-bitrate HLS streams.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">4</span>
                    <div>
                      <strong>DynamoDB Indexing</strong>
                      <p>Course item metadata and streaming manifest saved to DynamoDB.</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
