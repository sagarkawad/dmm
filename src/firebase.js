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
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const uid = result.user.uid;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("uid", uid);
    })
    .catch((error) => {
      console.log(error);
    });
};
