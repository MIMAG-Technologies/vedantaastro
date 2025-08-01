"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";

export default function CompleteProfile() {
  const { user, me, isLoading, needsProfileCompletion, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";

  const initialUserData = {
    firebase_uid: "",
    full_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    profile_image: "",
    gender: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // User not logged in, redirect to login
        router.push("/login");
        return;
      }

      if (isEditMode) {
        if (me) {
          // Pre-fill data from existing user profile
          const dbDate = me.personalInfo.dateOfBirth;
          const formattedDate = dbDate ? formatDateForDisplay(dbDate) : "";

          setUserData({
            firebase_uid: user.uid,
            full_name: me.personalInfo.name,
            email: me.personalInfo.email,
            phone_number: me.personalInfo.phone,
            date_of_birth: formattedDate,
            profile_image: me.personalInfo.profileImage,
            gender: me.personalInfo.gender,
          });
        }
      } else {
        // Normal profile completion flow
        if (me && !needsProfileCompletion) {
          // User already has a complete profile, redirect to profile page
          router.push("/profile");
          return;
        }
        // Pre-fill data from Firebase user
        setUserData((prev) => ({
          ...prev,
          firebase_uid: user.uid,
          full_name: user.displayName || "",
          email: user.email || "",
          profile_image: user.photoURL || "",
        }));
      }
    }
  }, [user, me, isLoading, needsProfileCompletion, router, isEditMode]);

  const handleInputChange = useCallback(
    (field: keyof typeof userData, value: string) => {
      setUserData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    const { date_of_birth, gender, phone_number, full_name } = userData;

    if (!date_of_birth || !gender || !phone_number || !full_name) {
      setError("Please fill all required fields");
      setSubmitLoading(false);
      return;
    }

    try {
      const submissionData = {
        ...userData,
        date_of_birth: formatDateForSubmission(date_of_birth),
        gender: gender.charAt(0).toUpperCase() + gender.slice(1), // Capitalize first letter
      };

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      // Check if backend URL is configured
      if (!BACKEND_URL) {
        setError("Backend is not configured. Please contact the administrator.");
        setSubmitLoading(false);
        return;
      }

      // Construct the correct URL - remove trailing slash if present
      const baseUrl = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
      const apiUrl = `${baseUrl}/user`;

      console.log('Submitting to:', apiUrl); // Debug log

      const response = await axios.post(
        apiUrl,
        submissionData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.data.success) {
        if (isEditMode) {
          router.push("/profile");
        } else {
          // Show success state
          setError(""); // Clear any previous errors
          setSubmitLoading(false);
          setIsSuccess(true);
          
          // Redirect to profile page after showing success
          setTimeout(() => {
            router.push("/profile");
          }, 2000);
        }
      } else {
        setError(response.data.message || "Failed to complete profile");
      }
    } catch (error: any) {
      console.error("Error submitting profile:", error);
      
      // Handle specific error types
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        setError("Cannot connect to the server. Please check your internet connection and try again.");
      } else if (error.code === 'ERR_NETWORK') {
        setError("Network error. Please check your internet connection and try again.");
      } else if (error.response?.status === 404) {
        setError("Server endpoint not found. Please contact the administrator.");
      } else if (error.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        setError(error.response?.data?.message || "Invalid request. Please check your data and try again.");
      } else {
        setError(
          error.response?.data?.message ||
          "Failed to complete profile. Please try again."
        );
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY for display
  const formatDateForDisplay = (dbDate: string): string => {
    if (!dbDate) return "";

    // Check if the date is already in DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dbDate)) return dbDate;

    try {
      const [year, month, day] = dbDate.split('-');
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date for display:", error);
      return dbDate; // Return original if parsing fails
    }
  };

  // Format date from DD/MM/YYYY to YYYY-MM-DD for database submission
  const formatDateForSubmission = (displayDate: string): string => {
    if (!displayDate) return "";

    // Check if the date is already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(displayDate)) return displayDate;

    try {
      const [day, month, year] = displayDate.split('/');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date for submission:", error);
      return displayDate; // Return original if parsing fails
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="/planets/bgimage.jpg" 
          alt="Cosmic Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050114]/80 via-[#14072e]/80 to-[#140729]/80"></div>
      </div>
      
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 z-10 border border-white/20">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center rounded-full shadow-lg">
            <FaUser className="text-white text-3xl" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {isEditMode ? "Edit Your Profile" : "Complete Your Profile"}
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please provide these additional details to set up your account.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-lg mb-4">
            Profile completed successfully! Redirecting to profile page...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="full_name" className="block text-gray-700 mb-1 font-medium">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                id="full_name"
                type="text"
                value={userData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
                disabled={isSuccess}
              />
            </div>
          </div>

          {/* Email Field - Disabled */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={userData.email}
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                placeholder="Your email address"
                disabled
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone_number" className="block text-gray-700 mb-1 font-medium">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="text-gray-400" />
              </div>
              <input
                id="phone_number"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={userData.phone_number}
                disabled={isEditMode}
                onChange={(e) => handleInputChange("phone_number", e.target.value)}
                className={isEditMode ? "pl-10 w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed" : "pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {/* Date of Birth Field */}
          <div>
            <label htmlFor="date_of_birth" className="block text-gray-700 mb-1 font-medium">
              Date of Birth
            </label>
            <input
              id="date_of_birth"
              type="text"
              value={userData.date_of_birth}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers and forward slash
                const sanitized = value.replace(/[^\d/]/g, '');
                // Auto-add slashes after DD and MM
                const formatted = sanitized
                  .replace(/^(\d{2})(?=\d)/, '$1/')
                  .replace(/^(\d{2}\/\d{2})(?=\d)/, '$1/')
                  .slice(0, 10);
                handleInputChange("date_of_birth", formatted);
              }}
              placeholder="DD/MM/YYYY"
              pattern="\d{2}/\d{2}/\d{4}"
              maxLength={10}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              required
            />
            <small className="text-gray-500 mt-1 block">
              Format: DD/MM/YYYY (e.g., 01/01/1990)
            </small>
          </div>

          {/* Gender Field */}
          <div>
            <label htmlFor="gender" className="block text-gray-700 mb-1 font-medium">
              Gender
            </label>
            <select
              id="gender"
              value={userData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitLoading || isSuccess}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-70"
          >
            {submitLoading
              ? "Processing..."
              : isSuccess
                ? "Profile Completed!"
                : isEditMode
                  ? "Save Changes"
                  : "Complete Profile"}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="w-full bg-gray-200 text-gray-700 p-2.5 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold"
          >
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
}