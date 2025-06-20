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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - Enhanced Dark Mysterious Space Theme */}
      <section className="relative h-screen bg-gradient-to-b from-[#0c0b1d] via-[#160d30] to-[#1c1042] overflow-hidden">
        
        {/* Enhanced Starfield Background with Varied Star Sizes */}
        <div className="absolute inset-0">
          {/* Larger stars */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`large-star-${i}`}
              className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.6)'
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Medium stars */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`medium-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.7, 1.2, 0.7],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Small stars */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`small-star-${i}`}
              className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Colored stars for astronomy feel */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`colored-star-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-blue-300' : i % 3 === 1 ? 'bg-amber-300' : 'bg-purple-300'
              } opacity-70`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: i % 3 === 0 
                  ? '0 0 4px rgba(96, 165, 250, 0.8)' 
                  : i % 3 === 1 
                    ? '0 0 4px rgba(251, 191, 36, 0.8)' 
                    : '0 0 4px rgba(168, 85, 247, 0.8)'
              }}
              animate={{
                opacity: [0.5, 0.9, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Cosmic Nebula Background Effects */}
        <div className="absolute inset-0 opacity-20">
          {/* Deep space nebula 1 */}
          <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-purple-900/30 via-indigo-900/20 to-transparent rounded-full blur-[80px]"></div>
          
          {/* Deep space nebula 2 */}
          <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-to-tr from-[#120b29]/40 via-[#301b63]/20 to-transparent rounded-full blur-[100px]"></div>
          
          {/* Distant galaxy cluster */}
          <div className="absolute top-1/4 left-1/3 w-1/4 h-1/4 bg-gradient-to-r from-[#0f0c29]/30 via-[#302b63]/20 to-[#24243e]/10 rounded-full blur-[60px]"></div>
        </div>

        {/* Astrology Symbolic Elements */}
        <svg className="absolute h-40 w-40 top-10 left-10 opacity-5 text-white" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.2" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.2" />
          <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.2" />
          <line x1="15" y1="85" x2="85" y2="15" stroke="currentColor" strokeWidth="0.2" />
        </svg>
        
        <svg className="absolute h-32 w-32 bottom-20 right-20 opacity-5 text-white" viewBox="0 0 100 100">
          <polygon points="50,10 61,35 90,35 67,55 75,80 50,65 25,80 33,55 10,35 39,35" stroke="currentColor" fill="none" strokeWidth="0.3" />
        </svg>

        {/* Central Planet Hub - Enhanced Dark Galaxy Theme */}
        <div className="absolute inset-0 flex mt-30 items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative w-96 h-96 lg:w-[30rem] lg:h-[30rem]"
          >
            {/* Planet Core - Enhanced Dark Mysterious Galaxy Effect */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{
                boxShadow: '0 0 80px rgba(59, 7, 100, 0.6), 0 0 150px rgba(25, 18, 112, 0.5), 0 0 250px rgba(12, 12, 45, 0.4)' // Deeper mysterious glow
              }}
            >
              <img
                src="/planets/EARTH.png"
                alt="Cosmic Earth"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#080420]/50 via-transparent to-[#130f40]/50"></div> 
              
              {/* Enhanced nebula effect layer */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <div className="absolute -inset-1/4 w-150% h-150% rotate-12 bg-gradient-to-tr from-black via-[#1f0949] to-black rounded-full blur-xl"></div>
              </div>
              
              {/* Cosmic dust layer */}
              <div className="absolute inset-0 opacity-25">
                <div className="absolute inset-0 bg-[url('/textures/noise.png')] bg-repeat mix-blend-soft-light"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Top Content Arc - Adjusted positioning */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 text-center max-w-4xl px-6" // Moved higher up
        >
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-amber-400/30 mb-5"> {/* Reduced spacing */}
            <span className="text-amber-300 font-medium">✨ Ancient Wisdom Meets Modern Life</span>
          </div>
          
          {/* Main Heading with more space above planet */}
          <h1 
            className="text-4xl lg:text-4xl font-bold mb-4 leading-tight" 
            style={{ color: 'rgb(248, 250, 252)' }}
          >
            Your Cosmic Journey Begins Here
          </h1>
        </motion.div>

        {/* Left Content Panel - White Heading */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-4 md:left-6 xl:left-12 top-[65%] -translate-y-1/2 max-w-sm"
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-amber-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-amber-400 mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            {/* Left Card Heading - Using inline style */}
            <h3 
              className="text-2xl font-bold mb-3" 
              style={{ color: 'rgb(248, 250, 252)' }}
            >
              Personalized Readings
            </h3>
            <p className="text-slate-300 mb-6">Get detailed insights into your life path, relationships, and destiny through Vedic astrology.</p>
            <div className="text-amber-400 text-sm font-medium">25+ Expert Astrologers</div>
          </motion.div>
        </motion.div>

        {/* Right Content Panel - White Heading */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute right-4 md:right-6 xl:right-12 top-[65%] -translate-y-1/2 max-w-sm"
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-orange-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-orange-400 mb-4">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            {/* Right Card Heading - Using inline style */}
            <h3 
              className="text-2xl font-bold mb-3" 
              style={{ color: 'rgb(248, 250, 252)' }}
            >
              Instant Guidance
            </h3>
            <p className="text-slate-300 mb-6">Connect with expert astrologers immediately for urgent life decisions and spiritual guidance.</p>
            <div className="text-orange-400 text-sm font-medium">Available 24/7</div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA Section - Moved Further Down */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 text-center" // Changed from bottom-6 md:bottom-8 to bottom-2 md:bottom-4
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-0">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:from-amber-400 hover:to-orange-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Reading
            </motion.button>
            
            <motion.a
              href="tel:+919022755627"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +91 902-275-5627
            </motion.a>
          </div>
        </motion.div>

        {/* Floating Mystical Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>
        
        <motion.div
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full"
          animate={{
            x: [-15, 15, -15],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>
      </section>

      {/* Remaining Sections with added spacing */}
      <div className="bg-white relative">
        <div className="py-16">
          <AstrologersSection />
        </div>
        <div className="py-16">
          <WhyVedantaSection />
        </div>
        <div className="py-16">
          <ServicesSection />
        </div>
        <div className="py-16">
          <ProductsSection />
        </div>
        <div className="py-16">
          <InsightsSection />
        </div>
        <Footer />
      </div>
    </div>
  )
}