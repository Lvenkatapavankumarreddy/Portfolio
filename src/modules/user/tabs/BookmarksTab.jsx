import React, { useState, useEffect } from 'react';
import { Link } from '../../../router/Router';
import { getBookmarks, getProjects, toggleBookmark } from '../../../services/storage';

export function BookmarksTab({ user, onToast }) {
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, [user]);

  const loadBookmarks = () => {
    if (!user) return;
    const bookmarkIds = getBookmarks(user.id);
    const allProjects = getProjects();
    const matched = allProjects.filter(p => bookmarkIds.includes(p.id));
    setBookmarkedProjects(matched);
  };

  const handleRemove = (projId, title) => {
    toggleBookmark(user.id, projId);
    loadBookmarks();
    if (onToast) onToast(`Removed "${title}" from your bookmarks.`, 'info');
  };

  return (
    <div className="user-tab-pane">
      <div className="user-pane-header">
        <div>
          <h3 className="pane-title">Saved Projects ({bookmarkedProjects.length})</h3>
          <p className="pane-subtitle">
            Projects bookmarked from the portfolio showcase, saved to your Local Storage account.
          </p>
        </div>
        <Link to="/#projects" className="btn btn-outline btn-sm">
          Browse More Projects
        </Link>
      </div>

      {bookmarkedProjects.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon">📁</div>
          <h4>No Bookmarked Projects Yet</h4>
          <p>
            Browse the featured engineering showcase on the home page and click the bookmark star to save projects here for quick review.
          </p>
          <Link to="/#projects" className="btn btn-primary btn-sm">
            Explore Portfolio Projects
          </Link>
        </div>
      ) : (
        <div className="bookmarks-grid">
          {bookmarkedProjects.map((proj) => (
            <div key={proj.id} className="bookmark-card">
              <div className="bookmark-header">
                <span className="badge-category">{proj.category}</span>
                <button
                  type="button"
                  className="btn-remove-bookmark"
                  onClick={() => handleRemove(proj.id, proj.title)}
                  title="Remove bookmark"
                  aria-label="Remove bookmark"
                >
                  ✕
                </button>
              </div>
              <h4 className="bookmark-title">{proj.title}</h4>
              <p className="bookmark-desc">{proj.description}</p>
              <div className="bookmark-tech-tags">
                {Array.isArray(proj.technologies) &&
                  proj.technologies.map((t, idx) => (
                    <span key={idx} className="tech-tag">
                      {t}
                    </span>
                  ))}
              </div>
              <div className="bookmark-actions">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Live Demo
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

