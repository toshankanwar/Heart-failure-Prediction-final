import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Make sure this path matches your theme context
import './Footer.css';

export default function Footer() {
 
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className={"footer-container"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-logo">❤️</span>
              Heart Predictor
            </h3>
            <p className="footer-description">
              Empowering healthcare decisions through advanced predictive analytics
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/predict" className="footer-link">Predict</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/table" className="footer-link">Table</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <nav className="footer-nav">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Use</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-separator" />
          <p className="footer-credit">
            © {currentYear} Heart Predictor. Made with{' '}
            <span className="heart-icon" aria-label="love">❤️</span> by{' '}
            <a 
              href="https://toshankanwar.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="dev-link"
            >
              Toshan Kanwar
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}