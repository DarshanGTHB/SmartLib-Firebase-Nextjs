"use client";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
const FireBaseContext = createContext(null);
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { createClient } from '@supabase/supabase-js';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "smart-lib-a6845.firebaseapp.com",
  projectId: "smart-lib-a6845",
  storageBucket: "smart-lib-a6845.firebasestorage.app",
  messagingSenderId: "426837014307",
  appId: "1:426837014307:web:cc7cb77778621f4c163e96",
};
const SUPABASE_URL    = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const useFireBase = () => {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error("useFireBase must be used within a FireBaseProvider");
  }
  return context;
};

// const app = initializeApp(firebaseConfig);

export const FireBaseProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      toast.success("Successfully signed in!");
      // window.location.href = '/';
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signinWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with GitHub:", user);
      toast.success("Successfully signed in!");

      return user;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      toast.success("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }


  console.log("current user : ", user);


  const CreateNewListing = async (listingData) => {
    try {
      const docRef = await addDoc(collection(firestore, "books"), {
        ...listingData,
        userId: user.uid,
        userEmail: user.email,
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Book added successfully!");
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };


  const FetchAllListings = async () => {
    //data from firebase
    const booksRef = collection(firestore, "books");
    const snapshot = await getDocs(booksRef);
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return books;
  }

  const isLoggedIn = user ? true : false;

  return (
    <FireBaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        signinWithGithub,
        CreateNewListing,
        FetchAllListings,
        signOutUser,
        user
      }}
    >
      {children}
    </FireBaseContext.Provider>
  );
};
