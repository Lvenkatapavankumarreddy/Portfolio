import React from 'react';

export function AchievementsSection() {
  const stats = [
    { value: '100%', label: 'Responsive Design', desc: 'Fluid layout across all screen breakpoints' },
    { value: '4 Modules', label: 'Architecture', desc: 'Public, Auth, Admin & User workspaces' },
    { value: 'WCAG AA', label: 'Accessibility', desc: 'Accessible color contrasts, ARIA landmarks & keyboard traps' },
    { value: 'Vercel', label: 'Production Ready', desc: 'CI/CD pipeline with global edge deployment' }
  ];

  return (
    <section className="achievements-section">
      <div className="container">
        <div className="achievements-grid">
          {stats.map((s, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value gradient-text">{s.value}</span>
              <h4 className="stat-label">{s.label}</h4>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

