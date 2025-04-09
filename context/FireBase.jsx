import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
const FireBaseContext = createContext(null);
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "smart-lib-a6845.firebaseapp.com",
  projectId: "smart-lib-a6845",
  storageBucket: "smart-lib-a6845.firebasestorage.app",
  messagingSenderId: "426837014307",
  appId: "1:426837014307:web:cc7cb77778621f4c163e96"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const useFireBase = () => {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error("useFireBase must be used within a FireBaseProvider");
  }
  return context;
}


const app = initializeApp(firebaseConfig);

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

export const FireBaseProvider = ({ children }) => {
  return (
    <FireBaseContext.Provider value={{}}>
      {children}
    </FireBaseContext.Provider>
  );
}