import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import './About.css';
export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>About | Heart Disease Predictor</title>
        <meta 
          name="description" 
          content="Learn more about our Heart Disease Prediction project, methodology, and the team behind it." 
        />
      </Helmet>

      <div className="about-container">
        <motion.div
          className="about-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h1 className="about-title">
            <span className="heart-icon">❤️</span>
            About Heart Failure Risk Predictor
          </h1>

          <motion.section 
            className="about-section"
            variants={sectionVariants}
          >
            <h2 className="section-title">Project Overview</h2>
            <div className="content-card">
              <p>
                Our Ml-powered Heart Disease Predictor uses advanced machine learning algorithms
                to assess cardiovascular health risks. By analyzing various clinical parameters,
                it provides instant risk assessments with high accuracy, making it a valuable
                tool for both healthcare professionals and individuals concerned about their heart health.
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="about-section"
            variants={sectionVariants}
          >
            <h2 className="section-title">Dataset Information</h2>
            <div className="content-card">
              <h3 className="subsection-title">Source</h3>
              <p>
                This project utilizes the Heart Disease UCI Dataset from Kaggle, comprising over
                900 patient records with various cardiovascular health indicators.
              </p>
              <div className="link-container">
                <a 
                  href="https://www.kaggle.com/code/omarmohamedsayed/heart-failure-prediction/notebook"
                  className="external-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link-icon">📊</span>
                  View Dataset on Kaggle
                </a>
              </div>
            </div>
          </motion.section>
          <motion.section 
  className="about-section dataset-section"
  variants={sectionVariants}
>
  <h2 className="section-title">Dataset Components</h2>
  <div className="dataset-info">
  
    
    <div className="dataset-grid">
      <div className="dataset-card">
        <h3>📊 Numerical Features</h3>
        <ul className="feature-list">
          <li>
            <span className="feature-name">Age</span>
            <div className="feature-details">
              <p>Range: 20-80 years</p>
              <p>Type: Integer</p>
              <p className="feature-desc">Patient's age in years</p>
            </div>
          </li>
          <li>
            <span className="feature-name">RestingBP</span>
            <div className="feature-details">
              <p>Range: 90-200 mmHg</p>
              <p>Type: Integer</p>
              <p className="feature-desc">Resting blood pressure measurement</p>
              <div className="range-indicators">
                <span className="range-tag normal">90-120: Normal</span>
                <span className="range-tag elevated">121-139: Elevated</span>
                <span className="range-tag high">140+: High</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">Cholesterol</span>
            <div className="feature-details">
              <p>Range: 125-600 mg/dL</p>
              <p>Type: Integer</p>
              <p className="feature-desc">Serum cholesterol measurement</p>
              <div className="range-indicators">
                <span className="range-tag normal">&lt;200: Normal</span>
                <span className="range-tag elevated">200-239: Borderline</span>
                <span className="range-tag high">240+: High</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">MaxHR</span>
            <div className="feature-details">
              <p>Range: 60-202 bpm</p>
              <p>Type: Integer</p>
              <p className="feature-desc">Maximum heart rate achieved during exercise</p>
            </div>
          </li>
          <li>
            <span className="feature-name">Oldpeak</span>
            <div className="feature-details">
              <p>Range: 0-6.2</p>
              <p>Type: Float</p>
              <p className="feature-desc">ST depression induced by exercise relative to rest</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="dataset-card">
        <h3>🔄 Categorical Features</h3>
        <ul className="feature-list">
          <li>
            <span className="feature-name">Sex</span>
            <div className="feature-details">
              <div className="category-tags">
                <span className="category-tag">M: Male</span>
                <span className="category-tag">F: Female</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">ChestPainType</span>
            <div className="feature-details">
              <div className="category-tags">
                <span className="category-tag">TA: Typical Angina</span>
                <span className="category-tag">ATA: Atypical Angina</span>
                <span className="category-tag">NAP: Non-Anginal Pain</span>
                <span className="category-tag">ASY: Asymptomatic</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">FastingBS</span>
            <div className="feature-details">
              <div className="category-tags">
                <span className="category-tag">0: Normal (less than 120 mg/dL)</span>
                <span className="category-tag">1: Diabetic (greater than 120 mg/dL)</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">RestingECG</span>
            <div className="feature-details">
              <div className="category-tags">
                <span className="category-tag">Normal: Normal ECG</span>
                <span className="category-tag">ST: ST-T Wave abnormality</span>
                <span className="category-tag">LVH: Left Ventricular Hypertrophy</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">ExerciseAngina</span>
            <div className="feature-details">
              <div className="category-tags">
                <span className="category-tag">Y: Presence</span>
                <span className="category-tag">N: Absence</span>
              </div>
            </div>
          </li>
          <li>
            <span className="feature-name">ST_Slope</span>
            <div className="feature-details">
              <div className="category-tags">
                <span className="category-tag">Up: Upsloping</span>
                <span className="category-tag">Flat: Flat</span>
                <span className="category-tag">Down: Downsloping</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</motion.section>

          <motion.section 
            className="about-section"
            variants={sectionVariants}
          >
            <h2 className="section-title">Technical Implementation</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <h3>Frontend Stack</h3>
                <ul>
                  <li>React.js</li>
                  <li>Framer Motion</li>
                  <li>CSS3 & Modern HTML5</li>
                </ul>
              </div>
              <div className="tech-card">
                <h3>Backend Stack</h3>
                <ul>
                  <li>Python Flask</li>
                  <li>TensorFlow & Keras</li>
                  <li>Scikit-learn</li>
                </ul>
              </div>
              <div className="tech-card">
                <h3>Database & Storage</h3>
                <ul>
                  <li>Firebase</li>
                  <li>Cloud Storage</li>
                  <li>Real-time Updates</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="about-section"
            variants={sectionVariants}
          >
            <h2 className="section-title">Project Resources</h2>
            <div className="resource-grid">
              <a href="https://github.com/toshankanwar/Heart-failure-Prediction-final/tree/main/frontend" 
                className="resource-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="resource-icon">📱</span>
                <h3>Frontend Repository</h3>
                <p>React.js implementation with modern UI components</p>
              </a>
              <a href="https://github.com/toshankanwar/Heart-failure-Prediction-final/tree/main/backend" 
                className="resource-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="resource-icon">⚙️</span>
                <h3>Backend Repository</h3>
                <p>Flask API with ML model integration</p>
              </a>
              <div className="resource-card">
                <span className="resource-icon">📚</span>
                <h3>Documentation</h3>
                <p>Comprehensive guide and API documentation</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="about-section contact-section"
            variants={sectionVariants}
          >
            <h2 className="section-title">Contact Information</h2>
            <div className="content-card">
              <div className="contact-grid">
                <div className="contact-item">
                  <span className="contact-icon">👨‍💻</span>
                  <h3>Developer</h3>
                  <p>Toshan kanwar, Shiva Kumar Nagesh, Yogesh Nag</p>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <h3>Email</h3>
                  <a href="mailto:contact@toshankanwar.website">
                    contact@toshankanwar.in
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🔗</span>
                  <h3>LinkedIn</h3>
                  <a href="https://linkedin.com/in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
}
