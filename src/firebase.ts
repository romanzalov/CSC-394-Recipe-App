// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);