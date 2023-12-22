import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = (email, Password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, Password);
  };

  // update User

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // user login

  const userLogin = (email, Password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, Password);
  };

  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

  // manage user

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // logout user

  const userLogout = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
    userLogin,
    userLogout,
    googleSignin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
