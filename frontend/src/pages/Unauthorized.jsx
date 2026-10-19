import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Unauthorized() {
  const { user, isTeacher, isStudent } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const attemptedPath = location.state?.attemptedPath || 'the requested page';
  const requiredRoles = location.state?.requiredRoles || ['Authorized Role'];

  const handleDashboardRedirect = () => {
    if (isTeacher) {
      navigate('/teacher/dashboard');
    } else if (isStudent) {
      navigate('/student/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="unauthorized-page-wrapper">
      <div className="unauthorized-card">
        <div className="unauthorized-icon-circle">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <span className="unauthorized-badge">403 Forbidden &bull; Role Restriction</span>

        <h1 className="unauthorized-title">Access Restricted</h1>

        <p className="unauthorized-description">
          You do not have permission to access <code>{attemptedPath}</code>.
        </p>

        <div className="role-comparison-box">
          <div className="role-row">
            <span>Your Current Account Role:</span>
            <strong className="badge-user-role">{user?.role || 'Guest (Not Signed In)'}</strong>
          </div>
          <div className="role-row">
            <span>Permitted Role(s):</span>
            <strong className="badge-required-role">{requiredRoles.join(' or ')}</strong>
          </div>
        </div>

        {/* Security Architecture Disclaimer (Requirement 3 & 4) */}
        <div className="auth-architecture-note">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <strong>Architecture & Security Note:</strong>
            <p>
              Client-side route guards control interface visibility only. The Express backend API must independently enforce role authorization (e.g. AWS Cognito JWT token validation) before permitting upload or management operations.
            </p>
          </div>
        </div>

        <div className="unauthorized-actions">
          <button
            type="button"
            className="btn-primary-action"
            onClick={handleDashboardRedirect}
          >
            Go to My {user?.role ? `${user.role} Dashboard` : 'Dashboard'}
          </button>
          <Link to="/" className="btn-secondary">
            Return to Homepage
          </Link>
          <Link to="/login" className="btn-tertiary">
            Sign In with Another Role
          </Link>
        </div>
      </div>
    </div>
  );
}
