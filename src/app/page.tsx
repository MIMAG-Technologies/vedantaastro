'use client'

import React from 'react'
import Navbar from './components/Navbar'
import ChakraAnimation from './components/ChakraAnimation'


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 min-h-screen flex items-center overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                  Vedanta Astro
                </span>
              </h1>
              <p className="text-2xl font-light text-gray-300">
                Unlock Your Cosmic Destiny
              </p>
            </div>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              Experience the profound wisdom of Vedic astrology through personalized 
              guidance. Our expert astrologers illuminate your path to success in 
              career, relationships, and spiritual growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                               hover:from-purple-700 hover:to-pink-700 text-white rounded-lg 
                               shadow-lg transition-all duration-300 text-lg font-medium 
                               transform hover:scale-105">
                Book Consultation
              </button>
              
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center 
                              justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Call us now</p>
                  <a href="tel:+919022755627" 
                     className="text-xl font-bold text-white hover:text-purple-400 
                              transition-colors duration-300">
                    +91 902-275-5627
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Planetary Animation */}
          <div className="relative rounded-3xl backdrop-blur-sm">
            <ChakraAnimation />
          </div>
        </div>
      </main>
    </div>
  )
}
