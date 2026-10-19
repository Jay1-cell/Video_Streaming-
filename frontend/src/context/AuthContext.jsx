import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    try {
      const existingUser = authService.getCurrentUser();
      if (existingUser) {
        setUser(existingUser);
      }
    } catch (err) {
      console.error('Failed to load session in AuthProvider:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const userSession = await authService.login(credentials);
    setUser(userSession);
    return userSession;
  };

  const signup = async (userData) => {
    const userSession = await authService.signup(userData);
    setUser(userSession);
    return userSession;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isTeacher: user?.role === 'Teacher',
    isStudent: user?.role === 'Student',
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
