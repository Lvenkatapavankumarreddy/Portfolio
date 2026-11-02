import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';

export function BlogsManager({
  blogs,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  isOpenAddModal,
  onCloseAddModal,
  onOpenAddModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'React & Frontend',
    readTime: '5 min read',
    published: true
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'React & Frontend',
      readTime: '5 min read',
      published: true
    });
    setErrors({});
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content || '',
      category: blog.category || 'React & Frontend',
      readTime: blog.readTime || '5 min read',
      published: blog.published !== false
    });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.title || !form.title.trim()) {
      errs.title = 'Title is required.';
    }
    if (!form.excerpt || !form.excerpt.trim()) {
      errs.excerpt = 'Excerpt is required.';
    }
    if (!form.content || !form.content.trim()) {
      errs.content = 'Content is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAddBlog({
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      readTime: form.readTime.trim(),
      published: form.published
    });

    resetForm();
    onCloseAddModal();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onUpdateBlog(editingBlog.id, {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      readTime: form.readTime.trim(),
      published: form.published
    });

    setEditingBlog(null);
    resetForm();
  };

  const filtered = blogs.filter((b) => {
    const q = searchTerm.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-manager-wrapper">
      <div className="manager-toolbar">
        <div className="toolbar-search">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search articles by title, excerpt or category..."
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
          + Create Article
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title & Excerpt</th>
              <th>Category</th>
              <th>Read Time</th>
              <th>Status</th>
              <th>Date</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="td-empty">
                  No articles found.
                </td>
              </tr>
            ) : (
              filtered.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <strong>{blog.title}</strong>
                    <p className="table-subtext">{blog.excerpt.substring(0, 70)}...</p>
                  </td>
                  <td>
                    <span className="badge-category">{blog.category}</span>
                  </td>
                  <td>{blog.readTime}</td>
                  <td>
                    <span className={`status-pill ${blog.published !== false ? 'status-published' : 'status-draft'}`}>
                      {blog.published !== false ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{blog.date || 'Recent'}</td>
                  <td className="td-actions">
                    <button
                      type="button"
                      className="btn-action-edit"
                      onClick={() => openEditModal(blog)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-action-delete"
                      onClick={() => setDeletingBlog(blog)}
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

      {/* Add Blog Modal */}
      <Modal
        isOpen={isOpenAddModal}
        title="Author New Blog Article"
        onClose={() => {
          resetForm();
          onCloseAddModal();
        }}
      >
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="e.g. Scalable State Management in React 19"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <span className="field-error-msg">{errors.title}</span>}
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. React & Frontend"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Read Time</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 5 min read"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Summary / Excerpt *</label>
            <textarea
              rows="2"
              className={`form-textarea ${errors.excerpt ? 'is-invalid' : ''}`}
              placeholder="Short introductory summary for card previews..."
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            ></textarea>
            {errors.excerpt && <span className="field-error-msg">{errors.excerpt}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Article Content (Markdown / Text) *</label>
            <textarea
              rows="6"
              className={`form-textarea ${errors.content ? 'is-invalid' : ''}`}
              placeholder="Full article content..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            ></textarea>
            {errors.content && <span className="field-error-msg">{errors.content}</span>}
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Publish publicly on portfolio home page immediately</span>
            </label>
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
              Create Article
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Blog Modal */}
      <Modal
        isOpen={!!editingBlog}
        title={`Edit: ${editingBlog?.title || ''}`}
        onClose={() => {
          setEditingBlog(null);
          resetForm();
        }}
      >
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <span className="field-error-msg">{errors.title}</span>}
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Read Time</label>
              <input
                type="text"
                className="form-input"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Excerpt *</label>
            <textarea
              rows="2"
              className={`form-textarea ${errors.excerpt ? 'is-invalid' : ''}`}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            ></textarea>
            {errors.excerpt && <span className="field-error-msg">{errors.excerpt}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Content *</label>
            <textarea
              rows="6"
              className={`form-textarea ${errors.content ? 'is-invalid' : ''}`}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            ></textarea>
            {errors.content && <span className="field-error-msg">{errors.content}</span>}
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Published</span>
            </label>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setEditingBlog(null);
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
        isOpen={!!deletingBlog}
        title="Confirm Article Deletion"
        onClose={() => setDeletingBlog(null)}
        maxWidth="460px"
      >
        <div className="delete-dialog-content">
          <p>
            Are you sure you want to delete <strong>{deletingBlog?.title}</strong>?
          </p>
          <div className="modal-actions-footer">
            <button type="button" className="btn btn-outline" onClick={() => setDeletingBlog(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (deletingBlog) {
                  onDeleteBlog(deletingBlog.id);
                  setDeletingBlog(null);
                }
              }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

