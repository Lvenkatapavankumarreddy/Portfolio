import React, { useState, useEffect } from 'react';
import { getMessages, addMessage } from '../../../services/storage';

export function MyInquiriesTab({ user, onToast }) {
  const [inquiries, setInquiries] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadInquiries();
  }, [user]);

  const loadInquiries = () => {
    if (!user) return;
    const all = getMessages();
    const my = all.filter(
      (m) =>
        (m.userId && m.userId === user.id) ||
        (m.email && m.email.toLowerCase() === user.email.toLowerCase())
    );
    setInquiries(my);
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    addMessage({
      name: user.fullName,
      email: user.email,
      subject: subject.trim(),
      message: message.trim(),
      userId: user.id
    });

    setSubject('');
    setMessage('');
    setShowNewModal(false);
    loadInquiries();

    if (onToast) onToast('Inquiry sent to Admin Console successfully!', 'success');
  };

  return (
    <div className="user-tab-pane">
      <div className="user-pane-header">
        <div>
          <h3 className="pane-title">My Collaboration Inquiries ({inquiries.length})</h3>
          <p className="pane-subtitle">
            Track inquiries and project proposals submitted to the portfolio administrator.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowNewModal(true)}
        >
          + New Inquiry
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon">✉️</div>
          <h4>No Submitted Inquiries Yet</h4>
          <p>Have an engineering idea or role to discuss? Dispatch a direct message to the admin.</p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowNewModal(true)}
          >
            Create Your First Inquiry
          </button>
        </div>
      ) : (
        <div className="inquiries-list">
          {inquiries.map((inq) => (
            <div key={inq.id} className="inquiry-card">
              <div className="inquiry-header">
                <div>
                  <h4 className="inquiry-subject">{inq.subject}</h4>
                  <span className="inquiry-date">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}
                  </span>
                </div>
                <span className={`badge-inquiry-status ${inq.read ? 'status-reviewed' : 'status-pending'}`}>
                  {inq.read ? 'Reviewed by Admin' : 'Pending Review'}
                </span>
              </div>
              <p className="inquiry-body">{inq.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* New Inquiry Inline Form / Modal */}
      {showNewModal && (
        <div className="modal-backdrop" onClick={() => setShowNewModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">New Collaboration Inquiry</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowNewModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSendInquiry} className="modal-body">
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Contract Discussion, Architecture Review"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea
                  rows="4"
                  className="form-textarea"
                  placeholder="Describe your request or proposal..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-actions-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowNewModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

