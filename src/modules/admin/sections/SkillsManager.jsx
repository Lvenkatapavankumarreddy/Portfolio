import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';

export function SkillsManager({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  isOpenAddModal,
  onCloseAddModal,
  onOpenAddModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingSkill, setEditingSkill] = useState(null);
  const [deletingSkill, setDeletingSkill] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'frontend',
    level: 80
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setForm({ name: '', category: 'frontend', level: 80 });
    setErrors({});
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category || 'frontend',
      level: skill.level || 80
    });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.name || !form.name.trim()) {
      errs.name = 'Skill name is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAddSkill({
      name: form.name.trim(),
      category: form.category,
      level: Number(form.level)
    });

    resetForm();
    onCloseAddModal();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onUpdateSkill(editingSkill.id, {
      name: form.name.trim(),
      category: form.category,
      level: Number(form.level)
    });

    setEditingSkill(null);
    resetForm();
  };

  const filtered = skills.filter((s) => {
    const q = searchTerm.toLowerCase();
    const nameMatch = s.name.toLowerCase().includes(q);
    const catMatch = categoryFilter === 'all' || s.category?.toLowerCase() === categoryFilter;
    return nameMatch && catMatch;
  });

  return (
    <div className="admin-manager-wrapper">
      <div className="manager-toolbar">
        <div className="toolbar-search-row">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search skills by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="languages">Languages</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            onOpenAddModal();
          }}
        >
          + Add Skill
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Proficiency</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="td-empty">
                  No skills found.
                </td>
              </tr>
            ) : (
              filtered.map((skill) => (
                <tr key={skill.id}>
                  <td>
                    <strong>{skill.name}</strong>
                  </td>
                  <td>
                    <span className="badge-category">{skill.category}</span>
                  </td>
                  <td>
                    <div className="table-progress-group">
                      <div className="table-progress-bar">
                        <div
                          className="table-progress-fill"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="table-progress-label">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="td-actions">
                    <button
                      type="button"
                      className="btn-action-edit"
                      onClick={() => openEditModal(skill)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-action-delete"
                      onClick={() => setDeletingSkill(skill)}
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

      {/* Add Skill Modal */}
      <Modal
        isOpen={isOpenAddModal}
        title="Add Technical Skill"
        onClose={() => {
          resetForm();
          onCloseAddModal();
        }}
      >
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Skill Name *</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'is-invalid' : ''}`}
              placeholder="e.g. Next.js, GraphQL, Redis"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="field-error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="frontend">Frontend & UI</option>
              <option value="backend">Backend & APIs</option>
              <option value="devops">DevOps & Cloud</option>
              <option value="languages">Programming Languages</option>
            </select>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label">Proficiency Level</label>
              <span className="slider-val-badge">{form.level}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              className="form-range"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            />
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
              Save Skill
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Skill Modal */}
      <Modal
        isOpen={!!editingSkill}
        title={`Edit Skill: ${editingSkill?.name || ''}`}
        onClose={() => {
          setEditingSkill(null);
          resetForm();
        }}
      >
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Skill Name *</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'is-invalid' : ''}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="field-error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="frontend">Frontend & UI</option>
              <option value="backend">Backend & APIs</option>
              <option value="devops">DevOps & Cloud</option>
              <option value="languages">Programming Languages</option>
            </select>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label">Proficiency Level</label>
              <span className="slider-val-badge">{form.level}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              className="form-range"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            />
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setEditingSkill(null);
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
        isOpen={!!deletingSkill}
        title="Confirm Skill Deletion"
        onClose={() => setDeletingSkill(null)}
        maxWidth="460px"
      >
        <div className="delete-dialog-content">
          <p>
            Are you sure you want to delete the skill <strong>{deletingSkill?.name}</strong>?
          </p>
          <div className="modal-actions-footer">
            <button type="button" className="btn btn-outline" onClick={() => setDeletingSkill(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (deletingSkill) {
                  onDeleteSkill(deletingSkill.id);
                  setDeletingSkill(null);
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

