// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUSmAhF4YFVNS6mSWq3lkQa4rd9a5gM3g",
  authDomain: "tripzy-5e4f3.firebaseapp.com",
  projectId: "tripzy-5e4f3",
  storageBucket: "tripzy-5e4f3.firebasestorage.app",
  messagingSenderId: "801984554341",
  appId: "1:801984554341:web:ccfc02b3d8ffb23b732d8c",
  measurementId: "G-HYKJFCNS68",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
