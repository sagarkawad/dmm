import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // your config object key and value.
  apiKey: "AIzaSyBtZU-3UetmALGWVU2uwl6oh5gNKzc_4xk",
  authDomain: "digital-mess-manager.firebaseapp.com",
  projectId: "digital-mess-manager",
  storageBucket: "digital-mess-manager.appspot.com",
  messagingSenderId: "353199332381",
  appId: "1:353199332381:web:9cb53127853bede10f3af4",
  measurementId: "G-32J699C1W4",
};
// Initialize firebase app.
const app = initializeApp(firebaseConfig);
// Initialize firebase database and get the reference of firebase database object.

export default app;
