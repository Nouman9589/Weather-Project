// AuthContext.js
import  { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../Firebase/firebaseConfig';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value:any = {
    user,
    loading,
    signInWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
