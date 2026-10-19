import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isTeacher, isStudent, logout } = useAuth();
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    navigate('/');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('courses-grid-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    navigate('/');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('categories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={handleBrandClick} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6.5C4 5.11929 5.11929 4 6.5 4H17.5C18.8807 4 20 5.11929 20 6.5V17.5C20 18.8807 18.8807 20 17.5 20H6.5C5.11929 20 4 18.8807 4 17.5V6.5Z" fill="url(#logo-grad)" />
              <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
              <defs>
                <linearGradient id="logo-grad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Course<span className="brand-title-accent">Hub</span></span>
            <span className="brand-sub">Cloud VOD</span>
          </div>
          <span className="prototype-pill">Prototype Mode</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          {/* Common Catalog Links */}
          <a href="/#explore" className="nav-link" onClick={handleExploreClick}>
            Explore Courses
          </a>
          <a href="/#categories" className="nav-link" onClick={handleCategoriesClick}>
            Categories
          </a>

          {/* Role-Specific Links: Teacher */}
          {isAuthenticated && isTeacher && (
            <>
              <NavLink
                to="/teacher/dashboard"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Teacher Dashboard
              </NavLink>
              <NavLink
                to="/upload"
                className={({ isActive }) => `nav-link upload-btn ${isActive ? 'upload-active' : ''}`}
                title="Upload video course (Teacher Only)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Video
              </NavLink>
            </>
          )}

          {/* Role-Specific Links: Student */}
          {isAuthenticated && isStudent && (
            <>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Student Dashboard
              </NavLink>
              <NavLink
                to="/player"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Video Player
              </NavLink>
            </>
          )}

          {/* Logged Out: Player link accessible for preview */}
          {!isAuthenticated && (
            <NavLink
              to="/player"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Player
            </NavLink>
          )}

          {/* User Session Area */}
          <div className="nav-auth-section">
            {isAuthenticated ? (
              <div className="user-profile-menu">
                <div className="user-badge-pill" title={`Logged in as ${user.email}`}>
                  <span className={`role-dot ${isTeacher ? 'teacher-dot' : 'student-dot'}`}></span>
                  <span className="user-name-label">{user.name}</span>
                  <span className="user-role-tag">{user.role}</span>
                </div>
                <button
                  type="button"
                  className="btn-logout"
                  onClick={handleLogout}
                  title="Sign out of prototype session"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-auth-buttons">
                <NavLink
                  to="/login"
                  className={({ isActive }) => `nav-link auth-login-btn ${isActive ? 'active' : ''}`}
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="nav-link auth-signup-btn"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <a href="/#explore" className="mobile-nav-link" onClick={handleExploreClick}>
            Explore Courses
          </a>
          <a href="/#categories" className="mobile-nav-link" onClick={handleCategoriesClick}>
            Categories
          </a>

          {isAuthenticated && isTeacher && (
            <>
              <NavLink
                to="/teacher/dashboard"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Teacher Dashboard
              </NavLink>
              <NavLink
                to="/upload"
                className="mobile-nav-link mobile-upload-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Video (Teacher)
              </NavLink>
            </>
          )}

          {isAuthenticated && isStudent && (
            <>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Dashboard
              </NavLink>
              <NavLink
                to="/player"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Video Player
              </NavLink>
            </>
          )}

          {!isAuthenticated && (
            <NavLink
              to="/player"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Video Player
            </NavLink>
          )}

          <div className="mobile-auth-row">
            {isAuthenticated ? (
              <div className="mobile-user-box">
                <div className="mobile-user-info">
                  <strong>{user.name}</strong>
                  <span className="user-role-tag">{user.role}</span>
                </div>
                <button
                  type="button"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-guest-buttons">
                <NavLink
                  to="/login"
                  className="mobile-btn-login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="mobile-btn-signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
