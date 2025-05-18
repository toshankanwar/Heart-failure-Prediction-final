import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const { darkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'visible';
  };

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = 'visible';
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`navbar ${darkMode ? 'dark' : 'light'} ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">❤️</span>
            <span className="logo-text">Heart Predictor</span>
          </Link>

          <div className="navbar-links desktop-nav">
            <NavLinks />
          </div>

          <button 
            className={`mobile-toggle ${menuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-overlay"
              onClick={toggleMenu}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <NavLinks mobile onClick={toggleMenu} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Separate component for nav links to avoid repetition
const NavLinks = ({ mobile, onClick }) => {
  const location = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/predict", label: "Predict" },
    { to: "/about", label: "About" },
    { to: "/table", label: "Table" },
    { to: "/contact", label: "Contact" }
  ];

  return links.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`nav-link ${mobile ? 'mobile' : ''} ${
        location.pathname === link.to ? 'active' : ''
      }`}
      onClick={onClick}
    >
      {link.label}
    </Link>
  ));
};