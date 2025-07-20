/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/astrologer/[id]/AstrologerBookingClient.tsx
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion' // Import AnimatePresence
import { ArrowLeft, Star, Clock, MessageCircle, Phone, Video, MapPin, CheckCircle } from 'lucide-react' // Added CheckCircle for success
import Navbar from '../../components/Navbar'
import { getAstrologerProfile } from '../../utils/astrologerprofile'
import { Astrologer, AstrologerSchedule } from '@/app/types/astrologerProfile'

// Defined CalendarDay interface for clarity in useMemo
interface CalendarDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  schedule: AstrologerSchedule | null;
  isWorkingDay: boolean;
}

interface AstrologerBookingClientProps {
  astrologerId: string
}

export default function AstrologerBookingClient({ astrologerId }: AstrologerBookingClientProps) {
  const router = useRouter()
  const astrologerIdNum = Number(astrologerId)

  const [astrologer, setAstrologer] = useState<Astrologer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedScheduleDay, setSelectedScheduleDay] = useState<AstrologerSchedule | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'individual' | 'couple'>('individual');
  const [selectedMode, setSelectedMode] = useState<'chat' | 'call' | 'video' | 'in_person'>('chat');
  const [showBookingSummaryModal, setShowBookingSummaryModal] = useState(false); // New state for modal

  useEffect(() => {
    const fetchAstrologerData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await getAstrologerProfile(astrologerIdNum)
        
        if (data && typeof data === 'object') {
          setAstrologer(data)
          
          if (data.astrologer_schedules && Array.isArray(data.astrologer_schedules)) {
            // Sort schedules by day of week to ensure consistent order (Mon, Tue, Wed...)
            // This is a basic sort, you might need a more robust one for localization/full week cycle
            const sortedSchedules = [...data.astrologer_schedules].sort((a, b) => {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return days.indexOf(a.day_of_week) - days.indexOf(b.day_of_week);
            });
            
            // Set initial selected day to the first available working day (or simply the first sorted day)
            const firstWorkingDay = sortedSchedules.find(s => s.is_working_day);
            if (firstWorkingDay) {
              setSelectedScheduleDay(firstWorkingDay);
            } else if (sortedSchedules.length > 0) {
              setSelectedScheduleDay(sortedSchedules[0]); // Fallback to first day if no working day found
            }
          }
        } else {
          setError('Astrologer not found')
        }
      } catch (err) {
        console.error('Fetch astrologer error:', err);
        setError('Failed to load astrologer profile. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (astrologerIdNum) {
      fetchAstrologerData()
    }
  }, [astrologerIdNum])

  const getPriceForMode = (mode: 'chat' | 'call' | 'video' | 'offline') => {
    const serviceMode = astrologer?.astrologer_services?.[0]?.modes?.find(m => m.mode === mode);
    return serviceMode ? `₹${serviceMode.price}` : 'N/A';
  };

  // Improved time slot generation
  const generateTimeSlots = useMemo(() => {
    if (!selectedScheduleDay) return [];

    const slots: string[] = [];
    const startTime = selectedScheduleDay.start_time; // e.g., "08:00"
    const endTime = selectedScheduleDay.end_time;     // e.g., "16:00"
    
    if (!startTime || !endTime) return [];
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    // Generate 1-hour slots
    for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 60) {
      const hour = Math.floor(minutes / 60);
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? 'AM' : 'PM';
      slots.push(`${displayHour}:00 ${period}`);
    }
    
    return slots;
  }, [selectedScheduleDay]);

  // Improved day calculation for calendar - generates the next 7 days and maps them to schedules
  const getCalendarDays = useMemo(() => {
    const today = new Date();
    const calendarDays: CalendarDay[] = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      const dayNameFull = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      
      const schedule = astrologer?.astrologer_schedules.find(s => 
        s.day_of_week.toLowerCase() === dayNameFull.toLowerCase()
      );
      
      calendarDays.push({
        date: currentDate,
        dayName: dayNameFull.substring(0, 3), // e.g., "Mon"
        dayNumber: currentDate.getDate(),
        schedule: schedule || null,
        isWorkingDay: schedule?.is_working_day || false
      });
    }
    
    return calendarDays;
  }, [astrologer?.astrologer_schedules]);

  // Handle booking action (show modal)
  const handleBookingClick = () => {
    if (selectedScheduleDay && selectedTime && selectedMode) {
      setShowBookingSummaryModal(true);
    }
  };

  // Handle Pay Now click (placeholder)
  const handlePayNow = () => {
    alert('Proceeding to payment for your session!');
    setShowBookingSummaryModal(false);
    // Here you would integrate with a payment gateway
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 text-lg">Loading expert profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !astrologer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <Clock size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              {error === 'Astrologer not found' ? 'Astrologer Not Found' : 'Error Loading Profile'}
            </h1>
            <p className="text-slate-600 mb-6 text-lg">
              {error || `Unable to load astrologer profile with ID ${astrologerId}. It may not exist or there was a network issue.`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Go Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const profileImage = astrologer.profile_image && astrologer.profile_image.trim() !== '' 
    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${astrologer.profile_image}` 
    : '/planets/services.jpg'; // Fallback image


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <Navbar />

      {/* Subtle Background Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <section className="relative pt-24 pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.back()}
            className="mb-12 inline-flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-all duration-300 group bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200/50"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to All Services</span>
          </motion.button>

          {/* Adjusted grid columns for better balance: lg:col-span-2 and lg:col-span-3 */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Column: Astrologer Profile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Decorative Orb Background */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-amber-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

              <div className="relative mb-6 z-10">
                <img
                  src={profileImage || '/public/profile.jpg'}
                  alt={astrologer.full_name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-amber-400 shadow-lg ring-4 ring-white/50"
                />
                <div className="absolute bottom-2 right-2 bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md">
                  <Clock size={16} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-2">{astrologer.full_name}</h2>
              <p className="text-indigo-600 font-semibold mb-3 text-lg">
                {astrologer.experience_years}+ Years Experience
              </p>

              <div className="flex items-center mb-6">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(Number(astrologer.astrologer_ratings?.average_rating || 0))
                          ? 'fill-current'
                          : 'stroke-current'
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-600 text-lg">
                  ({astrologer.astrologer_ratings?.average_rating || 'N/A'}/5) - {astrologer.astrologer_ratings?.total_reviews || 0} reviews
                </span>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 text-base max-w-sm">{astrologer.bio}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {astrologer.languages.map((lang, index) => (
                  <span key={index} className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm font-medium text-blue-700 shadow-sm">
                    {lang}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4">Available Modes</h3>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center bg-indigo-50 p-4 rounded-xl shadow-sm border border-indigo-100">
                  <MessageCircle size={24} className="text-indigo-600 mb-2" />
                  <span className="font-semibold text-slate-800">Chat</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('chat')}</span>
                </div>
                <div className="flex flex-col items-center bg-emerald-50 p-4 rounded-xl shadow-sm border border-emerald-100">
                  <Phone size={24} className="text-emerald-600 mb-2" />
                  <span className="font-semibold text-slate-800">Call</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('call')}</span>
                </div>
                <div className="flex flex-col items-center bg-rose-50 p-4 rounded-xl shadow-sm border border-rose-100">
                  <Video size={24} className="text-rose-600 mb-2" />
                  <span className="font-semibold text-slate-800">Video Call</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('video')}</span>
                </div>
                <div className="flex flex-col items-center bg-amber-50 p-4 rounded-xl shadow-sm border border-amber-100">
                  <MapPin size={24} className="text-amber-600 mb-2" />
                  <span className="font-semibold text-slate-800">In Person</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('offline')}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="w-full mt-8 text-left border-t border-slate-100 pt-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-medium">Email:</span> {astrologer.email}</p>
                  <p><span className="font-medium">Phone:</span> +91-{astrologer.phone_number}</p>
                  <p><span className="font-medium">Gender:</span> {astrologer.gender}</p>
                  <div className="flex items-center mt-3">
                    {astrologer.is_verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2 shadow-sm">
                        ✓ Verified
                      </span>
                    )}
                    {astrologer.is_google_verified && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                        Google Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="w-full mt-8 text-left border-t border-slate-100 pt-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Services</h3>
                <div className="space-y-2">
                  {astrologer.astrologer_services.map((service, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl shadow-sm border border-orange-100">
                      <p className="font-semibold text-orange-800">{service.service_name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.modes.filter(m => m.is_active).map((mode, mIndex) => (
                          <span key={mIndex} className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full shadow-xs">
                            {mode.mode.charAt(0).toUpperCase() + mode.mode.slice(1).replace('_', ' ')} - ₹{mode.price}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Booking Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative overflow-hidden"
            >
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')] opacity-5 pointer-events-none"></div>

              <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">Book Your Session</h3>

              {/* Session Type */}
              <div className="mb-6">
                <p className="font-semibold text-slate-700 mb-3 text-lg">Choose Session Type</p>
                <div className="flex gap-4 bg-slate-100 p-1 rounded-xl shadow-inner">
                  <button
                    onClick={() => setSessionType('individual')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      sessionType === 'individual'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : 'text-slate-700 hover:bg-white/70'
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    onClick={() => setSessionType('couple')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      sessionType === 'couple'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : 'text-slate-700 hover:bg-white/70'
                    }`}
                  >
                    Couple
                  </button>
                </div>
              </div>

              {/* Session Mode Selector */}
              <div className="mb-8">
                <p className="font-semibold text-slate-700 mb-3 text-lg">Select Mode</p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Chat */}
                  <button
                    onClick={() => setSelectedMode('chat')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 text-left transform hover:scale-[1.02] ${
                      selectedMode === 'chat'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">CHAT</h4>
                      <span className="text-xl font-bold text-amber-600">{getPriceForMode('chat')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr Chat Session</p>
                  </button>
                  {/* Call */}
                  <button
                    onClick={() => setSelectedMode('call')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 text-left transform hover:scale-[1.02] ${
                      selectedMode === 'call'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">CALL</h4>
                      <span className="text-xl font-bold text-amber-600">{getPriceForMode('call')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr Voice Call</p>
                  </button>
                  {/* Video Call */}
                  <button
                    onClick={() => setSelectedMode('video')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 text-left transform hover:scale-[1.02] ${
                      selectedMode === 'video'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">VIDEO CALL</h4>
                      <span className="text-xl font-bold text-amber-600">{getPriceForMode('video')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr Video Session</p>
                  </button>
                  {/* In Person */}
                  <button
                    onClick={() => setSelectedMode('in_person')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 text-left transform hover:scale-[1.02] ${
                      selectedMode === 'in_person'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">IN PERSON</h4>
                      <span className="text-xl font-bold text-amber-600">{getPriceForMode('offline')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr In-Person Session</p>
                  </button>
                </div>
              </div>

              {/* Available Days Calendar */}
              <div className="mb-8 pt-10">
                <p className="font-semibold text-slate-700 mb-3 text-lg">Select Date</p>
                <div className="grid grid-cols-7 gap-2 mb-6 text-center p-2 bg-slate-100 rounded-xl shadow-inner">
                  {getCalendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.schedule && setSelectedScheduleDay(day.schedule)}
                      disabled={!day.isWorkingDay}
                      className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                        day.isWorkingDay
                          ? selectedScheduleDay?.id === day.schedule?.id
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-white text-slate-700 hover:bg-amber-50'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                      }`}
                    >
                      <span className="text-sm font-medium mb-1">{day.dayName}</span>
                      <span className="text-xl font-bold">{day.dayNumber}</span>
                      {day.isWorkingDay && (
                        <CheckCircle size={16} className="text-green-300 mt-1" /> // Visual indicator for working day
                      )}
                    </button>
                  ))}
                </div>

                {/* Time Slots Display */}
                {/* Applied mt-10 for more space above time slots */}
                <div className="mt-10">
                  {selectedScheduleDay && (
                    <>
                      <p className="font-semibold text-slate-700 mb-3 text-lg">
                        Available Times for {selectedScheduleDay.day_of_week}
                      </p>
                      <div className="grid grid-cols-4 gap-3 mb-6 p-2 bg-slate-100 rounded-xl shadow-inner">
                        {generateTimeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTime(slot)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 transform hover:scale-105 ${
                              selectedTime === slot
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                                : 'bg-white text-slate-700 hover:bg-amber-50'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {selectedScheduleDay && generateTimeSlots.length === 0 && (
                  <p className="text-center text-slate-500 py-4 text-base">No available time slots for this day.</p>
                )}

                {!selectedScheduleDay && (
                  <p className="text-center text-slate-500 py-4 text-base">Please select a day to view available times.</p>
                )}
              </div>

              {/* Booking Summary & Continue Button */}
              <div className="space-y-4">
                <button
                  disabled={!selectedScheduleDay || !selectedTime || !selectedMode}
                  onClick={handleBookingClick} // Triggers the modal
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedScheduleDay && selectedTime && selectedMode
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transform'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {selectedScheduleDay && selectedTime && selectedMode 
                    ? `Review & Pay - ${getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}`
                    : 'Select Date, Time & Mode to Continue'
                  }
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Summary Modal */}
      <AnimatePresence>
        {showBookingSummaryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingSummaryModal(false)} // Close modal on overlay click
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              // Adjusted modal padding to py-4 px-6 for a slightly smaller height
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full py-0 px-16 relative overflow-hidden" 
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Modal Background Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-100/50 rounded-full mix-blend-multiply blur-xl opacity-70 -translate-x-1/4 -translate-y-1/4"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-100/50 rounded-full mix-blend-multiply blur-xl opacity-70 translate-x-1/4 translate-y-1/4"></div>

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Confirm Your Booking</h3>
                {/* Reduced mb-8 to mb-6 for description */}
                <p className="text-slate-600 mb-6 text-lg">
                  Please review your session details before proceeding to payment.
                </p>

                {/* Booking Summary Details */}
                {/* Reduced mb-8 to mb-6 for summary block */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 text-left space-y-3">
                  <h4 className="font-semibold text-slate-800 text-xl mb-3">Session Details</h4>
                  <div className="text-base space-y-2 text-slate-700">
                    <p><span className="font-medium text-slate-900">Astrologer:</span> {astrologer.full_name}</p>
                    <p><span className="font-medium text-slate-900">Session Type:</span> {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session</p>
                    <p><span className="font-medium text-slate-900">Mode:</span> {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1).replace('_', ' ')}</p>
                    <p><span className="font-medium text-slate-900">Date:</span> {selectedScheduleDay?.day_of_week}, {getCalendarDays.find(d => d.schedule?.id === selectedScheduleDay?.id)?.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p><span className="font-medium text-slate-900">Time:</span> {selectedTime}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-4"><span className="text-slate-700 font-medium text-base">Total:</span> {getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}</p>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Pay Now
                  </button>
                  <button
                    onClick={() => setShowBookingSummaryModal(false)}
                    className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}