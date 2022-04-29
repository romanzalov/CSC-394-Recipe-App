// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHJbub98NJPXDIt9_KZO6m4df5mNHx5hc",
  authDomain: "recipe-app-purple-team.firebaseapp.com",
  projectId: "recipe-app-purple-team",
  storageBucket: "recipe-app-purple-team.appspot.com",
  messagingSenderId: "941510496121",
  appId: "1:941510496121:web:0955bc3d8f093e57fae9a8",
  measurementId: "G-7VFL43TFWE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
//Firebase documentation
//https://firebase.google.com/docs/firestore/quickstart