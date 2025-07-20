/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/astrologer/[id]/AstrologerBookingClient.tsx
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Clock, MessageCircle, Phone, Video, MapPin } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { getAstrologerProfile } from '../../utils/astrologerprofile'
import { Astrologer, AstrologerSchedule } from '@/app/types/astrologerProfile'

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

  useEffect(() => {
    const fetchAstrologerData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Starting to fetch astrologer data for ID:', astrologerIdNum);
        const data = await getAstrologerProfile(astrologerIdNum)
        
        console.log('Received astrologer data:', data);
        
        if (data && typeof data === 'object') {
          console.log('Setting astrologer data');
          setAstrologer(data)
          
          // Set initial selected day to the first working day if available
          if (data.astrologer_schedules && Array.isArray(data.astrologer_schedules)) {
            const firstWorkingDay = data.astrologer_schedules.find(s => s.is_working_day);
            if (firstWorkingDay) {
              setSelectedScheduleDay(firstWorkingDay);
              console.log('Set initial working day:', firstWorkingDay);
            }
          }
        } else {
          console.log('Data validation failed - setting error');
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

  // Improved day calculation for calendar
  const getCalendarDays = useMemo(() => {
    const today = new Date();
    const calendarDays = [];
    
    // Generate next 7 days
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Find schedule by matching day names (case insensitive)
      const schedule = astrologer?.astrologer_schedules.find(s => 
        s.day_of_week.toLowerCase() === dayName.toLowerCase()
      );
      
      calendarDays.push({
        date: currentDate,
        dayName: dayName.substring(0, 3),
        dayNumber: currentDate.getDate(),
        schedule: schedule || null,
        isWorkingDay: schedule?.is_working_day || false
      });
    }
    
    return calendarDays;
  }, [astrologer?.astrologer_schedules]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600">Loading astrologer profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !astrologer) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                {error === 'Astrologer not found' ? 'Astrologer Not Found' : 'Error Loading Astrologer'}
              </h1>
              <p className="text-slate-600 mb-6">
                {error || 'Unable to load astrologer profile. The astrologer with ID ' + astrologerId + ' may not exist.'}
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => router.back()}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 mr-4"
                >
                  Go Back
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-300"
                >
                  Retry
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Astrologer ID: {astrologerId}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const profileImage = astrologer.profile_image && astrologer.profile_image.trim() !== '' 
    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${astrologer.profile_image}` 
    : '/planets/services.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />

      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.back()}
            className="mb-12 inline-flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-all duration-300 group bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200/50"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </motion.button>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Astrologer Profile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <img
                  src={profileImage}
                  alt={astrologer.full_name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-amber-400 shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  <Clock size={16} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-2">{astrologer.full_name}</h2>
              <p className="text-indigo-600 font-semibold mb-3">
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

              <p className="text-slate-700 leading-relaxed mb-6 text-sm">{astrologer.bio}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {astrologer.languages.map((lang, index) => (
                  <span key={index} className="px-4 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                    {lang}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4">Available Modes</h3>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center bg-indigo-50 p-4 rounded-xl shadow-sm">
                  <MessageCircle size={24} className="text-indigo-600 mb-2" />
                  <span className="font-semibold text-slate-800">Chat</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('chat')}</span>
                </div>
                <div className="flex flex-col items-center bg-emerald-50 p-4 rounded-xl shadow-sm">
                  <Phone size={24} className="text-emerald-600 mb-2" />
                  <span className="font-semibold text-slate-800">Call</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('call')}</span>
                </div>
                <div className="flex flex-col items-center bg-rose-50 p-4 rounded-xl shadow-sm">
                  <Video size={24} className="text-rose-600 mb-2" />
                  <span className="font-semibold text-slate-800">Video Call</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('video')}</span>
                </div>
                <div className="flex flex-col items-center bg-amber-50 p-4 rounded-xl shadow-sm">
                  <MapPin size={24} className="text-amber-600 mb-2" />
                  <span className="font-semibold text-slate-800">In Person</span>
                  <span className="text-sm text-slate-600">{getPriceForMode('offline')}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="w-full mt-8 text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-medium">Email:</span> {astrologer.email}</p>
                  <p><span className="font-medium">Phone:</span> +91-{astrologer.phone_number}</p>
                  <p><span className="font-medium">Gender:</span> {astrologer.gender}</p>
                  <div className="flex items-center mt-3">
                    {astrologer.is_verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                        ✓ Verified
                      </span>
                    )}
                    {astrologer.is_google_verified && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Google Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="w-full mt-8 text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Services</h3>
                <div className="space-y-2">
                  {astrologer.astrologer_services.map((service, index) => (
                    <div key={index} className="bg-orange-50 p-3 rounded-lg">
                      <p className="font-semibold text-orange-800">{service.service_name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.modes.filter(m => m.is_active).map((mode, mIndex) => (
                          <span key={mIndex} className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                            {mode.mode.charAt(0).toUpperCase() + mode.mode.slice(1)} - ₹{mode.price}
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
              className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Book Your Session</h3>

              {/* Session Type */}
              <div className="mb-6">
                <p className="font-semibold text-slate-700 mb-3">Session Type</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSessionType('individual')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      sessionType === 'individual'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    onClick={() => setSessionType('couple')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      sessionType === 'couple'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Couple
                  </button>
                </div>
              </div>

              {/* Session Mode Selector */}
              <div className="mb-8">
                <p className="font-semibold text-slate-700 mb-3">Select Mode</p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Chat */}
                  <div
                    onClick={() => setSelectedMode('chat')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 ${
                      selectedMode === 'chat'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">CHAT</h4>
                      <span className="text-lg font-bold text-amber-600">{getPriceForMode('chat')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr Chat Session</p>
                  </div>
                  
                  {/* Call */}
                  <div
                    onClick={() => setSelectedMode('call')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 ${
                      selectedMode === 'call'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">CALL</h4>
                      <span className="text-lg font-bold text-amber-600">{getPriceForMode('call')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr Voice Call</p>
                  </div>
                  
                  {/* Video Call */}
                  <div
                    onClick={() => setSelectedMode('video')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 ${
                      selectedMode === 'video'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">VIDEO CALL</h4>
                      <span className="text-lg font-bold text-amber-600">{getPriceForMode('video')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr Video Session</p>
                  </div>
                  
                  {/* In Person */}
                  <div
                    onClick={() => setSelectedMode('in_person')}
                    className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all duration-300 ${
                      selectedMode === 'in_person'
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-400'
                        : 'bg-white border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">IN PERSON</h4>
                      <span className="text-lg font-bold text-amber-600">{getPriceForMode('offline')}</span>
                    </div>
                    <p className="text-sm text-slate-600">1 Hr In-Person Session</p>
                  </div>
                </div>
              </div>

              {/* Available Slots - Calendar View */}
              <div className="mb-8">
                <p className="font-semibold text-slate-700 mb-3">Available Days</p>
                <div className="grid grid-cols-7 gap-2 mb-6 text-center">
                  {getCalendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.schedule && setSelectedScheduleDay(day.schedule)}
                      disabled={!day.isWorkingDay}
                      className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                        day.isWorkingDay
                          ? selectedScheduleDay?.id === day.schedule?.id
                            ? 'bg-amber-500 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-70'
                      }`}
                    >
                      <span className="text-xs font-medium mb-1">{day.dayName}</span>
                      <span className="font-bold">{day.dayNumber}</span>
                      {day.isWorkingDay && (
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Time Slots Display */}
                {selectedScheduleDay && (
                  <>
                    <p className="font-semibold text-slate-700 mb-3">
                      Available Times for {selectedScheduleDay.day_of_week}
                    </p>
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {generateTimeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                            selectedTime === slot
                              ? 'bg-amber-500 text-white shadow-md'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {selectedScheduleDay && generateTimeSlots.length === 0 && (
                  <p className="text-center text-slate-500 py-4">No available time slots for this day</p>
                )}

                {!selectedScheduleDay && (
                  <p className="text-center text-slate-500 py-4">Please select a day to view available times</p>
                )}
              </div>

              {/* Booking Summary & Continue Button */}
              <div className="space-y-4">
                {selectedScheduleDay && selectedTime && selectedMode && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Booking Summary</h4>
                    <div className="text-sm space-y-1 text-slate-600">
                      <p><span className="font-medium">Mode:</span> {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1).replace('_', ' ')}</p>
                      <p><span className="font-medium">Day:</span> {selectedScheduleDay.day_of_week}</p>
                      <p><span className="font-medium">Time:</span> {selectedTime}</p>
                      <p><span className="font-medium">Type:</span> {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session</p>
                      <p><span className="font-medium">Price:</span> {getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}</p>
                      <p><span className="font-medium">Astrologer:</span> {astrologer.full_name}</p>
                    </div>
                  </div>
                )}
                
                <button
                  disabled={!selectedScheduleDay || !selectedTime || !selectedMode}
                  onClick={() => {
                    console.log('Booking details:', {
                      astrologerId: astrologerIdNum,
                      astrologerName: astrologer.full_name,
                      mode: selectedMode,
                      day: selectedScheduleDay?.day_of_week,
                      time: selectedTime,
                      sessionType: sessionType,
                      price: getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)
                    });
                    // Navigate to payment page or show confirmation modal
                    alert(`Booking confirmed for ${astrologer.full_name} on ${selectedScheduleDay?.day_of_week} at ${selectedTime} via ${selectedMode}`);
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedScheduleDay && selectedTime && selectedMode
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transform'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {selectedScheduleDay && selectedTime && selectedMode 
                    ? `Continue Booking - ${getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}`
                    : 'Select Date, Time & Mode to Continue'
                  }
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}