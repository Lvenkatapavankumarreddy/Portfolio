import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  getUsers,
  addUser,
  updateUser,
  initializeStorage
} from '../services/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed storage with demo data and demo admin if empty
    initializeStorage();
    const stored = getCurrentUser();
    if (stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  /**
   * Validate Email format
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return typeof email === 'string' && emailRegex.test(email.trim());
  };

  /**
   * Assess Password Strength
   */
  const checkPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: 'None', hasMinLen: false, hasUpper: false, hasLower: false, hasNumber: false };
    const hasMinLen = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);

    let passed = 0;
    if (hasMinLen) passed++;
    if (hasUpper) passed++;
    if (hasLower) passed++;
    if (hasNumber) passed++;

    let label = 'Weak';
    if (passed === 4 && pwd.length >= 10) label = 'Strong';
    else if (passed >= 3) label = 'Medium';

    return { score: passed, label, hasMinLen, hasUpper, hasLower, hasNumber };
  };

  /**
   * Login action with Local Storage validation
   */
  const login = (email, password, rememberMe = false) => {
    if (!email || !email.trim()) {
      return { success: false, error: 'Please enter your email.' };
    }
    if (!isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!foundUser || foundUser.password !== password) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const sanitizedSession = setCurrentUser(foundUser);
    setUser(sanitizedSession);

    if (rememberMe) {
      localStorage.setItem('portfolio_remember_email', normalizedEmail);
    } else {
      localStorage.removeItem('portfolio_remember_email');
    }

    return { success: true, user: sanitizedSession };
  };

  /**
   * Signup action with validation and Local Storage persistence
   */
  const signup = ({ fullName, email, password, confirmPassword, termsAccepted }) => {
    if (!fullName || fullName.trim().length < 2) {
      return { success: false, error: 'Please enter your full name (minimum 2 characters).' };
    }
    if (!email || !isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'An account with this email already exists. Please log in instead.' };
    }
    const strength = checkPasswordStrength(password);
    if (!strength.hasMinLen || !strength.hasUpper || !strength.hasLower || !strength.hasNumber) {
      return {
        success: false,
        error: 'Password must contain at least 8 characters, including uppercase, lowercase, and a number.'
      };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }
    if (!termsAccepted) {
      return { success: false, error: 'Please accept the Terms & Conditions.' };
    }

    const newUser = {
      id: 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: password,
      role: 'user', // Public signups are strictly granted user role
      createdAt: new Date().toISOString()
    };

    addUser(newUser);
    return { success: true, message: 'Account created successfully! Redirecting to login...' };
  };

  /**
   * Logout action
   */
  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  /**
   * Update Profile
   */
  const updateProfile = ({ fullName }) => {
    if (!user) return { success: false, error: 'Not authenticated.' };
    if (!fullName || fullName.trim().length < 2) {
      return { success: false, error: 'Full name must be at least 2 characters.' };
    }

    const updatedUser = updateUser(user.id, { fullName: fullName.trim() });
    if (updatedUser) {
      const sanitized = setCurrentUser(updatedUser);
      setUser(sanitized);
      return { success: true, user: sanitized };
    }
    return { success: false, error: 'Failed to update profile.' };
  };

  /**
   * Change Password
   */
  const changePassword = (currentPassword, newPassword) => {
    if (!user) return { success: false, error: 'Not authenticated.' };
    const users = getUsers();
    const existing = users.find(u => u.id === user.id);
    if (!existing || existing.password !== currentPassword) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    const strength = checkPasswordStrength(newPassword);
    if (!strength.hasMinLen || !strength.hasUpper || !strength.hasLower || !strength.hasNumber) {
      return {
        success: false,
        error: 'New password must contain at least 8 characters, including uppercase, lowercase, and a number.'
      };
    }

    updateUser(user.id, { password: newPassword });
    return { success: true, message: 'Password updated successfully!' };
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    checkPasswordStrength
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

