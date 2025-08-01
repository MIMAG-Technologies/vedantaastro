"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import axios from "axios";
import { useRouter } from "next/navigation";

export type Me = {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    profileImage: string; // URL
  };
  preferences: {
    timezone: string;
  };
  accountInfo: {
    createdAt: string;
  };
  stats: {
    counselling: {
      total: number;
      completed: number;
      upcoming: number;
    };
    chat: {
      total: number;
      completed: number;
      upcoming: number;
    };
    call: {
      total: number;
      completed: number;
      upcoming: number;
      cancelled: number;
      missed: number;
    };
    tests: {
      total: number;
      completed: number;
      active: number;
      pending: number;
      paid: number;
      referred: number;
      referredUnpaid: number;
    };
    offline: {
      total: number;
      completed: number;
      upcoming: number;
    };
  };
};

type AuthContextType = {
  user: User | null;
  me: Me | null;
  userAge: number | null;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  needsProfileCompletion: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number | null => {
  if (!dateOfBirth) return null;
  
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return null; // Invalid date
  
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  
  // If birthday hasn't occurred yet this year, subtract one year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [userAge, setUserAge] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);
  const router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Calculate age whenever me changes
  useEffect(() => {
    if (me?.personalInfo?.dateOfBirth) {
      setUserAge(calculateAge(me.personalInfo.dateOfBirth));
    } else {
      setUserAge(null);
    }
  }, [me]);

  // Redirect if user needs profile completion
  useEffect(() => {
    if (!isLoading && user && needsProfileCompletion) {
      console.log("User needs profile completion, redirecting to complete-profile");
      router.push("/complete-profile");
    }
  }, [user, isLoading, needsProfileCompletion, router]);

  // Check if user is logged in on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("Auth state changed:", currentUser?.uid);

      setLoading(true);

      if (currentUser) {
        console.log("User is logged in, checking backend for profile...");
        try {
          // Only try to fetch user details if backend URL is configured
          if (BACKEND_URL) {
            // Construct the correct URL - remove trailing slash if present
            const baseUrl = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
            const apiUrl = `${baseUrl}/user/${currentUser.uid}`;
            
            console.log('Fetching user details from:', apiUrl); // Debug log
            
            const res = await axios.get<{ user: Me }>(apiUrl);
            console.log("User profile found in backend:", res.data.user);
            setMe(res.data.user);
            setNeedsProfileCompletion(false);
          } else {
            console.warn("Backend URL not configured, skipping user details fetch");
            setMe(null);
            setNeedsProfileCompletion(true);
          }
        } catch (error: any) {
          console.error("Failed to fetch user details:", error);
          // Set needsProfileCompletion to true if user doesn't exist (404) or other errors
          if (error.response?.status === 404) {
            console.log("User not found in backend, needs profile completion");
            setNeedsProfileCompletion(true);
            setMe(null);
          } else if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
            console.log("Network error, skipping profile completion check");
            setNeedsProfileCompletion(false);
            setMe(null);
          } else {
            console.log("Other error, setting needs profile completion");
            setNeedsProfileCompletion(true);
            setMe(null);
          }
        }
      } else {
        setMe(null);
        setNeedsProfileCompletion(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [BACKEND_URL]);

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw new Error(error.message || "Registration failed");
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(error.message || "Login failed");
    }
  };

  // Login with Google
  const loginWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      // Add custom parameters to improve popup experience
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Google login failed:", error);
      
      // Handle specific popup errors
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error("Login was cancelled. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error("Popup was blocked by your browser. Please allow popups for this site.");
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error("Network error. Please check your internet connection.");
      } else {
        throw new Error(error.message || "Google login failed");
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setMe(null);
      setNeedsProfileCompletion(false);
    } catch (error: any) {
      console.error("Logout failed:", error);
      throw new Error(error.message || "Logout failed");
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error("Password reset failed:", error);
      throw new Error(error.message || "Password reset failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        me,
        userAge,
        isLoading,
        setLoading,
        login,
        loginWithGoogle,
        logout,
        register,
        resetPassword,
        needsProfileCompletion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 