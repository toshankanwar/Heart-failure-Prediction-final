import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeSY-wHWwuUBA8y3InH8VQoHROKEjgbv8",
  authDomain: "heartfailure-95076.firebaseapp.com",
  projectId: "heartfailure-95076",
  storageBucket: "heartfailure-95076.firebasestorage.app",
  messagingSenderId: "542980647917",
  appId: "1:542980647917:web:86f3f91ba7f227400495e4",
  measurementId: "G-FKRKYJN1VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, serverTimestamp };