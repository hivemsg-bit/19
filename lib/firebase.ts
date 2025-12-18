import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEj6UFopNOiUduVVzspx60x-g56rUT48E",
  authDomain: "ca-exam-series.firebaseapp.com",
  projectId: "ca-exam-series",
  storageBucket: "ca-exam-series.firebasestorage.app",
  messagingSenderId: "949973824952",
  appId: "1:949973824952:web:bc0e5e674fab0cca520b4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
