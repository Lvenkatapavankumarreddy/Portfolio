import React, { useState, useEffect } from 'react';
import { getSkills } from '../../../services/storage';

export function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setSkills(getSkills());
  }, []);

  const categories = [
    { id: 'all', label: 'All Proficiencies' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'devops', label: 'DevOps & Tools' },
    { id: 'languages', label: 'Languages' }
  ];

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category?.toLowerCase() === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 02. TECHNICAL PROFICIENCY</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Dynamic catalog managed directly from the Admin Console and persisted via Local Storage.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-tabs-container">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filtered.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-progress-track">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.level}%` }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="skill-category-badge">{skill.category?.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

