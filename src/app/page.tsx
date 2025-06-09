import React from 'react'
import Navbar from './components/Navbar'
import ChakraAnimation from './components/ChakraAnimation'
import AstrologersSection from './components/sections/AstrologersSection'
import WhyVedantaSection from './components/sections/WhyVedantaSection'
import ServicesSection from './components/sections/ServicesSection'

export default function Index() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <main className="relative w-full min-h-screen flex items-center">
        {/* Left: Hero Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12 xl:px-16 z-10 bg-white">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Vedanta Astro
              </span>
              <br />
              <span className="text-indigo-700 font-medium text-2xl lg:text-3xl">Unlock Your Cosmic Destiny</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              Discover the wisdom of Vedic astrology with personalized guidance from our expert astrologers. Illuminate your path to success in career, relationships, and spiritual growth.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4 font-medium">
                Book Consultation
              </button>
              
              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center shadow-lg">
                  <span role="img" aria-label="phone" className="text-white text-xl">📞</span>
                </div>
                <div>
                  <p className="text-orange-600 text-sm font-medium">Call us now</p>
                  <a 
                    href="tel:+919022755627" 
                    className="text-xl font-bold text-indigo-700 hover:text-orange-600 transition-colors duration-300"
                  >
                    +91 902-275-5627
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Solar System Animation */}
        <div className="hidden lg:block w-1/2 h-screen relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <ChakraAnimation />
          </div>
        </div>
        
        {/* Mobile Solar System Background */}
        <div className="lg:hidden absolute inset-0 opacity-10 pointer-events-none">
          <ChakraAnimation />
        </div>
      </main>

      {/* Astrologers Section */}
      <AstrologersSection />

      {/* Why Vedanta Section */}
      <WhyVedantaSection />

      {/* Services Section */}
      <ServicesSection />
    </div>
  )
}
