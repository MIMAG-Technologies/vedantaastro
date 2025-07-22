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
  const [sessionType, setSessionType] = useState<'individual' | 'couple'>('individual')
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
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.back()}
            className="mb-8 group inline-flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-all duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200/50"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to All Services</span>
          </motion.button>

          {/* Professional Hero Section with Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-10 mb-8" // Increased padding to p-10
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Profile info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt={astrologer.full_name}
                    className="w-48 h-48 rounded-2xl object-cover border-4 border-amber-400 shadow-xl" // Increased w- and h- to w-48 h-48
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

          {/* Booking Section - Compact and Professional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8"
          >
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-amber-500 mr-3" />
              <h2 className="text-2xl font-bold text-slate-800">Book Your Consultation</h2>
            </div>

            {/* Session Configuration */}
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              {/* Session Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Session Type</label>
                <div className="space-y-2">
                  {[
                    { key: 'individual', label: 'Individual', icon: User },
                    { key: 'couple', label: 'Couple', icon: User }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setSessionType(key as any)}
                      className={`w-full flex items-center p-3 rounded-lg border transition-all duration-300 ${
                        sessionType === key
                          ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                          : 'bg-white border-slate-200 hover:border-amber-200'
                      }`}
                    >
                      <Icon size={18} className="mr-3 text-slate-600" />
                      <span className="font-medium text-slate-800">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Consultation Mode</label>
                <div className="space-y-2">
                  {[
                    { key: 'chat', label: 'Chat', price: getPriceForMode('chat') },
                    { key: 'call', label: 'Voice Call', price: getPriceForMode('call') },
                    { key: 'video', label: 'Video Call', price: getPriceForMode('video') },
                    { key: 'in_person', label: 'In Person', price: getPriceForMode('offline') }
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      onClick={() => setSelectedMode(mode.key as any)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                        selectedMode === mode.key
                          ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                          : 'bg-white border-slate-200 hover:border-amber-200'
                      }`}
                    >
                      <span className="font-medium text-slate-800">{mode.label}</span>
                      <span className="text-sm font-bold text-amber-600">{mode.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Select Date</label>
                <div className="space-y-2">
                  {getCalendarDays.slice(0, 4).map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.schedule && setSelectedScheduleDay(day.schedule)}
                      disabled={!day.isWorkingDay}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                        day.isWorkingDay
                          ? selectedScheduleDay?.id === day.schedule?.id
                            ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                            : 'bg-white border-slate-200 hover:border-amber-200'
                          : 'bg-slate-100 border-slate-200 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-medium text-slate-800">{day.dayName}</div>
                        <div className="text-sm text-slate-600">{day.dayNumber}</div>
                      </div>
                      {day.isWorkingDay && <CheckCircle size={16} className="text-green-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Available Times
                  {selectedScheduleDay && (
                    <span className="text-slate-500"> - {selectedScheduleDay.day_of_week}</span>
                  )}
                </label>
                {selectedScheduleDay && generateTimeSlots.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {generateTimeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(slot)}
                        className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                          selectedTime === slot
                            ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                            : 'bg-white border-slate-200 hover:border-amber-200'
                        }`}
                      >
                        <span className="font-medium text-slate-800">{slot}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg text-center text-slate-500">
                    {selectedScheduleDay
                      ? 'No available time slots'
                      : 'Please select a date first'
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Book Button */}
            <div className="text-center">
              <button
                disabled={!selectedScheduleDay || !selectedTime || !selectedMode}
                onClick={handleBookingClick}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  selectedScheduleDay && selectedTime && selectedMode
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {selectedScheduleDay && selectedTime && selectedMode
                  ? `Book Now - ${getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}`
                  : 'Complete Selection to Continue'
                }
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Summary Modal */}
      <AnimatePresence>
        {showBookingSummaryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingSummaryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Confirm Booking</h3>

                <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Astrologer:</span>
                      <span className="font-medium">{astrologer.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="font-medium">{sessionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Mode:</span>
                      <span className="font-medium">{selectedMode.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date:</span>
                      <span className="font-medium">{selectedScheduleDay?.day_of_week}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-amber-600">{getPriceForMode(selectedMode === 'in_person' ? 'offline' : selectedMode as any)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                  >
                    Proceed to Payment
                  </button>
                  <button
                    onClick={() => setShowBookingSummaryModal(false)}
                    className="w-full bg-slate-100 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-300"
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