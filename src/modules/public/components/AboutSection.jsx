import React from 'react';

export function AboutSection() {
  const pillars = [
    {
      icon: '⚛️',
      title: 'Modern Frontend Engineering',
      desc: 'Developing reactive single-page applications with React 19, Vite, modular CSS design tokens, and smooth user interactions.'
    },
    {
      icon: '🛡️',
      title: 'State & Role Security',
      desc: 'Architecting robust client-side state, sanitized session objects, role guards (ADMIN vs USER), and data validation.'
    },
    {
      icon: '🚀',
      title: 'Cloud & Vercel Deployment',
      desc: 'Optimized production builds with zero bloat, automated CI/CD rewrites, and fast global edge delivery on Vercel.'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 01. ABOUT ME</span>
          <h2 className="section-title">Engineering Architecture & Philosophy</h2>
          <p className="section-subtitle">
            A developer dedicated to building maintainable, scalable, and user-centric applications.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-story-card">
            <h3 className="story-title">Crafting Purpose-Driven Digital Experiences</h3>
            <p>
              I am Venkata Pavan, a software engineer passionate about modern web technologies. I specialize in building reactive applications that solve real-world problems with elegance and speed.
            </p>
            <p>
              This platform highlights a multi-tiered architecture featuring an open public portfolio, an authenticated client workspace (User Hub), and a complete administrative console (Admin Console) with full CRUD operations.
            </p>
            <div className="about-details-list">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">Venkata Pavan</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className="detail-value">Full Stack Developer</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Core Stack:</span>
                <span className="detail-value">React, Vite, Node.js, LocalStorage</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Deployment:</span>
                <span className="detail-value">Vercel (Global Edge)</span>
              </div>
            </div>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((p, idx) => (
              <div key={idx} className="pillar-card">
                <div className="pillar-icon">{p.icon}</div>
                <h4 className="pillar-title">{p.title}</h4>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

