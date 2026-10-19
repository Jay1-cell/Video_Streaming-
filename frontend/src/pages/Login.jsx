import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine redirect destination after login
  const from = location.state?.from?.pathname;

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      const userSession = await login({
        email: email.trim(),
        password,
        role: selectedRole,
      });

      // Redirect to original destination or role dashboard
      if (from && from !== '/login' && from !== '/unauthorized') {
        navigate(from, { replace: true });
      } else {
        if (userSession.role === 'Teacher') {
          navigate('/teacher/dashboard', { replace: true });
        } else {
          navigate('/student/dashboard', { replace: true });
        }
      }
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick prototype prefill for testing convenience
  const handleQuickFill = (role) => {
    if (role === 'Teacher') {
      setEmail('teacher@coursehub.edu');
      setPassword('teacher123');
      setSelectedRole('Teacher');
    } else {
      setEmail('student@coursehub.edu');
      setPassword('student123');
      setSelectedRole('Student');
    }
    setErrors({});
    setServerError('');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        {/* Prototype Auth Banner */}
        <div className="prototype-auth-notice">
          <span className="notice-pill">Local Prototype Auth</span>
          <p>
            Client-side mock session mode for Phase 1 UI testing. AWS Cognito & backend JWT authentication will be integrated in subsequent phases.
          </p>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your CourseHub educational account</p>
        </div>

        {serverError && (
          <div className="auth-alert error-alert" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Role Selector */}
          <div className="form-group">
            <label className="form-label">Sign in as:</label>
            <div className="role-selector-group">
              <button
                type="button"
                className={`role-choice-btn ${selectedRole === 'Student' ? 'active-role' : ''}`}
                onClick={() => setSelectedRole('Student')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>Student</span>
              </button>
              <button
                type="button"
                className={`role-choice-btn ${selectedRole === 'Teacher' ? 'active-role' : ''}`}
                onClick={() => setSelectedRole('Teacher')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>Teacher</span>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email Address <span className="required-star">*</span>
            </label>
            <input
              id="login-email"
              type="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              autoComplete="email"
            />
            {errors.email && <span className="field-error-msg">{errors.email}</span>}
          </div>

          {/* Password with Visibility Toggle */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input password-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="field-error-msg">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn-primary-action full-width"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : `Sign in as ${selectedRole}`}
          </button>
        </form>

        {/* Prototype Quick Fill Helper */}
        <div className="quick-test-accounts">
          <span className="quick-test-label">Prototype Quick Fill:</span>
          <div className="quick-test-buttons">
            <button
              type="button"
              className="quick-btn"
              onClick={() => handleQuickFill('Teacher')}
            >
              Fill Teacher
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={() => handleQuickFill('Student')}
            >
              Fill Student
            </button>
          </div>
        </div>

        <div className="auth-footer-link">
          Don't have an account yet?{' '}
          <Link to="/signup" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
