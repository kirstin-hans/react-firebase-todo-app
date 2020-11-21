import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB8letp9oGME6Ek8k2EEg8HAvObIWZi6lc",
  authDomain: "react-firebase-todo-app-463de.firebaseapp.com",
  databaseURL: "https://react-firebase-todo-app-463de.firebaseio.com",
  projectId: "react-firebase-todo-app-463de",
  storageBucket: "react-firebase-todo-app-463de.appspot.com",
  messagingSenderId: "256435090074",
  appId: "1:256435090074:web:47225902185d71643f6523",
  measurementId: "G-VQX7H2E2YL",
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

export { db };
