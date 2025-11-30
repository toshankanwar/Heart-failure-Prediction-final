import tensorflow as tf

# Load original model
model = tf.keras.models.load_model("heart_disease_model.h5")

# Convert to TFLite with optimization
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]  # Use float16 for memory efficiency
tflite_model = converter.convert()

# Save the compressed model
with open('model_optimized.tflite', 'wb') as f:
    f.write(tflite_model)