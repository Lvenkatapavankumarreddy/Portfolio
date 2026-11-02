import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';

export function MessagesManager({
  messages,
  onMarkRead,
  onDeleteMessage
}) {
  const [filter, setFilter] = useState('all');
  const [activeMessage, setActiveMessage] = useState(null);
  const [deletingMessage, setDeletingMessage] = useState(null);

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return !!m.read;
    return true;
  });

  const handleOpenDetail = (msg) => {
    setActiveMessage(msg);
    if (!msg.read) {
      onMarkRead(msg.id, true);
    }
  };

  return (
    <div className="admin-manager-wrapper">
      <div className="manager-toolbar">
        <div className="filter-pills-row">
          <button
            type="button"
            className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Messages ({messages.length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({messages.filter(m => !m.read).length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({messages.filter(m => m.read).length})
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Sender</th>
              <th>Subject & Preview</th>
              <th>Date</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="td-empty">
                  No contact inquiries found.
                </td>
              </tr>
            ) : (
              filtered.map((msg) => (
                <tr key={msg.id} className={!msg.read ? 'row-unread' : ''}>
                  <td>
                    <span className={`msg-status-dot ${!msg.read ? 'dot-unread' : 'dot-read'}`} title={!msg.read ? 'Unread message' : 'Read'}>
                      ●
                    </span>
                  </td>
                  <td>
                    <strong>{msg.name}</strong>
                    <div className="table-subtext">{msg.email}</div>
                  </td>
                  <td>
                    <div className="msg-preview-line" onClick={() => handleOpenDetail(msg)} role="button">
                      <strong>{msg.subject}</strong>
                      <span className="table-subtext"> - {msg.message.substring(0, 50)}...</span>
                    </div>
                  </td>
                  <td>
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Recent'}
                  </td>
                  <td className="td-actions">
                    <button
                      type="button"
                      className="btn-action-view"
                      onClick={() => handleOpenDetail(msg)}
                    >
                      Read
                    </button>
                    <button
                      type="button"
                      className="btn-action-delete"
                      onClick={() => setDeletingMessage(msg)}
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

      {/* Message Detail Modal */}
      <Modal
        isOpen={!!activeMessage}
        title={activeMessage?.subject || 'Message Detail'}
        onClose={() => setActiveMessage(null)}
      >
        {activeMessage && (
          <div className="message-modal-content">
            <div className="msg-meta-box">
              <p><strong>From:</strong> {activeMessage.name} &lt;{activeMessage.email}&gt;</p>
              <p>
                <strong>Received:</strong>{' '}
                {new Date(activeMessage.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="msg-body-box">
              <p>{activeMessage.message}</p>
            </div>
            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  onMarkRead(activeMessage.id, !activeMessage.read);
                  setActiveMessage(prev => ({ ...prev, read: !prev.read }));
                }}
              >
                Mark as {activeMessage.read ? 'Unread' : 'Read'}
              </button>
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                className="btn btn-primary"
              >
                Reply via Email &rarr;
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingMessage}
        title="Delete Message"
        onClose={() => setDeletingMessage(null)}
        maxWidth="460px"
      >
        <div className="delete-dialog-content">
          <p>
            Are you sure you want to delete the message from <strong>{deletingMessage?.name}</strong>?
          </p>
          <div className="modal-actions-footer">
            <button type="button" className="btn btn-outline" onClick={() => setDeletingMessage(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (deletingMessage) {
                  onDeleteMessage(deletingMessage.id);
                  setDeletingMessage(null);
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

