import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg },
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    const endpoint = 'https://api.web3forms.com/submit';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '3246c9e3-95e7-454b-aecc-70c3488a3297', // Replace with your Web3Forms access key
          ...formData,
        }),
      });

      const json = await response.json();
      handleServerResponse(response.ok, json.message);
    } catch (error) {
      handleServerResponse(false, 'An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Heart Disease Predictor</title>
        <meta 
          name="description" 
          content="Contact us for any questions about the Heart Disease Prediction system." 
        />
      </Helmet>

      <div className="contact-container">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-header">
            <h1 className="contact-title">
              <span className="title-icon">📧</span>
              Contact Us
            </h1>
            <p className="contact-subtitle">
              Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
            </p>
          </div>

          <div className="contact-grid">
            <motion.div 
              className="contact-form-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message here..."
                    className="form-textarea"
                    rows="5"
                  />
                </div>

                <motion.button
                  className="submit-button"
                  type="submit"
                  disabled={status.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {status.info.error && (
                  <div className="error-message">
                    Error: {status.info.msg}
                  </div>
                )}

                {status.submitted && (
                  <div className="success-message">
                    {status.info.msg}
                  </div>
                )}
              </form>
            </motion.div>

            <motion.div 
              className="contact-info-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>International Institute of Information Technology, Naya Raipur Chhattisgarh India</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 ****93</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p>contact@toshankanwar.website</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    in
                  </a>
                  <a href="https://github.com/toshankanwar" target="_blank" rel="noopener noreferrer" className="social-icon">
                    GH
                  </a>
                </div>
              </div>

            
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}