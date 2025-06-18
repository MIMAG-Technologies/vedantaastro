'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string
  isPopular?: boolean
  onSelect?: (id: string) => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  features,
  price,
  icon: Icon,
  gradientFrom,
  gradientTo,
  isPopular = false,
  onSelect
}) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(id)
    }
  }

  return (
    <div className="w-72 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-orange-300/60 group relative overflow-hidden cursor-pointer">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
          Popular
        </div>
      )}

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/90 to-orange-50/60 opacity-80 group-hover:opacity-95 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
        <div className={`absolute top-3 left-3 w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-xl`}></div>
        <div className={`absolute bottom-3 right-3 w-8 h-8 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-lg`}></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Icon Section */}
        <div className="relative mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mx-auto`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Service Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-3 px-1">
            {description}
          </p>
          
          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              {price}
            </span>
            <span className="text-slate-500 text-sm ml-1">onwards</span>
          </div>
        </div>

        {/* Features List - Show only 2 for compact design */}
        <div className="mb-5">
          <ul className="space-y-2">
            {features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center text-slate-600">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mr-2 flex-shrink-0"></div>
                <span className="text-xs">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSelect}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform text-sm"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default ServiceCard