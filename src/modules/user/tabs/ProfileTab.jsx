import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export function ProfileTab({ onToast }) {
  const { user, updateProfile, changePassword } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [isEditingName, setIsEditingName] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handleUpdateName = (e) => {
    e.preventDefault();
    const res = updateProfile({ fullName });
    if (res.success) {
      setIsEditingName(false);
      if (onToast) onToast('Profile name updated successfully!', 'success');
    } else {
      if (onToast) onToast(res.error, 'error');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwdError('');

    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match.');
      return;
    }

    const res = changePassword(currentPassword, newPassword);
    if (res.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (onToast) onToast(res.message, 'success');
    } else {
      setPwdError(res.error);
    }
  };

  return (
    <div className="user-tab-pane">
      <div className="user-profile-overview-card">
        <div className="profile-details-grid">
          <div className="profile-detail-field">
            <span className="field-meta-label">Account Identifier</span>
            <span className="field-meta-val"><code>{user?.id}</code></span>
          </div>

          <div className="profile-detail-field">
            <span className="field-meta-label">Email Address</span>
            <span className="field-meta-val">{user?.email}</span>
          </div>

          <div className="profile-detail-field">
            <span className="field-meta-label">Assigned Role</span>
            <span className="field-meta-val">
              <span className="auth-role-tag role-user">ROLE: {(user?.role || 'user').toUpperCase()}</span>
            </span>
          </div>

          <div className="profile-detail-field">
            <span className="field-meta-label">Session Login Time</span>
            <span className="field-meta-val">
              {user?.loginTime ? new Date(user.loginTime).toLocaleString() : 'Active'}
            </span>
          </div>
        </div>

        {/* Edit Name */}
        <div className="profile-edit-section">
          <h4 className="sub-heading">Display Name</h4>
          {isEditingName ? (
            <form onSubmit={handleUpdateName} className="inline-edit-form">
              <input
                type="text"
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <div className="inline-buttons">
                <button type="submit" className="btn btn-primary btn-sm">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setFullName(user?.fullName || '');
                    setIsEditingName(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="name-display-row">
              <span className="current-name-text">{user?.fullName}</span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setIsEditingName(true)}
              >
                Edit Name
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Card */}
      <div className="user-profile-overview-card security-card">
        <h4 className="sub-heading">Change Password</h4>
        <p className="card-subtext">
          Update the password used to access your client account and saved bookmarks.
        </p>

        {pwdError && (
          <div className="auth-alert alert-danger" role="alert">
            <span>⚠️</span>
            <span>{pwdError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="password-form-grid">
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Min 8 chars, uppercase & number"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-sm">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

