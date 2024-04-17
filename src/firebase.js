// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtZU-3UetmALGWVU2uwl6oh5gNKzc_4xk",
  authDomain: "digital-mess-manager.firebaseapp.com",
  projectId: "digital-mess-manager",
  storageBucket: "digital-mess-manager.appspot.com",
  messagingSenderId: "353199332381",
  appId: "1:353199332381:web:9cb53127853bede10f3af4",
  measurementId: "G-32J699C1W4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
};
