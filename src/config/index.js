// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCio4UMygptnIPo8BzBhD0d8UYknlUhmm0",
  authDomain: "cash-flow-f26a1.firebaseapp.com",
  projectId: "cash-flow-f26a1",
  storageBucket: "cash-flow-f26a1.firebasestorage.app",
  messagingSenderId: "613343992161",
  appId: "1:613343992161:web:0fb3fef6cec7d1789fcd20",
  measurementId: "G-CKHDWHFL55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
export default firebaseConfig;
