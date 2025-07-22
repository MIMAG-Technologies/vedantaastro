/* eslint-disable @next/next/no-img-element */
'use client'

import { Star, Clock, MessageCircle, Phone, Video, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Astrologer } from '@/app/types/astrologerProfile'

interface AstrologerProfileProps {
  astrologer: Astrologer
}

export default function AstrologerProfile({ astrologer }: AstrologerProfileProps) {
  const profileImage = astrologer.profile_image && astrologer.profile_image.trim() !== '' 
    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${astrologer.profile_image}` 
    : '/planets/services.jpg'

  const getPriceForMode = (mode: 'chat' | 'call' | 'video' | 'offline') => {
    const serviceMode = astrologer?.astrologer_services?.[0]?.modes?.find(m => m.mode === mode)
    return serviceMode ? `₹${serviceMode.price}` : 'N/A'
  }

  return (
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
          src={profileImage}
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
  )
} 