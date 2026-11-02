import React, { useState } from 'react';
import { addMessage } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';

export function ContactSection({ onToast }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (min 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject || formData.subject.trim().length < 3) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        userId: user ? user.id : null
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: user?.fullName || '',
        email: user?.email || '',
        subject: '',
        message: ''
      });

      if (onToast) {
        onToast('Thank you! Your message has been sent to the Admin Console inbox.', 'success');
      }
    }, 400);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 05. INITIATE CONTACT</span>
          <h2 className="section-title">Get In Touch & Collaborate</h2>
          <p className="section-subtitle">
            Submissions are instantly routed into the Admin Console Messages Inbox.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct channels info */}
          <div className="contact-info-card">
            <h3 className="contact-info-title">Let's Build Something Exceptional</h3>
            <p className="contact-info-desc">
              Whether you have an engineering opportunity, a collaborative open-source project, or want to discuss full-stack architecture, I am always excited to connect.
            </p>

            <div className="contact-channels-list">
              <div className="channel-item">
                <div className="channel-icon">📧</div>
                <div>
                  <div className="channel-label">Email Address</div>
                  <a href="mailto:l.pavanreddy9989@gmail.com" className="channel-val">
                    l.pavanreddy9989@gmail.com
                  </a>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">💼</div>
                <div>
                  <div className="channel-label">LinkedIn Article & Profile</div>
                  <a
                    href="https://www.linkedin.com/pulse/personal-portfolio-lokasani-venkata-pavan-kumar-reddy--zfimf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-val"
                  >
                    View LinkedIn Showcase
                  </a>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">📍</div>
                <div>
                  <div className="channel-label">Current Location</div>
                  <span className="channel-val">Andhra Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="admin-inbox-tip">
              <span className="tip-badge">Live System</span>
              <p>
                Messages submitted here persist in <code>portfolio_messages</code> and can be reviewed inside the <strong>Admin Console</strong>.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="contact-form-card">
            {submitted && (
              <div className="form-success-banner" role="alert">
                <span>✓</span>
                <div>
                  <strong>Message Delivered!</strong>
                  <p>Your inquiry is stored in Local Storage and viewable by the administrator.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                />
                {errors.name && <span className="field-error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
                {errors.email && <span className="field-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">
                  Subject <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  className={`form-input ${errors.subject ? 'is-invalid' : ''}`}
                  placeholder="e.g. Frontend Engineering Collaboration"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                />
                {errors.subject && <span className="field-error-msg">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                  placeholder="Share details about the project, role, or proposal..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                ></textarea>
                {errors.message && <span className="field-error-msg">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Dispatching Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

