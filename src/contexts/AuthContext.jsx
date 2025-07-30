import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Admin login function
  function adminLogin(username, password) {
    if (username === 'Admin' && password === '12345') {
      // Create a mock admin user for demo purposes
      const adminUser = {
        uid: 'admin-user',
        email: 'admin@pothgula.com',
        displayName: 'Administrator',
        isAdmin: true
      };
      setCurrentUser(adminUser);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      return Promise.resolve({ user: adminUser });
    } else {
      return Promise.reject(new Error('Invalid admin credentials'));
    }
  }

  // Logout function
  function logout() {
    localStorage.removeItem('adminUser');
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    // Check for admin user in localStorage
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      setCurrentUser(JSON.parse(adminUser));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    adminLogin,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

