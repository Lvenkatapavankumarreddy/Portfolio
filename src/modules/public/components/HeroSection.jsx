import React, { useState, useEffect } from 'react';
import { Link } from '../../../router/Router';

export function HeroSection() {
  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'React & Vite Architect',
    'Cloud Systems Specialist'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullRole) {
      speed = 1800; // Pause at full word
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      speed = 400;
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullRole.length) {
          setDisplayText(currentFullRole.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentFullRole.slice(0, displayText.length - 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Bio & Calls to Action */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>Available for Full-Time & Freelance Roles</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Venkata Pavan</span>
          </h1>

          <div className="typewriter-container" aria-label="Professional Specializations">
            <span className="typewriter-prefix">I am a </span>
            <span className="typewriter-text">{displayText}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          <p className="hero-description">
            Building modern, high-performance web applications with React, Vite, clean component architectures, and responsive design systems. Designed with modular user and admin workspaces.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
            <Link to="/login" className="btn btn-secondary">
              Login to Workspace
            </Link>
          </div>

          <div className="hero-social-links">
            <span className="hero-social-label">Follow / Connect:</span>
            <a
              href="https://github.com/venkatapavan78"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="GitHub Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/pulse/personal-portfolio-lokasani-venkata-pavan-kumar-reddy--zfimf"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="LinkedIn Article"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Showcase */}
        <div className="hero-visual">
          <div className="hero-avatar-card">
            <div className="avatar-glass-backdrop">
              <img
                src="/assets/images/profile-placeholder.svg"
                alt="Venkata Pavan Developer Illustration"
                className="hero-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="avatar-initials-fallback">VP</div>
            </div>

            <div className="floating-stat-badge badge-tech">
              <span className="stat-icon">⚡</span>
              <div>
                <strong>React + Vite</strong>
                <p>Lightning Fast Build</p>
              </div>
            </div>

            <div className="floating-stat-badge badge-status">
              <span className="stat-icon">🛡️</span>
              <div>
                <strong>Admin & User Hub</strong>
                <p>Role-Based Routing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

