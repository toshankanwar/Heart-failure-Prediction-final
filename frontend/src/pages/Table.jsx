import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "./Table.css";

export default function Table() {
  const [predictions, setPredictions] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const recordsPerPage = 10;

  const sortOptions = [
    { value: "timestamp-desc", label: "Newest First" },
    { value: "timestamp-asc", label: "Oldest First" },
    { value: "Age-asc", label: "Age (Low to High)" },
    { value: "Age-desc", label: "Age (High to Low)" },
    { value: "probability-desc", label: "Highest Risk First" },
    { value: "probability-asc", label: "Lowest Risk First" },
  ];

  const headers = [
    { key: "Age", label: "Age" },
    { key: "Sex", label: "Sex" },
    { key: "ChestPainType", label: "Chest Pain" },
    { key: "RestingBP", label: "Resting BP" },
    { key: "Cholesterol", label: "Cholesterol" },
    { key: "FastingBS", label: "Fasting BS" },
    { key: "RestingECG", label: "Resting ECG" },
    { key: "MaxHR", label: "Max HR" },
    { key: "ExerciseAngina", label: "Exercise Angina" },
    { key: "Oldpeak", label: "Oldpeak" },
    { key: "ST_Slope", label: "ST Slope" },
    { key: "prediction", label: "Prediction" },
    { key: "probability", label: "Risk Level" },
    { key: "timestamp", label: "Timestamp" }
  ];

  const fetchPredictions = async (isNewSort = false) => {
    try {
      setLoading(true);
      let q = query(
        collection(db, "predictions"),
        orderBy(sortField, sortDirection),
        limit(recordsPerPage)
      );

      if (!isNewSort && lastDoc) {
        q = query(
          collection(db, "predictions"),
          orderBy(sortField, sortDirection),
          startAfter(lastDoc),
          limit(recordsPerPage)
        );
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (isNewSort) {
        setPredictions(docs);
      } else {
        setPredictions(prev => [...prev, ...docs]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === recordsPerPage);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions(true);
  }, [sortField, sortDirection]);

  const handleSortChange = (event) => {
    const [newField, newDirection] = event.target.value.split("-");
    setSortField(newField);
    setSortDirection(newDirection);
    setLastDoc(null);
  };

  const formatValue = (key, value) => {
    if (key === 'probability') {
      return `${(value * 100).toFixed(2)}%`;
    }
    if (key === 'timestamp' && value?.toDate) {
      return new Date(value.toDate()).toLocaleString();
    }
    return value;
  };

  const downloadCSV = () => {
    const csvHeaders = headers.map(h => h.label).join(",");
    const csvContent = 
      csvHeaders +
      "\n" +
      predictions
        .map(prediction => 
          headers
            .map(header => formatValue(header.key, prediction[header.key]))
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `heart-disease-predictions-${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Predictions Table | Heart Disease Predictor</title>
        <meta 
          name="description" 
          content="View and analyze heart disease prediction results in a detailed table format." 
        />
      </Helmet>

      <div className="table-container">
        <motion.div 
          className="table-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="table-header">
            <h2 className="table-title">
              <span className="header-icon">📊</span>
              Prediction Results
            </h2>
            <div className="table-actions">
              <div className="sort-box">
                <select 
                  className="sort-select"
                  onChange={handleSortChange}
                  value={`${sortField}-${sortDirection}`}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <motion.button
                className="download-button"
                onClick={downloadCSV}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="button-icon">⬇️</span>
                Download CSV
              </motion.button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="predictions-table">
              <thead>
                <tr>
                  {headers.map(({ key, label }) => (
                    <th key={key}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction) => (
                  <motion.tr 
                    key={prediction.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {headers.map(({ key }) => (
                      <td 
                        key={key} 
                        className={
                          key === 'prediction' 
                            ? `prediction-${prediction[key]}` 
                            : key === 'probability'
                            ? `risk-level-${prediction[key] > 0.5 ? 'high' : 'low'}`
                            : ''
                        }
                      >
                        {formatValue(key, prediction[key])}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="loading-indicator">
              Loading more records...
            </div>
          )}

          {hasMore && !loading && (
            <motion.button
              className="load-more-button"
              onClick={() => fetchPredictions(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Records
            </motion.button>
          )}

          <div className="table-footer">
            <p>Showing {predictions.length} records</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}