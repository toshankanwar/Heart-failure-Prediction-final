import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { db, serverTimestamp } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";
import "./Predict.css";

export default function Predict() {
  const [form, setForm] = useState({
    Age: "",
    Sex: "M",
    ChestPainType: "ATA",
    RestingBP: "",
    Cholesterol: "",
    FastingBS: "0",
    RestingECG: "Normal",
    MaxHR: "",
    ExerciseAngina: "N",
    Oldpeak: "",
    ST_Slope: "Up",
  });
  // Add this after your form state
  const selectOptions = {
    Sex: ["M", "F"],
    ChestPainType: ["ATA", "NAP", "ASY", "TA"],
    FastingBS: ["0", "1"],
    RestingECG: ["Normal", "ST", "LVH"],
    ExerciseAngina: ["Y", "N"],
    ST_Slope: ["Up", "Flat", "Down"],
  };
  const [result, setResult] = useState(null);
  const [activeInfo, setActiveInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const API_URL = 'https://hfailure-backend-1.onrender.com';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const res = await axios({
          method: 'post',
          url: `${API_URL}/predict`,
          data: form,
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          withCredentials: false
      });
      
      const predictionData = res.data;
      setResult(predictionData);

      await addDoc(collection(db, "predictions"), {
          ...form,
          prediction: predictionData.prediction,
          probability: predictionData.probability,
          timestamp: serverTimestamp(),
      });
  } catch (err) {
      console.error("Prediction error:", err);
      if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response:", err.response.data);
          alert(`Prediction failed: ${err.response.data.error || 'Unknown error'}\nStatus: ${err.response.status}`);
      } else if (err.request) {
          // The request was made but no response was received
          console.error("No response received:", err.request);
          alert("No response from server. Please try again later.");
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", err.message);
          alert("Error setting up request. Please try again later.");
      }
  }
};
  const fieldInfo = {
    Age: {
      description: "Patient's age in years",
      range: "Typically 20-80 years",
      critical: "Risk increases with age, especially after 45 years"
    },
    Sex: {
      description: "Patient's biological sex",
      options: {
        M: "Male",
        F: "Female"
      },
      impact: "Men generally have a higher risk of heart disease"
    },
    ChestPainType: {
      description: "Type of chest pain experienced",
      options: {
        ATA: "Typical Angina",
        NAP: "Non-Anginal Pain",
        ASY: "Asymptomatic",
        TA: "Atypical Angina"
      },
      critical: "ASY and ATA are typically more concerning"
    },
    RestingBP: {
      description: "Resting blood pressure (mm Hg)",
      range: "Normal: 90-120",
      critical: "Above 140 is considered high"
    },
    Cholesterol: {
      description: "Serum cholesterol (mg/dl)",
      range: "Normal: 125-200",
      critical: "Above 240 is considered high risk"
    },
    FastingBS: {
      description: "Fasting blood sugar level",
      options: {
        "0": "< 120 mg/dl",
        "1": "≥ 120 mg/dl"
      },
      critical: "Values ≥ 120 mg/dl indicate diabetes"
    },
    MaxHR: {
      description: "Maximum heart rate achieved",
      range: "Normal: 60-220",
      formula: "220 - age (approximate max)"
    },
    Oldpeak: {
      description: "ST depression induced by exercise relative to rest",
      range: "Normal: 0-6.2",
      critical: "Higher values indicate higher risk"
    }
  };

  const getHealthSuggestions = (probability) => {
    // Add console.log to debug
    console.log("Probability received:", probability);
    
    const riskLevel = probability * 100;
    console.log("Risk level calculated:", riskLevel);
  
    let suggestions = {
      lifestyle: [],
      diet: [],
      monitoring: []
    };
  
    if (riskLevel > 75) {
      suggestions = {
        lifestyle: [
          "Immediate consultation with a cardiologist",
          "Daily blood pressure monitoring",
          "Structured exercise program under medical supervision",
        ],
        diet: [
          "Strict low-sodium diet",
          "Mediterranean diet implementation",
          "Avoid saturated fats completely",
        ],
        monitoring: [
          "Weekly medical check-ups",
          "Daily heart rate monitoring",
          "Keep emergency contacts handy",
        ]
      };
    } else if (riskLevel > 50) {
      suggestions = {
        lifestyle: [
          "Regular moderate exercise (30 mins/day)",
          "Stress management techniques",
          "Adequate sleep (7-8 hours)",
        ],
        diet: [
          "Reduce sodium intake",
          "Increase fiber-rich foods",
          "Limited alcohol consumption",
        ],
        monitoring: [
          "Monthly blood pressure checks",
          "Regular cholesterol monitoring",
          "Bi-annual medical check-ups",
        ]
      };
    } else {
      suggestions = {
        lifestyle: [
          "Maintain regular physical activity",
          "Practice stress-relief activities",
          "Regular sleep schedule",
        ],
        diet: [
          "Balanced diet with whole grains",
          "Regular fruit and vegetable intake",
          "Stay hydrated",
        ],
        monitoring: [
          "Annual health check-ups",
          "Regular exercise routine",
          "Monitor weight changes",
        ]
      };
    }
    return suggestions;
  };
  return (
    <>
      <Helmet>
        <title>Predict | Heart Disease Predictor</title>
        <meta 
          name="description" 
          content="Predict your risk of heart disease using our advanced AI model." 
        />
      </Helmet>

      <div className="predict-container">
        <div className="predict-content">
          {/* Left Section - Prediction Form */}
          <motion.div 
            className="prediction-form-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="form-container">
              <h2 className="section-title">
                <span className="heart-icon">❤️</span>
                Heart Failure  Prediction
              </h2>
              
              <form onSubmit={handleSubmit} className="prediction-form">
                {Object.entries(form).map(([key, value]) => (
                  <div key={key} className="form-field">
                    <label 
                      className="field-label"
                      onMouseEnter={() => setActiveInfo(key)}
                      onMouseLeave={() => setActiveInfo(null)}
                    >
                      {key}
                      {fieldInfo[key] && (
                        <span className="info-icon">ℹ️</span>
                      )}
                    </label>

                    {selectOptions[key] ? (
                      <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="field-input"
                      >
                        {selectOptions[key].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="field-input"
                        required
                      />
                    )}

                    {activeInfo === key && fieldInfo[key] && (
                      <motion.div 
                        className="field-info"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p>{fieldInfo[key].description}</p>
                        {fieldInfo[key].range && (
                          <p className="info-range">Normal Range: {fieldInfo[key].range}</p>
                        )}
                        {fieldInfo[key].critical && (
                          <p className="info-critical">{fieldInfo[key].critical}</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}

                <motion.button
                  type="submit"
                  className="predict-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Prediction
                </motion.button>
              </form>
              {result && (
                <motion.div
                  className={`prediction-result ${
                    result.probability > 0.5 ? 'high-risk' : 'low-risk'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="result-title">Prediction Result</h3>
                  <div className="result-value">
                    <div className="probability-bar">
                      <motion.div 
                        className="probability-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probability * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <p className="probability-text">
                      Risk Level: {(result.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="health-suggestions">
  <h4>Recommendations Based on Your Results:</h4>
  {result && result.probability && (
    <>
      {console.log("Result probability:", result.probability)}
      {Object.entries(getHealthSuggestions(result.probability)).map(([category, suggestions]) => (
        <div key={category} className="suggestion-category">
          <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
          <ul>
            {suggestions && suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {suggestion}
                </motion.li>
              ))
            ) : (
              <li>No suggestions available</li>
            )}
          </ul>
        </div>
      ))}
    </>
  )}
</div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Section - Information Panel */}
          <motion.div 
  className="information-panel"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="info-container">
    <h3 className="info-title">Understanding Your Heart Health</h3>
    
    {/* Risk Level Overview */}
    <div className="risk-overview">
      <h4>Risk Level Categories</h4>
      <div className="risk-levels">
        <motion.div 
          className="risk-card low"
          whileHover={{ scale: 1.02 }}
        >
          <div className="risk-header">
            <span className="risk-icon">✅</span>
            <h5>Low Risk (0-50%)</h5>
          </div>
          <p>Generally indicates good heart health. Continue maintaining healthy habits.</p>
          <ul className="risk-indicators">
            <li>Normal blood pressure (90-120 mmHg)</li>
            <li>Healthy cholesterol levels (125-200 mg/dl)</li>
            <li>No chest pain symptoms</li>
          </ul>
        </motion.div>

        <motion.div 
          className="risk-card medium"
          whileHover={{ scale: 1.02 }}
        >
          <div className="risk-header">
            <span className="risk-icon">⚠️</span>
            <h5>Medium Risk (51-75%)</h5>
          </div>
          <p>Requires attention and lifestyle modifications.</p>
          <ul className="risk-indicators">
            <li>Elevated blood pressure (121-139 mmHg)</li>
            <li>Borderline cholesterol (201-239 mg/dl)</li>
            <li>Occasional chest discomfort</li>
          </ul>
        </motion.div>

        <motion.div 
          className="risk-card high"
          whileHover={{ scale: 1.02 }}
        >
          <div className="risk-header">
            <span className="risk-icon">🚨</span>
            <h5>High Risk (76-100%)</h5>
          </div>
          <p>Immediate medical attention and lifestyle changes required.</p>
          <ul className="risk-indicators">
            <li>High blood pressure (140+ mmHg)</li>
            <li>High cholesterol (240+ mg/dl)</li>
            <li>Frequent chest pain</li>
          </ul>
        </motion.div>
      </div>
    </div>

    {/* Parameter Details */}
    <div className="parameter-details">
      <h4>Key Parameters Explained</h4>
      <div className="parameters-grid">
        <motion.div 
          className="parameter-card"
          whileHover={{ scale: 1.02 }}
        >
          <h5>Blood Pressure (RestingBP)</h5>
          <div className="parameter-ranges">
            <div className="range-item normal">
              <span className="range-label">Normal:</span>
              <span className="range-value">90-120 mmHg</span>
            </div>
            <div className="range-item elevated">
              <span className="range-label">Elevated:</span>
              <span className="range-value">121-139 mmHg</span>
            </div>
            <div className="range-item high">
              <span className="range-label">High:</span>
              <span className="range-value">140+ mmHg</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="parameter-card"
          whileHover={{ scale: 1.02 }}
        >
          <h5>Cholesterol Levels</h5>
          <div className="parameter-ranges">
            <div className="range-item normal">
              <span className="range-label">Desirable:</span>
              <span className="range-value">125-200 mg/dl</span>
            </div>
            <div className="range-item elevated">
              <span className="range-label">Borderline:</span>
              <span className="range-value">201-239 mg/dl</span>
            </div>
            <div className="range-item high">
              <span className="range-label">High Risk:</span>
              <span className="range-value">240+ mg/dl</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="parameter-card"
          whileHover={{ scale: 1.02 }}
        >
          <h5>Heart Rate (MaxHR)</h5>
          <div className="parameter-ranges">
            <div className="range-item normal">
              <span className="range-label">Normal Rest:</span>
              <span className="range-value">60-100 bpm</span>
            </div>
            <div className="range-item elevated">
              <span className="range-label">Exercise:</span>
              <span className="range-value">100-170 bpm</span>
            </div>
            <div className="range-item high">
              <span className="range-label">Maximum:</span>
              <span className="range-value">220-age</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Prevention Tips */}
    <div className="prevention-tips">
      <h4>Prevention Strategies</h4>
      <div className="tips-grid">
        <motion.div 
          className="tip-card lifestyle"
          whileHover={{ scale: 1.02 }}
        >
          <span className="tip-icon">🏃‍♂️</span>
          <h5>Lifestyle</h5>
          <ul>
            <li>30 minutes daily exercise</li>
            <li>7-8 hours sleep</li>
            <li>Stress management</li>
            <li>No smoking</li>
          </ul>
        </motion.div>

        <motion.div 
          className="tip-card diet"
          whileHover={{ scale: 1.02 }}
        >
          <span className="tip-icon">🥗</span>
          <h5>Diet</h5>
          <ul>
            <li>Reduce saturated fats</li>
            <li>Increase fiber intake</li>
            <li>Limit sodium (less than 2300 mg/day)</li>
            <li>Stay hydrated</li>
          </ul>
        </motion.div>

        <motion.div 
          className="tip-card monitoring"
          whileHover={{ scale: 1.02 }}
        >
          <span className="tip-icon">📊</span>
          <h5>Regular Monitoring</h5>
          <ul>
            <li>Blood pressure checks</li>
            <li>Cholesterol screening</li>
            <li>Blood sugar tests</li>
            <li>Annual physical exam</li>
          </ul>
        </motion.div>
      </div>
    </div>
  </div>
</motion.div>


        </div>
      </div>
    </>
  );
}
