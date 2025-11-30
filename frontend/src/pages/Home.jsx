import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const { scrollY } = useScroll();
 

  // Scroll animations
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const statistics = [
    { value: "89%", label: "Prediction Accuracy", icon: "🎯" },
    { value: "10+", label: "Predictions Made", icon: "📊" },
    { value: "24/7", label: "Available Support", icon: "💪" }
  ];


  return (
    <>
      <Helmet>
        <title>Heart Failure Predictor - AI-Powered Health Analysis</title>
        <meta 
          name="description" 
          content="Get accurate heart failure predictions using our advanced ML model. Receive instant percentage-based risk assessments for better heart health monitoring." 
        />
      </Helmet>

      <div className="home-container">
        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          style={{ y, opacity }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-badge">
                AI-Powered Health Analysis
                <span className="pulse-dot"></span>
              </div>
              
              <h1 className="hero-title">
                <span className="hero-heart">❤️</span>
                Heart Failure
                <span className="gradient-text">Prediction</span>
              </h1>

              <p className="hero-subtitle">
                Get instant percentage-based predictions for heart failure risk using
                our advanced machine learning model.
              </p>

              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/predict" className="primary-button">
                  Start Prediction Now
                  <motion.span 
                    className="button-arrow"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
                <Link to="/about" className="secondary-button">
                  Learn More
                </Link>
              </motion.div>

              <div className="trust-badges">
                <span className="trust-badge">
                  <span className="badge-icon">🔒</span>
                  Secure & Private
                </span>
                <span className="trust-badge">
                  <span className="badge-icon">⚡</span>
                  Instant Results
                </span>
                <span className="trust-badge">
                  <span className="badge-icon">📊</span>
                  Detailed Analysis
                </span>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="heart-monitor">
                <div className="monitor-screen">
                  <svg className="heart-rate" viewBox="0 0 400 100">
                    <path className="heart-line" d="M0,50 L30,50 L45,50 L60,20 L75,80 L90,50 L105,50 L120,50" />
                  </svg>
                  <div className="prediction-result">
                    <span className="result-label">Risk Level</span>
                    <span className="result-value">Calculate Now</span>
                  </div>
                </div>
                <div className="monitor-base"></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="stat-icon">{stat.icon}</span>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        
       {/* Why Choose Us Section */}
<section className="features-section">
  <motion.div 
    className="section-header"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="section-badge">Features & Benefits</span>
    <h2 className="section-title">
      Why Choose Our
      <span className="highlight"> Heart Failure Predictor</span>
    </h2>
    <p className="section-subtitle">
      Advanced AI-powered analysis with proven accuracy and reliability
    </p>
  </motion.div>
  
  <div className="features-grid">
    {[
      {
        icon: "🫀",
        title: "Advanced ML Model",
        description: "State-of-the-art machine learning model trained on extensive cardiac health data",
        stats: "89% Accuracy",
        color: "#FF6B6B"
      },
      {
        icon: "📈",
        title: "Real-time Analysis",
        description: "Get instant percentage-based risk assessment within seconds",
        stats: "< 10 Seconds",
        color: "#FF8787"
      },
      {
        icon: "🔒",
        title: "Secure & Private",
        description: "Your health data is encrypted and protected with industry standards",
        stats: "256-bit SSL",
        color: "#FFA5A5"
      },
      {
        icon: "📱",
        title: "Easy to Use",
        description: "Simple interface designed for both patients and healthcare providers",
        stats: "User Friendly",
        color: "#FFB8B8"
      }
    ].map((feature, index) => (
      <motion.div
        key={index}
        className="feature-card"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 25px 50px rgba(245, 101, 101, 0.2)"
        }}
      >
        <div 
          className="feature-icon-wrapper"
          style={{ background: `${feature.color}15` }}
        >
          <motion.span 
            className="feature-icon"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {feature.icon}
          </motion.span>
        </div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
        <div className="feature-stats">
          <motion.div
            className="stats-bar"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <span className="stats-value">{feature.stats}</span>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* How It Works Section */}
<section className="steps-section">
  <motion.div 
    className="section-header"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="section-badge">Simple Process</span>
    <h2 className="section-title">
      How It
      <span className="highlight"> Works</span>
    </h2>
    <p className="section-subtitle">
      Get your heart health prediction in three simple steps
    </p>
  </motion.div>

  <div className="steps-container">
    {[
      {
        number: "01",
        title: "Input Your Data",
        description: "Enter your clinical parameters and health metrics through our secure interface",
        icon: "📝",
        details: ["Age & Gender", "Blood Pressure", "Cholesterol Levels", "Other Vital Stats"]
      },
      {
        number: "02",
        title: "AI Analysis",
        description: "Our advanced ML model processes your data using proven algorithms",
        icon: "🤖",
        details: ["Data Processing", "Pattern Recognition", "Risk Assessment", "Accuracy Check"]
      },
      {
        number: "03",
        title: "Get Results",
        description: "Receive your detailed heart failure risk prediction percentage",
        icon: "📊",
        details: ["Risk Percentage", "Detailed Report", "Health Insights", "Recommendations"]
      }
    ].map((step, index) => (
      <motion.div
        key={index}
        className="step-card"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="step-content">
          <motion.div 
            className="step-icon-wrapper"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <span className="step-icon">{step.icon}</span>
          </motion.div>
          <span className="step-number">{step.number}</span>
          <h3 className="step-title">{step.title}</h3>
          <p className="step-description">{step.description}</p>
          
          <motion.ul 
            className="step-details"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {step.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
              >
                <span className="detail-dot" />
                {detail}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        
        <div className="step-progress">
          <motion.div
            className="progress-line"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>
      </motion.div>
    ))}
  </div>
</section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h2 className="cta-title">Ready to Check Your Heart Health?</h2>
            <p className="cta-description">
              Get your personalized heart failure risk assessment in minutes.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/predict" className="cta-button">
                Start Free Assessment
                <span className="button-arrow">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
