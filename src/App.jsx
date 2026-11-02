import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from './router/Router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth, RequireAdmin, RequireGuest } from './components/common/ProtectedRoute';

import { HomePage } from './modules/public/HomePage';
import { LoginPage } from './modules/auth/LoginPage';
import { SignupPage } from './modules/auth/SignupPage';
import { AdminDashboard } from './modules/admin/AdminDashboard';
import { UserDashboard } from './modules/user/UserDashboard';

// Import Modular CSS Design Tokens & Layouts
import './styles/style.css';
import './styles/responsive.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/app.css';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Portfolio Module */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Authentication Module (Guest Only) */}
            <Route
              path="/login"
              element={
                <RequireGuest>
                  <LoginPage />
                </RequireGuest>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireGuest>
                  <SignupPage />
                </RequireGuest>
              }
            />

            {/* 3. Admin Module (Admin Role Guard) */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />

            {/* 4. User Workspace Module (Authenticated User Guard) */}
            <Route
              path="/user"
              element={
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

