import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';

export function ProjectsManager({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  isOpenAddModal,
  onCloseAddModal,
  onOpenAddModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  // Form state for Add/Edit
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    image: '/assets/images/project-portfolio.svg'
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: 'Full Stack',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      image: '/assets/images/project-portfolio.svg'
    });
    setErrors({});
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setForm({
      title: proj.title,
      description: proj.description,
      category: proj.category || 'Full Stack',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || '',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      image: proj.image || '/assets/images/project-portfolio.svg'
    });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.title || !form.title.trim()) {
      errs.title = 'Project title is required.';
    }
    if (!form.description || !form.description.trim()) {
      errs.description = 'Project description is required.';
    }
    if (!form.technologies || !form.technologies.trim()) {
      errs.technologies = 'At least one technology is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const techArray = form.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onAddProject({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      technologies: techArray,
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      image: form.image.trim() || '/assets/images/project-portfolio.svg'
    });

    resetForm();
    onCloseAddModal();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const techArray = form.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onUpdateProject(editingProject.id, {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      technologies: techArray,
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      image: form.image.trim() || '/assets/images/project-portfolio.svg'
    });

    setEditingProject(null);
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (deletingProject) {
      onDeleteProject(deletingProject.id);
      setDeletingProject(null);
    }
  };

  const filtered = projects.filter((p) => {
    const q = searchTerm.toLowerCase();
    const titleMatch = p.title.toLowerCase().includes(q);
    const techMatch = Array.isArray(p.technologies)
      ? p.technologies.some(t => t.toLowerCase().includes(q))
      : false;
    return titleMatch || techMatch;
  });

  return (
    <div className="admin-manager-wrapper">
      {/* Top Toolbar */}
      <div className="manager-toolbar">
        <div className="toolbar-search">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search projects by title or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            onOpenAddModal();
          }}
        >
          + Add Project
        </button>
      </div>

      {/* Projects Table / List */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Project Title</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Links</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="td-empty">
                  No projects match your filter.
                </td>
              </tr>
            ) : (
              filtered.map((proj) => (
                <tr key={proj.id}>
                  <td>
                    <img
                      src={proj.image || '/assets/images/project-portfolio.svg'}
                      alt={proj.title}
                      className="table-thumb"
                      onError={(e) => {
                        e.target.src = '/assets/images/project-portfolio.svg';
                      }}
                    />
                  </td>
                  <td>
                    <strong>{proj.title}</strong>
                    <p className="table-subtext">{proj.description.substring(0, 70)}...</p>
                  </td>
                  <td>
                    <span className="badge-category">{proj.category}</span>
                  </td>
                  <td>
                    <div className="table-tags">
                      {Array.isArray(proj.technologies) &&
                        proj.technologies.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="table-tag">
                            {t}
                          </span>
                        ))}
                      {proj.technologies && proj.technologies.length > 3 && (
                        <span className="table-tag">+{proj.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="table-links">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="tbl-link">
                          Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="tbl-link">
                          Demo
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="td-actions">
                    <button
                      type="button"
                      className="btn-action-edit"
                      onClick={() => openEditModal(proj)}
                      aria-label="Edit project"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-action-delete"
                      onClick={() => setDeletingProject(proj)}
                      aria-label="Delete project"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal */}
      <Modal
        isOpen={isOpenAddModal}
        title="Add New Project"
        onClose={() => {
          resetForm();
          onCloseAddModal();
        }}
      >
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="e.g. AI Powered Analytics Engine"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <span className="field-error-msg">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              rows="3"
              className={`form-textarea ${errors.description ? 'is-invalid' : ''}`}
              placeholder="Detailed description of features and architecture..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
            {errors.description && <span className="field-error-msg">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (comma-separated) *</label>
            <input
              type="text"
              className={`form-input ${errors.technologies ? 'is-invalid' : ''}`}
              placeholder="e.g. React, Node.js, PostgreSQL, Docker"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            />
            {errors.technologies && <span className="field-error-msg">{errors.technologies}</span>}
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">GitHub Repository URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                resetForm();
                onCloseAddModal();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={!!editingProject}
        title={`Edit: ${editingProject?.title || ''}`}
        onClose={() => {
          setEditingProject(null);
          resetForm();
        }}
      >
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <span className="field-error-msg">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              rows="3"
              className={`form-textarea ${errors.description ? 'is-invalid' : ''}`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
            {errors.description && <span className="field-error-msg">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (comma-separated) *</label>
            <input
              type="text"
              className={`form-input ${errors.technologies ? 'is-invalid' : ''}`}
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            />
            {errors.technologies && <span className="field-error-msg">{errors.technologies}</span>}
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input
                type="url"
                className="form-input"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input
                type="url"
                className="form-input"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setEditingProject(null);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingProject}
        title="Confirm Project Deletion"
        onClose={() => setDeletingProject(null)}
        maxWidth="460px"
      >
        <div className="delete-dialog-content">
          <p>
            Are you sure you want to permanently delete <strong>{deletingProject?.title}</strong>?
          </p>
          <p className="delete-warning-text">This will remove it from Local Storage.</p>
          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setDeletingProject(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

