// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvZbdWFggnSN4KrJ4pOuBCol-fb4zEDys",
  authDomain: "quanlyxephang-fad14.firebaseapp.com",
  databaseURL: "https://quanlyxephang-fad14-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlyxephang-fad14",
  storageBucket: "quanlyxephang-fad14.appspot.com",
  messagingSenderId: "895557707215",
  appId: "1:895557707215:web:5e9a83a0ba5d9ee0775eba",
  measurementId: "G-YGGMQ6CK59"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };