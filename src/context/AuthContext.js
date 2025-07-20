import React, { createContext, useContext, useState, useEffect } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
    setLoading(false);
  }, []);

  const login = async (secretKey) => {
    try {
      // Query Firestore for the secret key
      const q = query(
        collection(db, "secretKeys"),
        where("key", "==", secretKey)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Secret key found, authenticate user
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        return true;
      } else {
        // Secret key not found
        throw new Error("Invalid secret key");
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
