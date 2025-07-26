/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-next-next-no-img-element */
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, Clock, MessageCircle, Phone, Video, MapPin, CheckCircle, Calendar, User } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { getAstrologerProfile } from '../../utils/astrologerprofile'
import { Astrologer, AstrologerSchedule } from '@/app/types/astrologerProfile'
import { FaRegCalendarAlt, FaRegClock, FaChevronDown } from "react-icons/fa";

interface CalendarDay {
  date: Date
  dayName: string
  dayNumber: number
  schedule: AstrologerSchedule | null
  isWorkingDay: boolean
}

interface AstrologerBookingClientProps {
  astrologerId: string
}

export default function AstrologerBookingClient({ astrologerId }: AstrologerBookingClientProps) {
  const router = useRouter()
  const astrologerIdNum = Number(astrologerId)

  // State management
  const [astrologer, setAstrologer] = useState<Astrologer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<AstrologerSchedule | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<string>('individual')
  const [selectedMode, setSelectedMode] = useState<'chat' | 'call' | 'video' | 'in_person'>('chat')
  const [showBookingSummaryModal, setShowBookingSummaryModal] = useState(false)

  // Utility functions
  const getPriceForMode = (mode: 'chat' | 'call' | 'video' | 'offline') => {
    const serviceMode = astrologer?.astrologer_services?.[0]?.modes?.find(m => m.mode === mode)
    return serviceMode ? `₹${serviceMode.price}` : 'N/A'
  }

  const profileImage = astrologer?.profile_image && astrologer.profile_image.trim() !== ''
    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${astrologer.profile_image}`
    : '/planets/services.jpg'

  // Data fetching
  useEffect(() => {
    const fetchAstrologerData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAstrologerProfile(astrologerIdNum)

        if (data && typeof data === 'object') {
          setAstrologer(data)
          if (data.astrologer_schedules && Array.isArray(data.astrologer_schedules)) {
            const sortedSchedules = [...data.astrologer_schedules].sort((a, b) => {
              const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
              return days.indexOf(a.day_of_week) - days.indexOf(b.day_of_week)
            })
            const firstWorkingDay = sortedSchedules.find(s => s.is_working_day)
            if (firstWorkingDay) {
              setSelectedScheduleDay(firstWorkingDay)
            } else if (sortedSchedules.length > 0) {
              setSelectedScheduleDay(sortedSchedules[0])
            }
          }
        } else {
          setError('Astrologer not found')
        }
      } catch (err) {
        console.error('Fetch astrologer error:', err)
        setError('Failed to load astrologer profile. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (astrologerIdNum) {
      fetchAstrologerData()
    }
  }, [astrologerIdNum])

  // Time slots generation
  const generateTimeSlots = useMemo(() => {
    if (!selectedScheduleDay) return []
    const slots: string[] = []
    const startTime = selectedScheduleDay.start_time
    const endTime = selectedScheduleDay.end_time

    if (!startTime || !endTime) return []

    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)
    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute

    for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 60) {
      const hour = Math.floor(minutes / 60)
      const displayHour = hour % 12 === 0 ? 12 : hour % 12
      const period = hour < 12 ? 'AM' : 'PM'
      slots.push(`${displayHour}:00 ${period}`)
    }
    return slots
  }, [selectedScheduleDay])

  // Calendar days generation
  const getCalendarDays = useMemo(() => {
    const today = new Date()
    const calendarDays: CalendarDay[] = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      const dayNameFull = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
      const schedule = astrologer?.astrologer_schedules.find(s =>
        s.day_of_week.toLowerCase() === dayNameFull.toLowerCase()
      )

      calendarDays.push({
        date: currentDate,
        dayName: dayNameFull.substring(0, 3),
        dayNumber: currentDate.getDate(),
        schedule: schedule || null,
        isWorkingDay: schedule?.is_working_day || false
      })
    }
    return calendarDays
  }, [astrologer?.astrologer_schedules])

  // Event handlers
  const handleBookingClick = () => {
    if (selectedScheduleDay && selectedTime && selectedMode) {
      setShowBookingSummaryModal(true)
    }
  }

  const handlePayNow = () => {
    alert('Proceeding to payment for your session!')
    setShowBookingSummaryModal(false)
  }

  // Loading and error states
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
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <Clock size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              {error === 'Astrologer not found' ? 'Astrologer Not Found' : 'Error Loading Profile'}
            </h1>
            <p className="text-slate-600 mb-6 text-lg">
              {error || `Unable to load astrologer profile. Please try again.`}
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Professional Hero Section with Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-10 mb-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Profile info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt={astrologer.full_name}
                    className="w-48 h-48 rounded-2xl object-cover border-4 border-amber-400 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center border-3 border-white">
                    <Clock size={16} className="text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{astrologer.full_name}</h1>
                  <p className="text-indigo-600 font-semibold text-lg mb-3">
                    {astrologer.experience_years}+ Years Experience
                  </p>

                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400 mr-3">
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
                      ({astrologer.astrologer_ratings?.average_rating || 'N/A'}) • {astrologer.astrologer_ratings?.total_reviews || 0} reviews
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {astrologer.languages.slice(0, 3).map((lang, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium text-blue-700">
                        {lang}
                      </span>
                    ))}
                    {astrologer.languages.length > 3 && (
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-600">
                        +{astrologer.languages.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {astrologer.is_verified && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Verified
                      </span>
                    )}
                    {astrologer.is_google_verified && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Google Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Service modes */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Available Consultation Modes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: MessageCircle, label: 'Chat', mode: 'chat', color: 'indigo' },
                    { icon: Phone, label: 'Call', mode: 'call', color: 'emerald' },
                    { icon: Video, label: 'Video', mode: 'video', color: 'rose' },
                    { icon: MapPin, label: 'In Person', mode: 'offline', color: 'amber' }
                  ].map(({ icon: Icon, label, mode, color }) => (
                    <div key={mode} className={`flex items-center bg-${color}-50 p-4 rounded-xl border border-${color}-100`}>
                      <Icon size={24} className={`text-${color}-600 mr-3`} />
                      <div>
                        <div className="font-semibold text-slate-800">{label}</div>
                        <div className="text-sm text-slate-600 font-medium">{getPriceForMode(mode as any)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Section - Horizontal Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8"
          >
            <div className="text-center mb-8">
              <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Book Your Consultation</h2>
              <p className="text-slate-600">Select your preferences and complete your booking</p>
            </div>

            {/* Horizontal Booking Form */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8 items-end justify-center">
              {/* Session Type - Only Individual */}
              <div className="w-full lg:w-1/4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Session Type</label>
                <div className="w-full p-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 font-semibold text-center shadow-sm">
                  Individual Session
                </div>
              </div>

              {/* Mode Selection */}
              <div className="w-full lg:w-1/4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Consultation Mode</label>
                <div className="relative">
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value as any)}
                    className="w-full p-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-semibold shadow focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none appearance-none transition-all duration-300"
                  >
                    <option value="chat">💬 Chat - {getPriceForMode('chat')}</option>
                    <option value="call">📞 Voice Call - {getPriceForMode('call')}</option>
                    <option value="video">🎥 Video Call - {getPriceForMode('video')}</option>
                    <option value="in_person">📍 In Person - {getPriceForMode('offline')}</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none">▼</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="w-full lg:w-1/4">
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaRegCalendarAlt className="text-amber-500" /> Select Date
                </label>
                <div className="relative">
                  <select
                    value={selectedScheduleDay?.id || ''}
                    onChange={(e) => {
                      const schedule = astrologer?.astrologer_schedules.find(s => s.id === Number(e.target.value))
                      setSelectedScheduleDay(schedule || null)
                      setSelectedTime(null)
                    }}
                    className="w-full p-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-semibold shadow focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none appearance-none transition-all duration-300 pr-10"
                  >
                    <option value="">Choose a date</option>
                    {getCalendarDays.filter(day => day.isWorkingDay).map((day, index) => (
                      <option key={index} value={day.schedule?.id}>
                        {day.dayName}, {day.dayNumber} - {day.schedule?.day_of_week}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
                </div>
              </div>

              {/* Time Selection */}
              <div className="w-full lg:w-1/4">
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaRegClock className="text-amber-500" /> Available Times
                  {selectedScheduleDay && (
                    <span className="text-slate-500 ml-1">- {selectedScheduleDay.day_of_week}</span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={selectedTime || ''}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={!selectedScheduleDay}
                    className="w-full p-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-semibold shadow focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none appearance-none transition-all duration-300 pr-10 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select time slot</option>
                    {generateTimeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Professional Book Button */}
            <div className="text-center">
              <button
                disabled={!selectedScheduleDay || !selectedTime || !selectedMode}
                onClick={handleBookingClick}
                className={`px-16 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform ${
                  selectedScheduleDay && selectedTime && selectedMode
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {selectedScheduleDay && selectedTime && selectedMode
                  ? `Book Consultation - ${getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}`
                  : 'Complete Selection to Continue'
                }
              </button>
              
              {selectedScheduleDay && selectedTime && selectedMode && (
                <p className="text-slate-600 mt-4 text-sm">
                  ✓ All selections complete • Ready to proceed
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Booking Summary Modal */}
      <AnimatePresence>
        {showBookingSummaryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingSummaryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Confirm Your Booking</h3>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 text-left border border-amber-100">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Astrologer:</span>
                      <span className="font-bold text-slate-800">{astrologer.full_name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Mode:</span>
                      <span className="font-bold text-slate-800">{selectedMode.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Date:</span>
                      <span className="font-bold text-slate-800">{selectedScheduleDay?.day_of_week}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Time:</span>
                      <span className="font-bold text-slate-800">{selectedTime}</span>
                    </div>
                    <hr className="my-2 border-amber-100" />
                    <div className="flex justify-between items-center text-base">
                      <span className="font-bold text-slate-800">Total:</span>
                      <span className="font-bold text-lg text-amber-600">{getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handlePayNow}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold text-base hover:shadow-lg transition-all duration-300 mb-2"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setShowBookingSummaryModal(false)}
                  className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-300"
                >
                  Cancel & Return
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}