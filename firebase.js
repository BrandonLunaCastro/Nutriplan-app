// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADSS2Stf27hsf_G7ND6MWS4vrbVionZJY",
  authDomain: "nutriplan-d1155.firebaseapp.com",
  projectId: "nutriplan-d1155",
  storageBucket: "nutriplan-d1155.firebasestorage.app",
  messagingSenderId: "38999947921",
  appId: "1:38999947921:web:97b87988d89f511b4f5d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}