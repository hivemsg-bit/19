
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";
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

// Initialize Auth
export const auth = getAuth(app);

/**
 * Initialize Firestore with specific settings to resolve connectivity issues
 */
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Initialize Storage
export const storage = getStorage(app);
