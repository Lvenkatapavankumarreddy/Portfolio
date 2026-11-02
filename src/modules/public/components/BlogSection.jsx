import React, { useState, useEffect } from 'react';
import { getBlogs } from '../../../services/storage';

export function BlogSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Only display published blogs on public portfolio
    const allBlogs = getBlogs();
    setBlogs(allBlogs.filter(b => b.published !== false));
  }, []);

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 04. TECHNICAL WRITING</span>
          <h2 className="section-title">Articles & Engineering Insights</h2>
          <p className="section-subtitle">
            Exploring React architecture, frontend state design, and cloud deployment pipelines.
          </p>
        </div>

        <div className="blog-grid">
          {blogs.map(article => (
            <article key={article.id} className="blog-card">
              <div className="blog-meta-header">
                <span className="blog-category-tag">{article.category}</span>
                <span className="blog-read-time">{article.readTime}</span>
              </div>
              <h3 className="blog-title">{article.title}</h3>
              <p className="blog-excerpt">{article.excerpt}</p>
              <div className="blog-footer">
                <span className="blog-date">{article.date || 'Recent'}</span>
                <span className="blog-author">By {article.author || 'Venkata Pavan'}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

