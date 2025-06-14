'use client'

import React, { useState } from 'react'
import { Star, Heart, ArrowRight } from 'lucide-react'

interface HoroscopeCardProps {
  id: string
  name: string
  symbol: string
  element: string
  dates: string
  ruler: string
  description: string
  todaysPrediction: string
  luckyColor: string
  luckyNumber: number
  traits: string[]
  gradient: string
  onReadMore?: (id: string) => void
}

const HoroscopeCard: React.FC<HoroscopeCardProps> = ({
  id,
  name,
  symbol,
  element,
  dates,
  ruler,
  description,
  todaysPrediction,
  luckyColor,
  luckyNumber,
  traits,
  gradient,
  onReadMore
}) => {
  const [showPrediction, setShowPrediction] = useState(false)

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(id)
    }
  }

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-slate-200 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-indigo-50/40 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mx-auto mb-3`}>
            <span className="text-white text-2xl font-bold">{symbol}</span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-slate-500 text-sm font-medium">{dates}</p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Element</p>
            <p className="text-sm font-medium text-slate-700">{element}</p>
          </div>
          <div className="text-center p-2 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Ruler</p>
            <p className="text-sm font-medium text-slate-700">{ruler}</p>
          </div>
        </div>

        {/* Description or Prediction Toggle */}
        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setShowPrediction(false)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                !showPrediction
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Traits
            </button>
            <button
              onClick={() => setShowPrediction(true)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                showPrediction
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Today
            </button>
          </div>

          {showPrediction ? (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-lg border border-orange-200/50">
              <p className="text-sm text-slate-700 leading-relaxed">{todaysPrediction}</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{description}</p>
              <div className="flex flex-wrap gap-1">
                {traits.slice(0, 3).map((trait, index) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lucky Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-pink-500" />
              <span className="text-xs text-slate-600">Lucky:</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: luckyColor.toLowerCase() }}
              ></div>
              <span className="text-xs font-medium text-slate-700">{luckyNumber}</span>
            </div>
          </div>
          
          <Star size={14} className="text-amber-500 fill-current" />
        </div>

        {/* CTA */}
        <button
          onClick={handleReadMore}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          <span>Detailed Reading</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default HoroscopeCard