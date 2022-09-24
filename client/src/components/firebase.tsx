// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmeLvvH2u_BL4cL_JecRaW8D9eWgJrcbk",
  authDomain: "kayrabari-baalish-e-suite.firebaseapp.com",
  projectId: "kayrabari-baalish-e-suite",
  storageBucket: "kayrabari-baalish-e-suite.appspot.com",
  messagingSenderId: "768937811594",
  appId: "1:768937811594:web:a16ae0c63c3159448fd773",
  measurementId: "G-8XYV8J10LJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
