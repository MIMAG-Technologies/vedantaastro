'use client'

import React from 'react'
import { MessageCircle, Phone, Bell, Star } from 'lucide-react'

interface AstrologerCardProps {
  id: string
  name: string
  experience: string
  rating: number
  totalRatings: number
  specializations: string[]
  isOnline: boolean
  avatar?: string
  initials: string
  gradientFrom: string
  gradientTo: string
  onChatClick?: (id: string) => void
  onCallClick?: (id: string) => void
  onNotifyClick?: (id: string) => void
}

const AstrologerCard: React.FC<AstrologerCardProps> = ({
  id,
  name,
  experience,
  rating,
  totalRatings,
  specializations,
  isOnline,
  avatar,
  initials,
  gradientFrom,
  gradientTo,
  onChatClick,
  onCallClick,
  onNotifyClick
}) => {
  const handleChatClick = () => {
    if (isOnline && onChatClick) {
      onChatClick(id)
    }
  }

  const handleCallClick = () => {
    if (isOnline && onCallClick) {
      onCallClick(id)
    } else if (!isOnline && onNotifyClick) {
      onNotifyClick(id)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-indigo-200/50 group relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Avatar Section */}
        <div className="relative mb-6">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            />
          ) : (
            <div 
              className={`w-24 h-24 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}
            >
              {initials}
            </div>
          )}
          
          {/* Status Badge */}
          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-white text-xs rounded-full font-medium shadow-lg ${
            isOnline 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
              : 'bg-gradient-to-r from-rose-500 to-pink-500'
          }`}>
            {isOnline ? 'Online' : 'Busy'}
          </div>
        </div>
        
        {/* Astrologer Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors duration-300">{name}</h3>
          <p className="text-indigo-600 font-medium mb-3">{experience}</p>
          
          {/* Rating */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-amber-400 mr-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={index < Math.floor(rating) ? 'fill-current' : 'stroke-current'}
                />
              ))}
            </div>
            <span className="text-slate-600 text-sm">({rating}/{totalRatings})</span>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-6">
          <h4 className="text-slate-800 font-semibold mb-3">Specializations:</h4>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 rounded-full text-sm font-medium hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 transition-all duration-300 cursor-default"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isOnline ? (
            <>
              <button
                onClick={handleChatClick}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <MessageCircle size={18} />
                Chat
              </button>
              <button
                onClick={handleCallClick}
                className="flex-1 border-2 border-indigo-300 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:border-transparent py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
              >
                <Phone size={18} />
                Call
              </button>
            </>
          ) : (
            <>
              <button
                disabled
                className="flex-1 bg-slate-200 text-slate-500 py-3 px-4 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Busy
              </button>
              <button
                onClick={handleCallClick}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <Bell size={18} />
                Notify
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AstrologerCard