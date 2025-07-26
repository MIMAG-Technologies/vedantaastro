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
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      // Removed col-span as it's now a full-width item in a flex-col container
      // Added max-w-4xl mx-auto to center content on wide screens for a more contained look
      // Maintained p-6 for internal padding
      className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 relative overflow-hidden max-w-4xl mx-auto w-full"
    >
      {/* Decorative Orb Background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-amber-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between text-center lg:text-left relative z-10 mb-6">
        {/* Profile Image & Basic Info (Left side in wider layout) */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/3 mb-6 lg:mb-0">
          <div className="relative mb-2"> {/* Reduced mb-4 to mb-2 */}
            <img
              src={profileImage}
              alt={astrologer.full_name}
              className="w-32 h-32 rounded-full object-cover border-4 border-amber-400 shadow-lg ring-4 ring-white/50"
            />
            <div className="absolute bottom-1 right-1 bg-emerald-500 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md">
              <Clock size={14} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-0.5">{astrologer.full_name}</h2> {/* Reduced mb-1 to mb-0.5 */}
          <p className="text-indigo-600 font-semibold text-base mb-1 text-center lg:text-left"> {/* Reduced mb-2 to mb-1 */}
            {astrologer.experience_years}+ Years Experience
          </p>

          <div className="flex items-center mb-2"> {/* Reduced mb-4 to mb-2 */}
            <div className="flex text-amber-400 mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(Number(astrologer.astrologer_ratings?.average_rating || 0))
                      ? 'fill-current'
                      : 'stroke-current'
                  }
                />
              ))}
            </div>
            <span className="text-slate-600 text-sm">
              ({astrologer.astrologer_ratings?.average_rating || 'N/A'}/5) - {astrologer.astrologer_ratings?.total_reviews || 0} reviews
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 justify-center lg:justify-start mb-2"> {/* Reduced mb-4 to mb-2 */}
            {astrologer.languages.map((lang, index) => (
              <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-xs font-medium text-blue-700 shadow-sm">
                {lang}
              </span>
            ))}
          </div>

          <p className="text-slate-700 leading-relaxed text-sm max-w-sm mb-4 lg:mb-0 text-center lg:text-left">{astrologer.bio}</p> {/* Reduced mb-4 to mb-0, text to sm */}
        </div>

        {/* Available Modes (Center section in wider layout) */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <h3 className="text-lg font-bold text-slate-800 mb-3 text-center">Available Modes</h3>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col items-center bg-indigo-50 p-3 rounded-xl shadow-sm border border-indigo-100">
              <MessageCircle size={20} className="text-indigo-600 mb-1" />
              <span className="font-semibold text-slate-800 text-sm">Chat</span>
              <span className="text-xs text-slate-600">{getPriceForMode('chat')}</span>
            </div>
            <div className="flex flex-col items-center bg-emerald-50 p-3 rounded-xl shadow-sm border border-emerald-100">
              <Phone size={20} className="text-emerald-600 mb-1" />
              <span className="font-semibold text-slate-800 text-sm">Call</span>
              <span className="text-xs text-slate-600">{getPriceForMode('call')}</span>
            </div>
            <div className="flex flex-col items-center bg-rose-50 p-3 rounded-xl shadow-sm border border-rose-100">
              <Video size={20} className="text-rose-600 mb-1" />
              <span className="font-semibold text-slate-800 text-sm">Video Call</span>
              <span className="text-xs text-slate-600">{getPriceForMode('video')}</span>
            </div>
            <div className="flex flex-col items-center bg-amber-50 p-3 rounded-xl shadow-sm border border-amber-100">
              <MapPin size={20} className="text-amber-600 mb-1" />
              <span className="font-semibold text-slate-800 text-sm">In Person</span>
              <span className="text-xs text-slate-600">{getPriceForMode('offline')}</span>
            </div>
          </div>
        </div>

        {/* Contact Info & Services (Right side in wider layout) */}
        <div className="w-full lg:w-1/3">
          <div className="text-left border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0"> {/* Adjusted border-t and pt for responsive layout */}
            <h3 className="text-lg font-bold text-slate-800 mb-3">Contact Information</h3>
            <div className="space-y-1 text-xs text-slate-600">
              <p><span className="font-medium">Email:</span> {astrologer.email}</p>
              <p><span className="font-medium">Phone:</span> +91-{astrologer.phone_number}</p>
              <p><span className="font-medium">Gender:</span> {astrologer.gender}</p>
              <div className="flex items-center mt-2">
                {astrologer.is_verified && (
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium mr-1 shadow-sm">
                    ✓ Verified
                  </span>
                )}
                {astrologer.is_google_verified && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
                    Google Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mt-6 text-left border-t border-slate-100 pt-4">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Services</h3>
            <div className="space-y-1">
              {astrologer.astrologer_services.map((service, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded-xl shadow-sm border border-orange-100">
                  <p className="font-semibold text-orange-800 text-sm">{service.service_name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {service.modes.filter(m => m.is_active).map((mode, mIndex) => (
                      <span key={mIndex} className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full shadow-xs">
                        {mode.mode.charAt(0).toUpperCase() + mode.mode.slice(1).replace('_', ' ')} - ₹{mode.price}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}