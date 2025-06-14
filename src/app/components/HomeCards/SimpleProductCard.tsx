'use client'

import React, { useState } from 'react'
import { LucideIcon, Star, Eye, ArrowRight } from 'lucide-react'

interface SimpleProductCardProps {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string
  isBestseller?: boolean
  rating: number
  reviews: number
}

const SimpleProductCard: React.FC<SimpleProductCardProps> = ({
  name,
  category,
  price,
  originalPrice,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  isBestseller,
  rating,
  reviews
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 border border-slate-200/60 hover:border-orange-300/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-orange-50/30 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-100/40 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-tr-2xl"></div>
      
      {/* Top Badges - Better positioned */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {isBestseller && (
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Star size={12} className="fill-current" />
            <span>Bestseller</span>
          </div>
        )}
        {discountPercentage > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Quick View Button - Better positioned */}
      <div className="absolute top-4 right-4 z-20">
        <button className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-110 shadow-xl opacity-100' : 'scale-90 opacity-0'
        }`}>
          <Eye size={16} className="text-slate-600" />
        </button>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 p-6">
        {/* Icon Section with Enhanced Design */}
        <div className="mb-6 relative flex justify-center">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}>
            <Icon className="w-8 h-8 text-white relative z-10" />
            
            {/* Icon Glow Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Floating Glow - Fixed positioning */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10`}></div>
        </div>
        
        {/* Product Category & Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-orange-600 bg-gradient-to-r from-orange-50 to-yellow-50 px-3 py-1.5 rounded-full border border-orange-200/50">
            {category}
          </span>
          
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
            <Star size={12} className="text-amber-400 fill-current" />
            <span className="text-xs font-medium text-slate-600">{rating}</span>
            <span className="text-xs text-slate-400">({reviews})</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors duration-300 leading-tight">
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>
        
        {/* Price Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Savings Badge */}
          {discountPercentage > 0 && (
            <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              Save ₹{(originalPrice! - price).toLocaleString()}
            </div>
          )}
        </div>

        {/* Enhanced CTA Section */}
        <div className="flex gap-3 mb-4">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-2 group/btn">
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="px-4 py-3 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform">
            <Eye size={16} />
          </button>
        </div>

        {/* Trust Indicators - Simplified and Better */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              Authentic
            </span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              Certified
            </span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              Energized
            </span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
    </div>
  )
}

export default SimpleProductCard