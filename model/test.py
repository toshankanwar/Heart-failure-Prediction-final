import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from tensorflow.keras.models import load_model

model = load_model("heart_disease_model.h5")
scaler = joblib.load("scaler.pkl")

test_data = pd.DataFrame({
    'Age': [50, 45, 65, 70, 60, 55, 52, 48, 66, 58],
    'Sex': [1, 0, 1, 1, 0, 1, 1, 0, 1, 0],  
    'ChestPainType': [3, 2, 1, 0, 3, 2, 2, 1, 0, 3],
    'RestingBP': [140, 130, 125, 160, 150, 145, 135, 120, 155, 140],
    'Cholesterol': [230, 250, 210, 190, 200, 220, 240, 180, 260, 230],
    'FastingBS': [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    'RestingECG': [1, 0, 2, 1, 2, 0, 1, 2, 0, 1],
    'MaxHR': [145, 160, 130, 120, 150, 140, 155, 165, 135, 148],
    'ExerciseAngina': [1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    'Oldpeak': [2.3, 1.4, 3.1, 0.8, 1.0, 2.5, 1.7, 0.6, 2.9, 1.5],
    'ST_Slope': [2, 1, 2, 0, 1, 2, 1, 0, 2, 1]
})

test_data_scaled = scaler.transform(test_data)

predictions = model.predict(test_data_scaled)

predicted_classes = (predictions > 0.5).astype(int)

print("\nTest Predictions for 10 Patients:")
for i, pred in enumerate(predicted_classes):
    print(f"Patient {i+1}: {'Heart Failure' if pred[0] == 1 else 'No Heart Failure'}")
