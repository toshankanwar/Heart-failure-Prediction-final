
# ❤️ Heart Disease Prediction Web App

A fully responsive, theme-switching, animated web application to **predict heart disease risk** using a trained deep learning model. Built with **React.js** (frontend) and **Flask** (backend), this app provides a smooth user experience across all devices.

![image](https://github.com/user-attachments/assets/a73a7fc8-b322-4c81-8f1d-9b2f3a9177da)


---

## 🔍 Project Overview

This project uses a deep learning model trained on the **UCI Heart Disease Dataset** to predict the likelihood of a person having heart disease based on input parameters like age, cholesterol, blood pressure, etc.  
The web interface allows users to interact with the model easily, with real-time results, dark/light mode, responsive design, and smooth animations.our model achieves 89% accuracy score

---

## ✨ Features

- 🎯 Predicts heart disease risk based on user input
- 📱 Fully responsive for desktop, tablet, and mobile
- ⚡ Smooth animations and transitions
- 🧠 Deep learning model powered by Keras
- 🔐 Secure data handling (no data stored)
- 🧪 Trained model: `heart_disease_model.h5`  
- 🧪 Scaler: `scaler.pkl`

---

## 🚀 Tech Stack

### 🌐 Frontend
- React.js
- Tailwind css
- CSS Animations
- Responsive design using Flexbox and media queries

### 🧠 Backend
- Python (Flask)
- Keras / TensorFlow (for deep learning model)
- Scikit-learn (for data preprocessing)


---

## 🛠️ Installation & Setup

### 📦 Clone Repositories
  ```bash
   git clone https://github.com/toshankanwar/Heart-Failure-Prediction.git
   ```

### 📦 Backend (Flask + Keras)

1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies
      ```bash
   pip install -r requirements.txt
   ```
3. Run Flask App
      ```bash
   python app.py
   ```
Flask backend will run on http://localhost:5000
   
You should see result like this
![image](https://github.com/user-attachments/assets/d94af837-fe50-4e03-91f5-32b201601f37)

### 📦 Frontend (React Js)
1.Navigate to project root:
   ```bash
   cd ../
   ```
2. Install dependencies:
 ```bash
  npm install
   ```
3. Start React development server:
 ```bash
  npm start
   ```
React frontend will run on http://localhost:3000
You should see result like this 
![image](https://github.com/user-attachments/assets/0c7bc244-6de2-47b1-ac25-6978cfa49a12)

### 🧠 Api Endpoints
POST /predict
Sends input data to backend and returns prediction:
{
  "age": 52,
  "sex": 1,
  "cp": 3,
  "trestbps": 130,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}

### 🌐 Live Demo of Frontend
https://heart-failure.toshankanwar.website/

Unfortunately due to some money related issues i cant host backend at this moment if you have any suggestion please suggest me 

### 📄 License
This project is licensed under the MIT License.

### 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

### Made with ❤️ by [Toshan kanwar]
Mail for queries contact@toshankanwar.website
