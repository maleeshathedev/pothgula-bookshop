// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase config - Replace with your actual config
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "pothgula-bookshop.firebaseapp.com",
  projectId: "pothgula-bookshop",
  storageBucket: "pothgula-bookshop.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

