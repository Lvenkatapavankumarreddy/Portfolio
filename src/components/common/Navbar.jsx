import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from '../../router/Router';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { user, isAdmin, isUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + hash);
    } else {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container navbar">
        {/* Brand Monogram */}
        <Link to="/" className="brand" aria-label="Portfolio Homepage">
          <span className="brand-monogram">VP</span>
          <span className="brand-text">
            <span className="brand-name">Portfolio</span>
            <span className="brand-title">Venkata Pavan</span>
          </span>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="nav-menu" role="navigation" aria-label="Main Navigation">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('about')}>
            About
          </button>
          <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('skills')}>
            Skills
          </button>
          <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('projects')}>
            Projects
          </button>
          <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('blog')}>
            Blog
          </button>
          <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('contact')}>
            Contact
          </button>
        </nav>

        {/* Action Buttons & Theme Controls */}
        <div className="nav-actions">
          <ThemeToggle />

          {/* User state */}
          {user ? (
            <div className="nav-user-dropdown">
              {isAdmin ? (
                <Link to="/admin" className="btn btn-amber btn-sm desktop-auth-btn">
                  Admin Console
                </Link>
              ) : (
                <Link to="/user" className="btn btn-outline btn-sm desktop-auth-btn">
                  User Hub
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm desktop-auth-btn btn-logout-nav"
                title="Log out"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm desktop-auth-btn">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm desktop-auth-btn">
                Signup
              </Link>
            </>
          )}

          {/* Mobile Drawer Hamburger Button */}
          <button
            type="button"
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer active" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          <nav className="nav-menu">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('about')}>
              About
            </button>
            <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('skills')}>
              Skills
            </button>
            <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('projects')}>
              Projects
            </button>
            <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('blog')}>
              Blog
            </button>
            <button type="button" className="nav-link btn-nav-anchor" onClick={() => handleNavClick('contact')}>
              Contact
            </button>
          </nav>
          <div className="mobile-drawer-footer">
            {user ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/user'}
                  className="btn btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isAdmin ? 'Admin Console' : 'User Hub'}
                </Link>
                <button type="button" className="btn btn-outline" onClick={handleLogout}>
                  Logout ({user.fullName.split(' ')[0]})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

