import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv5a-olf9TIF3Z5NWxF6PWqPc1ugEdPYk",
  authDomain: "alphagpt-07.firebaseapp.com",
  projectId: "alphagpt-07",
  storageBucket: "alphagpt-07.appspot.com",
  messagingSenderId: "29333402945",
  appId: "1:29333402945:web:4f8b186b41dcaa62ba5dc0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig); //single tone method
const db = getFirestore(app);

export { db };
