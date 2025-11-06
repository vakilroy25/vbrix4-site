import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // honeypot
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setIsSubmitting(true);

    // Honeypot check
    if (formData.website) {
      setIsSuccess(true);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setStatus('');
      } else {
        setStatus(data.error || 'Send failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      setStatus('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact-wrapper"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="contact-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>

          {!isSuccess ? (
            <>
              <form onSubmit={handleSubmit} className="contact-form glass">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="btn-loading">
                      <span className="spinner"></span>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {status && <p className="status-message">{status}</p>}
              </form>

              <p className="contact-hint">
                Prefer chat? Use the bubble in the corner—we'll respond quickly.
              </p>
            </>
          ) : (
            <div className="success-message glass">
              <div className="success-icon">✓</div>
              <h3>Thank you for reaching out!</h3>
              <p>
                We've received your message and appreciate you taking the time to contact us.
              </p>
              <p>
                Our team will review your inquiry and get back to you as soon as possible. 
                You should also receive a confirmation email shortly.
              </p>
              <p className="success-note">
                In the meantime, feel free to explore our demos or use the chat bubble for urgent questions.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;

