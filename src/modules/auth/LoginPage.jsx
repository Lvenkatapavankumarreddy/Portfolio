import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '../../router/Router';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';

export function LoginPage() {
  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect
    if (user) {
      navigate(isAdmin ? '/admin' : '/user', { replace: true });
    }
    // Check remembered email
    const remembered = localStorage.getItem('portfolio_remember_email');
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = login(email, password, rememberMe);
    if (!result.success) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess('Login successful. Redirecting to workspace...');
      setTimeout(() => {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }, 700);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@portfolio.com');
    setPassword('Admin123');
    setError('');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="ambient-glow" aria-hidden="true"></div>

      {/* Top Navbar */}
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

      {/* Main Authentication Box */}
      <main className="auth-main-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <span className="section-tag">// MODULE 3: AUTH PORTAL</span>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to access your administrative tools or client workspace.
            </p>
          </div>

          {/* Feedback Alerts */}
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
              <label htmlFor="login-email" className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <input
                  type="email"
                  id="login-email"
                  className="form-input"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
              </div>
              <div className="input-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className="form-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="auth-extras-row">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Remember email</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Credential Helper */}
          <div className="demo-credentials-banner">
            <div className="demo-creds-header">
              <span className="badge-demo">Demo Administrator</span>
              <button
                type="button"
                className="btn-quick-fill"
                onClick={fillDemoAdmin}
              >
                Auto-Fill
              </button>
            </div>
            <div className="demo-creds-body">
              <p><strong>Email:</strong> admin@portfolio.com</p>
              <p><strong>Password:</strong> Admin123</p>
              <p className="demo-creds-note">Role: ADMIN (Full Projects, Skills, Blogs & Inbox CRUD)</p>
            </div>
          </div>

          <div className="auth-card-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-accent-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

