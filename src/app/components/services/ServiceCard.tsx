/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
'use client'

import React, { useState } from 'react'
import { Star, Sun, Moon, Users, Clock, Activity, Gem, Award, Heart, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'


// Define the Service interface that matches your API response
export interface Service {
  id: number
  title: string
  description: string
  features?: string[]
  price?: string
  service_type: string
  service_images: string[]
  created_at: string
  updated_at: string
  is_active: boolean
  thumbnail_img: string | null
  is_popular?: boolean
}

// Map of fallback icons by service type
const FALLBACK_ICONS: Record<string, LucideIcon> = {
  ONE_ON_ONE: Users,
  GROUP: Users,
  ONLINE: Clock,
  astrology: Sun,
  numerology: Star, 
  horoscope: Moon,
  counseling: Users,
  reading: Clock,
  remedial: Gem,
  healing: Heart,
  spiritual: Sparkles,
  matchmaking: Activity,
  default: Award
}

// Updated interface to match your usage
export interface ServiceCardProps {
  service: Service
  gradientFrom?: string
  gradientTo?: string
  onSelect?: (service: Service) => void
}

// Only the button is indigo, rest uses orange/amber theme
const BUTTON_GRADIENT = "from-indigo-600 to-purple-600";
const BORDER_GRADIENT = "from-amber-400 to-orange-500";
const SERVICE_TYPE_GRADIENT = "from-amber-500 to-orange-500";

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  gradientFrom = "from-amber-500",
  gradientTo = "to-orange-500",
  onSelect
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Get fallback icon based on service type
  const FallbackIcon = FALLBACK_ICONS[service.service_type] || FALLBACK_ICONS.default
  
  // Base URL for images - replace with your actual API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.vedantaastro.com"
  
  // Function to get full image URL
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null
    
    // Check if it's already a full URL
    if (imagePath.startsWith('http')) return imagePath
    
    // Otherwise join with base path
    return `${API_BASE_URL}/uploads/${imagePath}`
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(service)
    }
  }

  // Format date string to more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="group h-full">
      {/* Card with orange/amber gradient border */}
      <div className="relative h-full rounded-2xl p-[1px] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
        {/* Orange border gradient */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${BORDER_GRADIENT} opacity-70 blur-[1px] group-hover:opacity-100 transition-opacity`} />
        
        {/* Card content with glass effect */}
        <div className="relative h-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
          {/* Popular Badge - Orange theme */}
          {service.is_popular && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
              Popular
            </div>
          )}

          {/* Image Section - LARGER SIZE */}
          <div className="w-full h-48 relative overflow-hidden rounded-t-2xl">
            {/* Shimmering placeholder while loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
            )}
            
            {/* Image with fallback - FULL WIDTH */}
            <img 
              src={service.thumbnail_img && !imageError 
                ? getImageUrl(service.thumbnail_img) || '/planets/numbers.jpg' 
                : '/planets/numbers.jpg'}
              alt={service.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Gradient overlay for better text contrast */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Service Type Badge - Orange theme */}
            <div className="absolute bottom-3 left-3">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full 
                bg-gradient-to-r ${SERVICE_TYPE_GRADIENT}
                text-white shadow-md`}>
                {service.service_type === 'ONE_ON_ONE' ? 'One on One' : 
                 service.service_type === 'GROUP' ? 'Group Session' : 
                 service.service_type === 'ONLINE' ? 'Online Service' : 
                 service.service_type}
              </span>
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col flex-grow p-6">
            {/* Decorative elements - Orange theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-5 group-hover:opacity-10 transition-opacity blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-5 group-hover:opacity-10 transition-opacity blur-xl" />
            </div>
            
            {/* Service Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {service.description}
              </p>
            </div>
            
            {/* Added date info */}
            <div className="text-xs text-slate-400 mb-6">
              Added {formatDate(service.created_at)}
            </div>

            {/* Spacer to push button to bottom */}
            <div className="flex-grow" />

            {/* CTA Button - INDIGO/PURPLE only */}
            <button
              onClick={handleSelect}
              className={`w-full bg-gradient-to-r ${BUTTON_GRADIENT} text-white py-3 px-4 rounded-xl font-medium
                transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105
                relative overflow-hidden group-hover:shadow-xl`}
            >
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard