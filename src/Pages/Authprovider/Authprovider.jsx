import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/Firebase.config";

import axiosPublic from "../axiosPublic/axiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider()

    
  const axiospublic = axiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignin = () => {
    setLoading(true)
    return signInWithPopup(auth , googleProvider)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if(currentUser){
        // console.log(currentUser)
          const userInfo = {
            email: currentUser.email,
          }

          axiospublic.post('/jwt', userInfo)
          .then(res => {
            if(res.data.token){
              localStorage.setItem('access-token' , res.data.token)
            }
          })
      }
      else {
          localStorage.removeItem('access-token')
      }

      

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiospublic]);
  const authinfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    googleSignin,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
