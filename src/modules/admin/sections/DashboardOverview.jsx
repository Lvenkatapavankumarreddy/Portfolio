import React from 'react';
import { Link } from '../../../router/Router';

export function DashboardOverview({
  projectsCount,
  skillsCount,
  blogsCount,
  messagesCount,
  unreadMessagesCount,
  onNavigateTab,
  onOpenAddProject,
  onOpenAddSkill,
  onOpenAddBlog
}) {
  return (
    <div className="admin-overview-wrapper">
      <div className="admin-section-heading">
        <h2 className="admin-view-title">System Metrics & Dashboard</h2>
        <p className="admin-view-subtitle">
          Real-time summary of portfolio content persisted in browser Local Storage.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card" onClick={() => onNavigateTab('projects')} role="button" tabIndex={0}>
          <div className="stat-card-top">
            <span className="stat-icon-wrapper icon-projects">💻</span>
            <span className="stat-counter">{projectsCount}</span>
          </div>
          <div className="stat-card-bottom">
            <span className="stat-title">Featured Projects</span>
            <span className="stat-link-action">Manage &rarr;</span>
          </div>
        </div>

        <div className="admin-stat-card" onClick={() => onNavigateTab('skills')} role="button" tabIndex={0}>
          <div className="stat-card-top">
            <span className="stat-icon-wrapper icon-skills">⚡</span>
            <span className="stat-counter">{skillsCount}</span>
          </div>
          <div className="stat-card-bottom">
            <span className="stat-title">Technical Skills</span>
            <span className="stat-link-action">Manage &rarr;</span>
          </div>
        </div>

        <div className="admin-stat-card" onClick={() => onNavigateTab('blogs')} role="button" tabIndex={0}>
          <div className="stat-card-top">
            <span className="stat-icon-wrapper icon-blogs">📝</span>
            <span className="stat-counter">{blogsCount}</span>
          </div>
          <div className="stat-card-bottom">
            <span className="stat-title">Blog Articles</span>
            <span className="stat-link-action">Manage &rarr;</span>
          </div>
        </div>

        <div className="admin-stat-card" onClick={() => onNavigateTab('messages')} role="button" tabIndex={0}>
          <div className="stat-card-top">
            <span className="stat-icon-wrapper icon-messages">📬</span>
            <span className="stat-counter">{messagesCount}</span>
          </div>
          <div className="stat-card-bottom">
            <span className="stat-title">Contact Inquiries</span>
            <span className="stat-link-action">
              {unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : 'All read'} &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Quick Operations Row */}
      <div className="admin-actions-banner">
        <h3 className="actions-banner-title">Quick Administration Actions</h3>
        <div className="actions-button-group">
          <button type="button" className="btn btn-primary btn-sm" onClick={onOpenAddProject}>
            + Add New Project
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={onOpenAddSkill}>
            + Add New Skill
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onOpenAddBlog}>
            + Create Blog Article
          </button>
          <Link to="/" target="_blank" className="btn btn-outline btn-sm">
            👁 View Live Portfolio
          </Link>
        </div>
      </div>

      {/* Architecture Info Cards */}
      <div className="admin-panels-split">
        <div className="admin-panel-box">
          <h4 className="panel-box-title">LocalStorage Collection Status</h4>
          <ul className="storage-status-list">
            <li>
              <span>Key: <code>portfolio_projects</code></span>
              <span className="badge-status-ok">{projectsCount} entries</span>
            </li>
            <li>
              <span>Key: <code>portfolio_skills</code></span>
              <span className="badge-status-ok">{skillsCount} entries</span>
            </li>
            <li>
              <span>Key: <code>portfolio_blogs</code></span>
              <span className="badge-status-ok">{blogsCount} entries</span>
            </li>
            <li>
              <span>Key: <code>portfolio_messages</code></span>
              <span className="badge-status-ok">{messagesCount} entries</span>
            </li>
          </ul>
        </div>

        <div className="admin-panel-box">
          <h4 className="panel-box-title">System Role Security</h4>
          <p className="panel-box-text">
            Current session authenticated with <strong>ROLE: ADMIN</strong> privileges. Unauthenticated visitors or normal users are automatically restricted via React route guards.
          </p>
          <div className="security-notice-chip">
            <span>🛡️ Active Guard: RequireAdmin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

