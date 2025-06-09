'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

interface HomeHoroscopeCardProps {
  name: string
  symbol: string
  dates: string
  todaysPrediction: string
  gradient: string
  onReadMore?: () => void
}

const HomeHoroscopeCard: React.FC<HomeHoroscopeCardProps> = ({
  name,
  symbol,
  dates,
  todaysPrediction,
  gradient,
  onReadMore
}) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-xl border border-slate-200/40 hover:border-indigo-300/50 transition-all duration-500 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/30 to-indigo-50/20 group-hover:from-white group-hover:to-indigo-50/40 transition-all duration-500 rounded-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-100/30 to-transparent rounded-tr-2xl group-hover:from-indigo-200/40 transition-all duration-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
            <span className="text-white text-xl font-bold">{symbol}</span>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-slate-500 text-xs font-medium group-hover:text-slate-600 transition-colors duration-300">{dates}</p>
          </div>
        </div>

        {/* Prediction */}
        <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm p-4 rounded-xl border border-indigo-200/50 mb-4 group-hover:from-indigo-50 group-hover:to-purple-50 group-hover:border-indigo-300/60 transition-all duration-300">
          <p className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-800 transition-colors duration-300">{todaysPrediction}</p>
        </div>

        {/* CTA */}
        <button
          onClick={onReadMore}
          className="w-full text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center justify-center gap-1 group/btn transition-all duration-300 py-2 hover:scale-105"
        >
          View Full Reading
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  )
}

export default HomeHoroscopeCard