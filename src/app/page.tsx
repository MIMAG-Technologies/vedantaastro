import React from 'react'
import Navbar from './components/Navbar'
import ChakraAnimation from './components/ChakraAnimation'
import AstrologersSection from './components/sections/AstrologersSection'
import WhyVedantaSection from './components/sections/WhyVedantaSection'
import ServicesSection from './components/sections/ServicesSection'
import ProductsSection from './components/sections/ProductsSection'
import InsightsSection from './components/sections/InsightsSection'
import Footer from './components/Footer'

export default function Index() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section with Navbar */}
      <div className="bg-black min-h-[120vh]">
        <Navbar />
        
        {/* Hero Section */}
        <main className="relative w-full min-h-[120vh] flex items-center bg-black">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/95 to-black"></div>
          
          {/* Left: Hero Section - moved slightly higher */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12 xl:px-16 z-10 relative -mt-20">
            <div className="max-w-2xl">
              {/* Main Heading */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  Vedanta Astro
                </span>
                <br />
                <span className="text-white/90 font-light text-2xl lg:text-3xl">Unlock Your Cosmic Destiny</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl font-light">
                Discover the wisdom of Vedic astrology with personalized guidance from our expert astrologers. Illuminate your path to success in career, relationships, and spiritual growth.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-2xl rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 px-8 py-4 font-medium backdrop-blur-sm border-2 border-white/80 hover:border-white/100 focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                  Book Consultation
                </button>
                
                <div className="flex items-center gap-4 p-4 border-2 border-white/30 hover:border-white/50 rounded-2xl bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white/30">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-amber-400 text-sm font-medium">Call us now</p>
                    <a 
                      href="tel:+919022755627" 
                      className="text-xl font-bold text-white hover:text-amber-400 transition-colors duration-300"
                    >
                      +91 902-275-5627
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Solar System Animation - moved slightly higher */}
          <div className="hidden lg:block w-1/2 h-[120vh] relative">
            <div className="absolute inset-0 flex items-center justify-center -mt-20">
              <ChakraAnimation />
            </div>
          </div>
          
          {/* Mobile Solar System Background */}
          <div className="lg:hidden absolute inset-0 opacity-20 pointer-events-none">
            <ChakraAnimation />
          </div>

          {/* Keep gradient transition exactly the same */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
        </main>
      </div>

      {/* White Content Sections with subtle top padding */}
      <div className="bg-white -mt-16 relative z-10">
        <div className="pt-16">
          <AstrologersSection />
          <WhyVedantaSection />
          <ServicesSection />
          <ProductsSection />
          <InsightsSection />
          <Footer />
        </div>
      </div>
    </div>
  )
}