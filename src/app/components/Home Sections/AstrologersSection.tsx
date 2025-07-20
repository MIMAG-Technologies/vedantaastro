'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AstrologerCard from '../HomeCards/AstrologerCard'
import { astrologersData } from '@/app/Data/astrologers'

const AstrologersSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChatClick = (id: string) => {
    console.log(`Starting chat with astrologer ${id}`)
  }

  const handleCallClick = (id: string) => {
    console.log(`Starting call with astrologer ${id}`)
  }

  const handleNotifyClick = (id: string) => {
    console.log(`Setting notification for astrologer ${id}`)
  }

  const handleViewAllAstrologers = () => {
    if (isMounted) {
      router.push('/astrologers')
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Our Expert </span>                         
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Astrologers
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with our certified Vedic astrology experts for personalized guidance and insights into your cosmic journey.
          </p>
        </div>

        {/* Astrologers Grid */}
        <div className="grid md:grid-cols-2 space-x-5 lg:grid-cols-3 gap-8 mb-12">
          {astrologersData.slice(0, 6).map((astrologer) => (
            <AstrologerCard
              key={astrologer.id}
              {...astrologer}
              onChatClick={handleChatClick}
              onCallClick={handleCallClick}
              onNotifyClick={handleNotifyClick}
            />
          ))}
        </div>
           
        {/* View All Button - With mounted check */}
        <div className="text-center mt-25">
          <button 
            onClick={handleViewAllAstrologers}
            disabled={!isMounted}
            className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-4 px-12 rounded-2xl font-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View All Astrologers
          </button>
        </div>
      </div>
    </section>
  )
}

export default AstrologersSection