import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onNavigate }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="brand-title">Course<span className="brand-title-accent">Hub</span></span>
          </div>
          <p className="footer-tagline">
            Educational Video-on-Demand Platform architected for cloud-native scalability.
          </p>
          <div className="project-badge-pill">
            MCA Cloud Computing Project
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Platform Pages</h4>
          <ul className="footer-links-list">
            <li>
              <Link to="/" className="footer-link-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/upload" className="footer-link-btn">
                Upload Video (Phase 1)
              </Link>
            </li>
            <li>
              <Link to="/player" className="footer-link-btn">
                Video Player
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link-btn" onClick={() => handleScrollTo('courses-grid-section')}>
                Explore Courses
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Core Domains</h4>
          <ul className="footer-links-list">
            <li><span>Cloud Computing (AWS)</span></li>
            <li><span>Full-Stack Programming</span></li>
            <li><span>Web Application Development</span></li>
            <li><span>Data Science & Analytics</span></li>
          </ul>
        </div>

        <div className="footer-tech-col">
          <h4 className="footer-heading">Target AWS Stack</h4>
          <div className="tech-tags-grid">
            <span className="tech-badge">DynamoDB</span>
            <span className="tech-badge">Amazon S3</span>
            <span className="tech-badge">AWS Lambda</span>
            <span className="tech-badge">MediaConvert</span>
            <span className="tech-badge">EventBridge</span>
            <span className="tech-badge">CloudFront</span>
            <span className="tech-badge">CloudWatch</span>
            <span className="tech-badge">SQS</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} CourseHub VOD. Phase 1 Frontend UI Prototype.</p>
        <p className="footer-dataset-notice">
          Powered by client-side sample dataset • Local development mode
        </p>
      </div>
    </footer>
  );
}
