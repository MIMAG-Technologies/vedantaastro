/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import Navbar from './components/Navbar'
import AstrologersSection from './components/Home Sections/AstrologersSection'
import WhyVedantaSection from './components/Home Sections/WhyVedantaSection'
import ServicesSection from './components/Home Sections/ServicesSection'
import ProductsSection from './components/Home Sections/ProductsSection'
import InsightsSection from './components/Home Sections/InsightsSection'
import Footer from './components/Footer'
import { motion } from 'framer-motion'

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - With the cosmic nebula background image */}
      <section className="relative bg-black h-screen overflow-hidden">
        {/* Nebula Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/planets/bgimage.jpg" 
            alt="Cosmic Nebula Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050114]/30 via-[#14072e]/30 to-[#140729]/30"></div>
        </div>
        
        

        <div className="container mx-auto h-full relative z-20">
          <div className="flex flex-col md:flex-row h-full items-center">
            {/* Left Content Column - Text Content */}
            <div className="w-full md:w-1/2 px-6 md:pl-12 pt-32 md:pt-20">
              <div className="as_banner_slider">
                <div className="as_banner_detail">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    style={{ color: '#ffffff !important' }}
                  >
                    Unlock Cosmic Insights with <span style={{ color: '#f59e0b !important' }} className="text-amber-500">Vedanta Astro</span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg text-white mb-8 max-w-lg leading-relaxed"
                    style={{ color: '#ffffff !important' }}
                  >
                    Discover your destiny through ancient Vedic wisdom and personalized astrological guidance. 
                    Our expert astrologers provide authentic insights to illuminate your path forward.
                  </motion.p>
                  
                  {/* Two Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href="tel:+919022755627"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Call Us Now 
                    </motion.a>
                    
                    <motion.a
                      href="/appointments"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                      className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Appointment
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Hand with Zodiac - Fixed positioning to avoid navbar overlap */}
            <div className="w-full md:w-1/2 relative h-full flex items-center justify-center">
              <div className="as_banner_img text-center relative w-[85%] md:w-[90%] lg:w-[95%] max-w-2xl mx-auto mt-24 md:mt-16 pt-8">
                {/* Background zodiac image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="w-full"
                >
                  <motion.img 
                    src="/planets/hand_bg.png" 
                    alt="Zodiac Background" 
                    className="img-responsive as_hand_bg w-[140%] h-auto opacity-90 scale-120 translate-x-56"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                
                {/* Foreground hand image */}
               
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider indicator dots */}
        
      </section>

      {/* Remaining Sections */}
      <div className=" relative">
        <div className="py-12">
          <AstrologersSection />
        </div>
        <div className="py-0">
          <WhyVedantaSection />
        </div>
        <div className="py-12 ">
          <ServicesSection />
        </div>
        <div className="py-0">
          <ProductsSection />
        </div>
        <div className="py-12">
          <InsightsSection />
        </div>
        <Footer />
      </div>
    </div>
  )
}