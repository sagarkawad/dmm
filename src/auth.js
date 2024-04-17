// auth.js

import firebase from "./firebase"; // Use default import

export const signInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider(); // Use app.auth instead of app.firebase.auth()
    await firebase.auth().signInWithPopup(provider); // Use app.auth() instead of app.firebase.auth()
    console.log("User signed in with Google successfully");
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut(); // Use app.auth() instead of app.firebase.auth()
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
