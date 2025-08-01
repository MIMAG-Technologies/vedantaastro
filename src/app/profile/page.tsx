"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars, FaEdit, FaComments, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import Link from "next/link";

export default function Profile() {
  const { user, me, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
        return;
      }
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEditProfile = () => {
    router.push("/complete-profile?mode=edit");
  };

  // Show loading state
  if (isLoading || isLoadingProfile) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || !me) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">Please complete your profile setup first.</p>
          <Link
            href="/complete-profile"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  // Additional safety check for personalInfo
  if (!me.personalInfo) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Data Incomplete</h2>
          <p className="text-gray-600 mb-6">Your profile data is incomplete. Please try again.</p>
          <Link
            href="/complete-profile"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  // Calculate user age
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY for display
  const formatDateForDisplay = (dbDate: string): string => {
    if (!dbDate) return "Not provided";

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

  const userAge = calculateAge(me?.personalInfo?.dateOfBirth || "");

  return (
    <div className="min-h-screen relative">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="/planets/bgimage.jpg" 
          alt="Cosmic Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050114]/80 via-[#14072e]/80 to-[#140729]/80"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">My Profile</h1>
            <p className="text-gray-300 text-lg">Manage your account and view your statistics</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="h-32 w-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  {me?.personalInfo?.profileImage ? (
                    <img 
                      src={me.personalInfo.profileImage} 
                      alt="Profile" 
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-6xl" />
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {me?.personalInfo?.name || "User"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {me?.personalInfo?.email || "No email provided"}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold text-gray-800">
                      {me?.personalInfo?.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                    <p className="font-semibold text-gray-800">
                      {me?.personalInfo?.dateOfBirth ? formatDateForDisplay(me.personalInfo.dateOfBirth) : "Not provided"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="font-semibold text-gray-800 capitalize">
                      {me?.personalInfo?.gender || "Not provided"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Age</p>
                    <p className="font-semibold text-gray-800">
                      {userAge ? `${userAge} years` : "Not calculated"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => router.push("/complete-profile?mode=edit")}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Counselling Stats */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Counselling</h3>
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FaComments className="text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{me?.stats?.counselling?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{me?.stats?.counselling?.completed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming</span>
                  <span className="font-semibold text-orange-600">{me?.stats?.counselling?.upcoming || 0}</span>
                </div>
              </div>
            </div>

            {/* Chat Stats */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Chat</h3>
                <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <FaComments className="text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{me?.stats?.chat?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{me?.stats?.chat?.completed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming</span>
                  <span className="font-semibold text-orange-600">{me?.stats?.chat?.upcoming || 0}</span>
                </div>
              </div>
            </div>

            {/* Call Stats */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Calls</h3>
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaPhone className="text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{me?.stats?.call?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{me?.stats?.call?.completed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming</span>
                  <span className="font-semibold text-orange-600">{me?.stats?.call?.upcoming || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancelled</span>
                  <span className="font-semibold text-red-600">{me?.stats?.call?.cancelled || 0}</span>
                </div>
              </div>
            </div>

            {/* Tests Stats */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Tests</h3>
                <div className="h-10 w-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <FaClipboardList className="text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{me?.stats?.tests?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{me?.stats?.tests?.completed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-blue-600">{me?.stats?.tests?.active || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-orange-600">{me?.stats?.tests?.pending || 0}</span>
                </div>
              </div>
            </div>

            {/* Offline Stats */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Offline</h3>
                <div className="h-10 w-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{me?.stats?.offline?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{me?.stats?.offline?.completed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming</span>
                  <span className="font-semibold text-orange-600">{me?.stats?.offline?.upcoming || 0}</span>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Account</h3>
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">
                    {me?.accountInfo?.createdAt ? new Date(me.accountInfo.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timezone</span>
                  <span className="font-semibold">{me?.preferences?.timezone || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 