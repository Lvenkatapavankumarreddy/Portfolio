import React, { useState, useEffect } from 'react';
import { getProjects, getBookmarks, toggleBookmark } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from '../../../router/Router';

export function ProjectsSection({ onToast }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setProjects(getProjects());
    if (user) {
      setBookmarks(getBookmarks(user.id));
    }
  }, [user]);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const handleBookmarkClick = (projectId, title) => {
    if (!user) {
      if (onToast) onToast('Please log in or register to bookmark projects into your User Hub.', 'info');
      navigate('/login');
      return;
    }

    const updated = toggleBookmark(user.id, projectId);
    setBookmarks(updated);
    const isBookmarked = updated.includes(projectId);
    if (onToast) {
      onToast(
        isBookmarked
          ? `Saved "${title}" to your User Hub bookmarks!`
          : `Removed "${title}" from your bookmarks.`,
        'success'
      );
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 03. FEATURED ENGINEERING</span>
          <h2 className="section-title">Projects & Applications</h2>
          <p className="section-subtitle">
            Curated software systems with full client-side persistence and Admin CRUD capabilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs-container">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filtered.length === 0 ? (
            <div className="empty-state-card">
              <p>No projects found in this category.</p>
            </div>
          ) : (
            filtered.map(proj => {
              const isSaved = bookmarks.includes(proj.id);
              return (
                <article key={proj.id} className="project-card">
                  <div className="project-media-wrapper">
                    <img
                      src={proj.image || '/assets/images/project-portfolio.svg'}
                      alt={`${proj.title} preview illustration`}
                      className="project-img"
                      onError={(e) => {
                        e.target.src = '/assets/images/project-portfolio.svg';
                      }}
                    />
                    <span className="project-category-pill">{proj.category}</span>
                  </div>

                  <div className="project-card-body">
                    <div className="project-card-header">
                      <h3 className="project-title">{proj.title}</h3>
                      <button
                        type="button"
                        className={`btn-bookmark-action ${isSaved ? 'bookmarked' : ''}`}
                        onClick={() => handleBookmarkClick(proj.id, proj.title)}
                        title={isSaved ? 'Remove from saved' : 'Save to User Hub'}
                        aria-label={`Bookmark ${proj.title}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </button>
                    </div>

                    <p className="project-description">{proj.description}</p>

                    <div className="tech-tags-list">
                      {Array.isArray(proj.technologies)
                        ? proj.technologies.map((t, i) => (
                            <span key={i} className="tech-tag">
                              {t}
                            </span>
                          ))
                        : (proj.technologies || '').split(',').map((t, i) => (
                            <span key={i} className="tech-tag">
                              {t.trim()}
                            </span>
                          ))}
                    </div>

                    <div className="project-links-row">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-link"
                          aria-label={`GitHub source code for ${proj.title}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          <span>Code</span>
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-link link-primary"
                          aria-label={`Live demo for ${proj.title}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

