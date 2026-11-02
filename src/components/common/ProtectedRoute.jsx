import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from '../../router/Router';

/**
 * Route guard requiring an authenticated session
 */
export function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner-wrapper"><div className="loading-spinner"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * Route guard strictly requiring Admin role
 */
export function RequireAdmin({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="loading-spinner-wrapper"><div className="loading-spinner"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/user" replace />;
  }

  return children;
}

/**
 * Route guard strictly for guests (redirects already logged-in users to their dashboard)
 */
export function RequireGuest({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to={isAdmin ? '/admin' : '/user'} replace />;
  }

  return children;
}

