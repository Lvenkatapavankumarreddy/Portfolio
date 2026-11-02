import React from 'react';

export function SecurityTab({ user }) {
  return (
    <div className="user-tab-pane">
      <div className="user-pane-header">
        <div>
          <h3 className="pane-title">Security & Session Details</h3>
          <p className="pane-subtitle">
            Client-side authentication safeguards and Local Storage structure.
          </p>
        </div>
      </div>

      <div className="security-cards-grid">
        <div className="security-info-box">
          <h4 className="info-box-title">🛡️ Session Protection</h4>
          <p>
            Your active session is stored under the <code>portfolio_current_user</code> key. In compliance with security standards, plaintext passwords are never included inside the active session payload.
          </p>
          <div className="code-display-block">
            <pre>
              {JSON.stringify(
                {
                  id: user?.id,
                  fullName: user?.fullName,
                  email: user?.email,
                  role: user?.role,
                  loginTime: user?.loginTime
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        <div className="security-info-box">
          <h4 className="info-box-title">🔒 Route Guards & Authorization</h4>
          <p>
            Access between user and administrator resources is protected through role-based routing checks:
          </p>
          <ul className="security-rules-list">
            <li><strong>Admin Route (RequireAdmin):</strong> Only accessible if <code>role === 'admin'</code>. Attempted user access is redirected to this hub.</li>
            <li><strong>User Route (RequireAuth):</strong> Strictly requires an active session. Unauthenticated access bounces to <code>/login</code>.</li>
            <li><strong>Back Button Protection:</strong> Invalidates access instantly upon logging out.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

