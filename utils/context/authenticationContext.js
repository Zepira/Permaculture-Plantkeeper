import {
  initializeAuth,
  signInWithPopup,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ db, auth, children }) => {
  const userId = "test-user-id";

  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        userId,
        logInWithEmailAndPassword,
        registerWithEmailAndPassword,
        logout,
        error,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
