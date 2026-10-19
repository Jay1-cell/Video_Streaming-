import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Route guard component for authentication and role-based access control.
 * 
 * NOTE: Client-side route guards control interface visibility only.
 * Express backend APIs must independently verify tokens and roles before
 * executing sensitive operations.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="state-card loading-state" style={{ margin: '4rem auto' }}>
        <div className="loading-spinner"></div>
        <p className="state-desc">Verifying session credentials...</p>
      </div>
    );
  }

  // Not logged in -> Redirect to login page preserving destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, but role is not permitted -> Redirect to unauthorized page
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{
          attemptedPath: location.pathname,
          requiredRoles: allowedRoles,
          userRole: user.role,
        }}
        replace
      />
    );
  }

  return children;
}
