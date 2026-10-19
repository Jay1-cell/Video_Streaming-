import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import UploadPage from './pages/UploadPage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import './App.css';

export default function App() {
  const [showNoticeBanner, setShowNoticeBanner] = useState(true);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="coursehub-app">
          {/* Informational Notification Banner */}
          {showNoticeBanner && (
            <aside className="prototype-notification-bar" aria-label="Prototype environment notice">
              <div className="banner-content">
                <span className="banner-badge">MCA Project Prototype</span>
                <p className="banner-text">
                  <strong>Role-Based Auth Active:</strong> Local prototype authentication enabled for <strong>Teacher</strong> and <strong>Student</strong> roles. Client-side route guards control interface visibility. No external AWS Cognito connection is active.
                </p>
              </div>
              <button
                type="button"
                className="banner-close-btn"
                onClick={() => setShowNoticeBanner(false)}
                aria-label="Dismiss banner"
              >
                &times;
              </button>
            </aside>
          )}

          {/* Dynamic Role-Aware Top Navigation */}
          <Navbar />

          {/* Application Routes */}
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/player" element={<PlayerPage />} />
              <Route path="/player/:courseId" element={<PlayerPage />} />

              {/* Teacher-Only Protected Routes */}
              <Route
                path="/upload"
                element={
                  <ProtectedRoute allowedRoles={['Teacher']}>
                    <UploadPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Student-Only Protected Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-All */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
