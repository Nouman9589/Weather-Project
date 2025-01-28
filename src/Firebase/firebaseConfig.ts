// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // For Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8eMPW8T2mM-IhoCJ1q9J6xh0eZP1jVz4",
  authDomain: "sign-in-f7fba.firebaseapp.com",
  projectId: "sign-in-f7fba",
  storageBucket: "sign-in-f7fba.firebasestorage.app",
  messagingSenderId: "402076652477",
  appId: "1:402076652477:web:7413a2e81fa0667f5bf8d4",
  measurementId: "G-8KGVLG8NS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; // Export authentication and provider
 