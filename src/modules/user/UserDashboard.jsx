import React, { useState } from 'react';
import { Link, useNavigate } from '../../router/Router';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { Toast } from '../../components/common/Toast';

import { ProfileTab } from './tabs/ProfileTab';
import { BookmarksTab } from './tabs/BookmarksTab';
import { MyInquiriesTab } from './tabs/MyInquiriesTab';
import { SecurityTab } from './tabs/SecurityTab';

export function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = (user?.fullName || 'User')
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="user-dashboard-wrapper">
      <div className="ambient-glow" aria-hidden="true"></div>

      {/* Top Navbar */}
      <header className="user-hub-header">
        <div className="container user-hub-nav">
          <Link to="/" className="brand" aria-label="Portfolio Homepage">
            <span className="brand-monogram">VP</span>
            <span className="brand-text">
              <span className="brand-name">User Hub</span>
              <span className="brand-title">Venkata Pavan</span>
            </span>
          </Link>

          <div className="nav-actions">
            <ThemeToggle />
            <Link to="/" className="btn btn-outline btn-sm">
              Public Portfolio
            </Link>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="container user-hub-main">
        {/* User Hero Banner */}
        <div className="user-hero-card">
          <div className="user-hero-info">
            <div className="user-avatar-circle">{initials}</div>
            <div className="user-meta-details">
              <div className="user-name-row">
                <h1 className="user-heading">{user?.fullName || 'Client User'}</h1>
                <span className="auth-role-tag role-user">ROLE: {(user?.role || 'user').toUpperCase()}</span>
              </div>
              <p className="user-email-text">{user?.email}</p>
            </div>
          </div>
          <div className="user-hero-quick-actions">
            <Link to="/#projects" className="btn btn-primary btn-sm">
              Explore Projects
            </Link>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout Session
            </button>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="user-workspace-tabs">
          <button
            type="button"
            className={`workspace-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Client Profile
          </button>
          <button
            type="button"
            className={`workspace-tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            ⭐ Saved Projects
          </button>
          <button
            type="button"
            className={`workspace-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            ✉️ My Inquiries
          </button>
          <button
            type="button"
            className={`workspace-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🛡️ Security & Storage
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="user-workspace-content">
          {activeTab === 'profile' && <ProfileTab onToast={showToast} />}
          {activeTab === 'bookmarks' && <BookmarksTab user={user} onToast={showToast} />}
          {activeTab === 'inquiries' && <MyInquiriesTab user={user} onToast={showToast} />}
          {activeTab === 'security' && <SecurityTab user={user} />}
        </div>
      </main>

      {/* Toast Alert */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      )}
    </div>
  );
}

