import React, { useEffect } from 'react';

export function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeClass =
    type === 'success'
      ? 'toast-success'
      : type === 'error'
      ? 'toast-error'
      : 'toast-info';

  return (
    <div className={`toast-notification ${typeClass}`} role="alert" aria-live="polite">
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className="toast-text">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Dismiss notice"
        >
          &times;
        </button>
      )}
    </div>
  );
}

