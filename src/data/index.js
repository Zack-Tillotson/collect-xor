// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNlRMrS5F5CIymipCqEcN-xcJPsLAwDZU",
  authDomain: "bgshelf.firebaseapp.com",
  projectId: "bgshelf",
  storageBucket: "bgshelf.appspot.com",
  messagingSenderId: "842063608603",
  appId: "1:842063608603:web:33e9b69a4030d5b30271be",
  measurementId: "G-73D8JCK3R7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);