// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9c052.firebaseapp.com",
  projectId: "mern-estate-9c052",
  storageBucket: "mern-estate-9c052.appspot.com",
  messagingSenderId: "537274821322",
  appId: "1:537274821322:web:84618f951b8ffe612aa233"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);