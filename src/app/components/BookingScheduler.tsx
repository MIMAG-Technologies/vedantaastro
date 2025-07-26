/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, MessageCircle, Phone, Video, MapPin } from 'lucide-react'
import { Astrologer, AstrologerSchedule } from '@/app/types/astrologerProfile'

interface CalendarDay {
  date: Date
  dayName: string
  dayNumber: number
  schedule: AstrologerSchedule | null
  isWorkingDay: boolean
}

interface BookingSchedulerProps {
  astrologer: Astrologer
  onBookingClick: (bookingData: {
    selectedScheduleDay: AstrologerSchedule
    selectedTime: string
    sessionType: 'individual' | 'couple'
    selectedMode: 'chat' | 'call' | 'video' | 'in_person'
  }) => void
}

export default function BookingScheduler({ astrologer, onBookingClick }: BookingSchedulerProps) {
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<AstrologerSchedule | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<'individual' | 'couple'>('individual')
  const [selectedMode, setSelectedMode] = useState<'chat' | 'call' | 'video' | 'in_person'>(
    (astrologer.astrologer_services?.[0]?.modes?.find(m => m.is_active)?.mode as 'chat' | 'call' | 'video' | 'in_person') || 'chat'
  );


  const getPriceForMode = (mode: 'chat' | 'call' | 'video' | 'offline') => {
    const serviceMode = astrologer?.astrologer_services?.[0]?.modes?.find(m => m.mode === mode)
    return serviceMode ? `₹${serviceMode.price}` : 'N/A'
  }

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
    
    // Generate slots every 60 minutes
    for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 60) {
      const hour = Math.floor(minutes / 60)
      const displayHour = hour % 12 === 0 ? 12 : hour % 12
      const period = hour < 12 ? 'AM' : 'PM'
      slots.push(`${displayHour}:00 ${period}`)
    }
    
    return slots
  }, [selectedScheduleDay])

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

  const handleBookingClick = () => {
    if (selectedScheduleDay && selectedTime && selectedMode) {
      onBookingClick({
        selectedScheduleDay,
        selectedTime,
        sessionType,
        selectedMode
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      // Removed col-span as it's now a full-width item in a flex-col container
      // Added max-w-4xl mx-auto to center content on wide screens for a more contained look
      // Maintained p-6 for internal padding
      className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 relative overflow-hidden max-w-4xl mx-auto w-full"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Book Your Consultation</h3>

      {/* Mode Selection */}
      <div className="w-full flex flex-wrap gap-2 mb-4 justify-start">
        {[{ key: 'chat', label: 'Chat', icon: MessageCircle }, { key: 'call', label: 'Call', icon: Phone }, { key: 'video', label: 'Video', icon: Video }, { key: 'in_person', label: 'In Person', icon: MapPin }].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setSelectedMode(key as any); setSelectedScheduleDay(null); setSelectedTime(null); }}
            className={`flex flex-col items-center px-4 py-2 rounded-xl border transition-all duration-200 text-xs font-medium ${selectedMode === key ? 'bg-amber-100 border-amber-400 text-amber-700 shadow' : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'}`}
          >
            <Icon size={20} className="mb-1" />
            {label}
          </button>
        ))}
      </div>

      {/* Date Selection */}
      <div className="w-full mb-6">
        <p className="font-semibold text-slate-700 mb-3 text-lg">Select Date</p>
        <div className="grid grid-cols-7 gap-1 text-center bg-transparent">
          {getCalendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => day.schedule && setSelectedScheduleDay(day.schedule)}
              disabled={!day.isWorkingDay}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 transform ${
                day.isWorkingDay
                  ? selectedScheduleDay?.id === day.schedule?.id
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
              }`}
            >
              <span className="text-sm font-medium mb-1">{day.dayName}</span>
              <span>{day.dayNumber}</span>
              {day.isWorkingDay && (
                <CheckCircle size={16} className="text-green-300 mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots Display */}
      <div className="w-full">
        {selectedScheduleDay && (
          <>
            <p className="font-semibold text-slate-700 mb-3 text-lg">
              Available Times for {selectedScheduleDay.day_of_week}
            </p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {generateTimeSlots.length > 0 ? (
                generateTimeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      selectedTime === slot ? 'bg-amber-500 border-amber-500 text-white shadow' : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <div className="col-span-3 text-center text-slate-400 py-6">No available time slots for this day.</div>
              )}
            </div>
          </>
        )}

        {!selectedScheduleDay && (
          <p className="text-center text-slate-500 py-4 text-base">Please select a day to view available times.</p>
        )}
      </div>

      {/* Booking Summary & Continue Button */}
      <div className="space-y-4">
        <button
          disabled={!selectedScheduleDay || !selectedTime || !selectedMode}
          onClick={handleBookingClick}
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
  )
}