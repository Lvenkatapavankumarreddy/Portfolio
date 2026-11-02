import React from 'react';
import { Link } from '../../router/Router';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-grid">
        {/* Brand Summary */}
        <div className="footer-brand-col">
          <Link to="/" className="brand" aria-label="Portfolio Homepage">
            <span className="brand-monogram">VP</span>
            <span className="brand-text">
              <span className="brand-name">Portfolio</span>
              <span className="brand-title">Venkata Pavan</span>
            </span>
          </Link>
          <p className="footer-bio">
            Full-Stack Developer & Software Engineer passionate about crafting high-performance, modular web applications with React, Vite, and modern cloud deployment.
          </p>
          <div className="footer-status-pill">
            <span className="pulse-dot"></span>
            <span>Open to Engineering Opportunities</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#blog">Blog Articles</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Portals & Modules */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Portals & Modules</h4>
          <ul className="footer-nav-list">
            <li><Link to="/login">Account Login</Link></li>
            <li><Link to="/signup">Register Account</Link></li>
            <li><Link to="/admin">Admin Console</Link></li>
            <li><Link to="/user">User Dashboard</Link></li>
          </ul>
        </div>

        {/* Connect & Social */}
        <div className="footer-connect-col">
          <h4 className="footer-col-title">Connect</h4>
          <div className="social-links-grid">
            <a href="https://github.com/venkatapavan78" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="GitHub Profile">
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/pulse/personal-portfolio-lokasani-venkata-pavan-kumar-reddy--zfimf" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn Profile">
              <span>LinkedIn</span>
            </a>
            <a href="mailto:pavan@example.com" className="social-pill" aria-label="Send Email">
              <span>Email</span>
            </a>
          </div>
          <p className="footer-location-note">
            📍 Andhra Pradesh / India • UTC+05:30
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Venkata Pavan. All rights reserved. Built with React + Vite & Deployed on Vercel.
        </p>
        <button type="button" className="btn-back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          <span>Top</span>
        </button>
      </div>
    </footer>
  );
}

