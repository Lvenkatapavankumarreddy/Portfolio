import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '../../router/Router';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { Toast } from '../../components/common/Toast';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getMessages,
  markMessageRead,
  deleteMessage
} from '../../services/storage';

import { DashboardOverview } from './sections/DashboardOverview';
import { ProjectsManager } from './sections/ProjectsManager';
import { SkillsManager } from './sections/SkillsManager';
import { BlogsManager } from './sections/BlogsManager';
import { MessagesManager } from './sections/MessagesManager';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Collections state
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal open states
  const [openAddProject, setOpenAddProject] = useState(false);
  const [openAddSkill, setOpenAddSkill] = useState(false);
  const [openAddBlog, setOpenAddBlog] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProjects(getProjects());
    setSkills(getSkills());
    setBlogs(getBlogs());
    setMessages(getMessages());
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Projects CRUD handlers
  const handleAddProject = (data) => {
    addProject(data);
    loadData();
    showToast('Project created successfully!');
  };

  const handleUpdateProject = (id, updates) => {
    updateProject(id, updates);
    loadData();
    showToast('Project updated successfully!');
  };

  const handleDeleteProject = (id) => {
    deleteProject(id);
    loadData();
    showToast('Project deleted.', 'info');
  };

  // Skills CRUD handlers
  const handleAddSkill = (data) => {
    addSkill(data);
    loadData();
    showToast('Skill added successfully!');
  };

  const handleUpdateSkill = (id, updates) => {
    updateSkill(id, updates);
    loadData();
    showToast('Skill updated!');
  };

  const handleDeleteSkill = (id) => {
    deleteSkill(id);
    loadData();
    showToast('Skill removed.', 'info');
  };

  // Blogs CRUD handlers
  const handleAddBlog = (data) => {
    addBlog(data);
    loadData();
    showToast('Article published successfully!');
  };

  const handleUpdateBlog = (id, updates) => {
    updateBlog(id, updates);
    loadData();
    showToast('Article updated!');
  };

  const handleDeleteBlog = (id) => {
    deleteBlog(id);
    loadData();
    showToast('Article deleted.', 'info');
  };

  // Messages handlers
  const handleMarkMessageRead = (id, isRead) => {
    markMessageRead(id, isRead);
    loadData();
  };

  const handleDeleteMessage = (id) => {
    deleteMessage(id);
    loadData();
    showToast('Message deleted.', 'info');
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-sidebar-brand" aria-label="Portfolio Homepage">
            <span className="brand-monogram monogram-admin">VP</span>
            <span className="brand-text">
              <span className="brand-name">Admin Console</span>
              <span className="brand-title">Venkata Pavan</span>
            </span>
          </Link>
          <button
            type="button"
            className="admin-modal-close sidebar-close-btn"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dashboard');
              setMobileSidebarOpen(false);
            }}
          >
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">📊</span>
              <span>Dashboard</span>
            </div>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('projects');
              setMobileSidebarOpen(false);
            }}
          >
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">💻</span>
              <span>Projects</span>
            </div>
            <span className="admin-nav-badge">{projects.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('skills');
              setMobileSidebarOpen(false);
            }}
          >
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">⚡</span>
              <span>Skills</span>
            </div>
            <span className="admin-nav-badge">{skills.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('blogs');
              setMobileSidebarOpen(false);
            }}
          >
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">📝</span>
              <span>Blogs</span>
            </div>
            <span className="admin-nav-badge">{blogs.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('messages');
              setMobileSidebarOpen(false);
            }}
          >
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">📬</span>
              <span>Messages</span>
            </div>
            {unreadMessagesCount > 0 ? (
              <span className="admin-nav-badge badge-unread">{unreadMessagesCount}</span>
            ) : (
              <span className="admin-nav-badge">{messages.length}</span>
            )}
          </button>

          <div className="admin-sidebar-divider"></div>

          <Link to="/" target="_blank" className="admin-nav-item">
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">🌐</span>
              <span>Public Portfolio</span>
            </div>
          </Link>

          <button
            type="button"
            className="admin-nav-item btn-logout-sidebar"
            onClick={handleLogout}
          >
            <div className="admin-nav-item-content">
              <span className="nav-item-icon">🚪</span>
              <span>Logout</span>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer Admin User Badge */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-profile-badge">
            <div className="admin-user-profile-avatar">AD</div>
            <div className="admin-user-profile-meta">
              <div className="admin-user-profile-name">{user?.fullName || 'Administrator'}</div>
              <div className="admin-user-profile-role">ROLE: ADMIN</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Console */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="admin-breadcrumb">
              <span>Admin Console</span>
              <span>/</span>
              <span className="admin-breadcrumb-active">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </span>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <span className="auth-role-tag role-admin">ADMIN AUTHENTICATED</span>
            <ThemeToggle />
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Dynamic Section Rendering */}
        <div className="admin-content-area">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              projectsCount={projects.length}
              skillsCount={skills.length}
              blogsCount={blogs.length}
              messagesCount={messages.length}
              unreadMessagesCount={unreadMessagesCount}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAddProject={() => {
                setActiveTab('projects');
                setOpenAddProject(true);
              }}
              onOpenAddSkill={() => {
                setActiveTab('skills');
                setOpenAddSkill(true);
              }}
              onOpenAddBlog={() => {
                setActiveTab('blogs');
                setOpenAddBlog(true);
              }}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsManager
              projects={projects}
              onAddProject={handleAddProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              isOpenAddModal={openAddProject}
              onCloseAddModal={() => setOpenAddProject(false)}
              onOpenAddModal={() => setOpenAddProject(true)}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsManager
              skills={skills}
              onAddSkill={handleAddSkill}
              onUpdateSkill={handleUpdateSkill}
              onDeleteSkill={handleDeleteSkill}
              isOpenAddModal={openAddSkill}
              onCloseAddModal={() => setOpenAddSkill(false)}
              onOpenAddModal={() => setOpenAddSkill(true)}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogsManager
              blogs={blogs}
              onAddBlog={handleAddBlog}
              onUpdateBlog={handleUpdateBlog}
              onDeleteBlog={handleDeleteBlog}
              isOpenAddModal={openAddBlog}
              onCloseAddModal={() => setOpenAddBlog(false)}
              onOpenAddModal={() => setOpenAddBlog(true)}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesManager
              messages={messages}
              onMarkRead={handleMarkMessageRead}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
        </div>
      </main>

      {/* Floating Toast Notification */}
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

