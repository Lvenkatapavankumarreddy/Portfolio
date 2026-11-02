import React, { useState } from 'react';
import { Link, useNavigate } from '../../router/Router';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';

export function SignupPage() {
  const { signup, checkPasswordStrength } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = checkPasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = signup({
      fullName,
      email,
      password,
      confirmPassword,
      termsAccepted
    });

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(result.message);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="ambient-glow" aria-hidden="true"></div>

      <header className="auth-header">
        <Link to="/" className="brand" aria-label="Portfolio Homepage">
          <span className="brand-monogram">VP</span>
          <span className="brand-text">
            <span className="brand-name">Portfolio</span>
            <span className="brand-title">Venkata Pavan</span>
          </span>
        </Link>
        <div className="auth-header-actions">
          <ThemeToggle />
          <Link to="/" className="btn btn-outline btn-sm">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="auth-main-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <span className="section-tag">// MODULE 2: REGISTRATION</span>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Register as a client user to save projects, track inquiries, and access the User Hub.
            </p>
          </div>

          {error && (
            <div className="auth-alert alert-danger" role="alert">
              <span className="alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="auth-alert alert-success" role="alert">
              <span className="alert-icon">✓</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="signup-name"
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="signup-email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                Password <span className="required-star">*</span>
              </label>
              <div className="input-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  className="form-input"
                  placeholder="Min 8 chars, uppercase & number"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="password-strength-container">
                  <div className="strength-meter-bar">
                    <div
                      className={`strength-fill strength-${strength.label.toLowerCase()}`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`strength-label strength-label-${strength.label.toLowerCase()}`}>
                    Strength: {strength.label}
                  </span>

                  <div className="password-rules-checklist">
                    <span className={strength.hasMinLen ? 'rule-met' : 'rule-unmet'}>
                      {strength.hasMinLen ? '✓' : '○'} 8+ characters
                    </span>
                    <span className={strength.hasUpper ? 'rule-met' : 'rule-unmet'}>
                      {strength.hasUpper ? '✓' : '○'} Uppercase (A-Z)
                    </span>
                    <span className={strength.hasLower ? 'rule-met' : 'rule-unmet'}>
                      {strength.hasLower ? '✓' : '○'} Lowercase (a-z)
                    </span>
                    <span className={strength.hasNumber ? 'rule-met' : 'rule-unmet'}>
                      {strength.hasNumber ? '✓' : '○'} Number (0-9)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm" className="form-label">
                Confirm Password <span className="required-star">*</span>
              </label>
              <div className="input-group password-group">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="signup-confirm"
                  className="form-input"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowConfirm(prev => !prev)}
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <span className={`match-hint ${passwordsMatch ? 'match-valid' : 'match-invalid'}`}>
                  {passwordsMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">
                  I agree to the Terms & Conditions and understand credentials are demo-stored in Local Storage.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-card-footer">
            <p>
              Already registered?{' '}
              <Link to="/login" className="auth-accent-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

