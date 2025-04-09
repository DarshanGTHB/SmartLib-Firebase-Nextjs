'use client'

import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
const FireBaseContext = createContext(null);
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "smart-lib-a6845.firebaseapp.com",
  projectId: "smart-lib-a6845",
  storageBucket: "smart-lib-a6845.firebasestorage.app",
  messagingSenderId: "426837014307",
  appId: "1:426837014307:web:cc7cb77778621f4c163e96"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);

const auth = getAuth(firebaseApp);

export const useFireBase = () => {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error("useFireBase must be used within a FireBaseProvider");
  }
  return context;
}


// const app = initializeApp(firebaseConfig);

export const FireBaseProvider = ({ children }) => {

  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }


  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      window.location.href = '/';
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  }

  const signinWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with GitHub:", user);
      return user;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  }

  return (
    <FireBaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signinWithGoogle, signinWithGithub }}>
      {children}
    </FireBaseContext.Provider>
  );
}