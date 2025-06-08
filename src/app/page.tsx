import React from 'react'
import Navbar from './components/Navbar'
import ChakraAnimation from './components/ChakraAnimation'

import { Phone, Star } from 'lucide-react'

export default function Index() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="relative w-full min-h-screen flex items-center">
        {/* Left: Hero Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12 xl:px-16 z-10 bg-white">
          <div className="max-w-2xl">
            {/* Badge */}
            
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight font-bold leading-tight mb-6 text-neutral-900">
              Vedanta Astro
              <br />
              <span className="text-neutral-700 font-normal text-2xl lg:text-3xl">Unlock Your Cosmic Destiny</span>
            </h1>
            {/* Description */}
            <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-8 max-w-xl">
              Discover the wisdom of Vedic astrology with personalized guidance from our expert astrologers. Illuminate your path to success in career, relationships, and spiritual growth.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-lg shadow-lg transition-all duration-300 text-lg px-8 py-4"
              >
                Book Consultation
              </button>
              <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center shadow-lg">
                {/* Phone icon can be replaced with emoji or svg if lucide-react is not available */}
                <span role="img" aria-label="phone" className="text-white text-2xl">📞</span>
              </div>
              <div>
                <p className="text-orange-600 text-sm font-medium">Call us now</p>
                <a 
                  href="tel:+919022755627" 
                  className="text-xl font-bold text-neutral-900 hover:text-orange-600 transition-colors duration-300"
                >
                  +91 902-275-5627
                </a>
              </div>
            </div>
              
            </div>
            {/* Contact Info */}
            
          </div>
        </div>
        {/* Right: Solar System Animation */}
        <div className="hidden lg:block w-1/2 h-screen relative bg-neutral-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <ChakraAnimation />
          </div>
        </div>
        {/* Mobile Solar System Background */}
        <div className="lg:hidden absolute inset-0 opacity-10 pointer-events-none">
          <ChakraAnimation />
        </div>
      </main>
    </div>
  )
}
