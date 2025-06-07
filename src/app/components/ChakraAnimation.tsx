'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { planets } from '../Data/planet'

const ChakraAnimation = () => {
  const [activePlanet, setActivePlanet] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return

      setIsScrolling(true)
      
      if (e.deltaY > 0) {
        setActivePlanet(prev => (prev + 1) % planets.length)
      } else {
        setActivePlanet(prev => (prev - 1 + planets.length) % planets.length)
      }

      // Add delay to make scrolling less smooth
      setTimeout(() => setIsScrolling(false), 800)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isScrolling])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex lg:flex-row flex-col items-center gap-8">
        {/* Planetary System */}
        <div className="relative w-full max-w-[500px] aspect-square">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs>
              {planets.map((planet, index) => (
                <radialGradient
                  key={`gradient-${index}`}
                  id={`gradient-${index}`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor={planet.color} />
                  <stop offset="100%" stopColor={planet.secondaryColor} />
                </radialGradient>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Orbital Paths */}
            {planets.map((planet, index) => (
              <circle
                key={`orbit-${index}`}
                cx="250"
                cy="250"
                r={planet.orbit}
                fill="none"
                stroke={`url(#gradient-${index})`}
                strokeWidth={index === activePlanet ? "1.5" : "0.5"}
                strokeDasharray="4 6"
                className={`opacity-${index === activePlanet ? '50' : '20'} transition-all duration-500`}
              />
            ))}

            {/* Planets */}
            {planets.map((planet, index) => (
              <motion.g key={`planet-${index}`}>
                <motion.circle
                  cx={250 + Math.cos(index * (Math.PI * 2 / planets.length)) * planet.orbit}
                  cy={250 + Math.sin(index * (Math.PI * 2 / planets.length)) * planet.orbit}
                  r={index === activePlanet ? planet.size * 1.5 : planet.size}
                  fill={`url(#gradient-${index})`}
                  filter="url(#glow)"
                  animate={{
                    scale: index === activePlanet ? 1.2 : 1,
                    opacity: index === activePlanet ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.5 }}
                  className="cursor-pointer"
                  onClick={() => setActivePlanet(index)}
                />
                {index === activePlanet && (
                  <motion.circle
                    cx={250 + Math.cos(index * (Math.PI * 2 / planets.length)) * planet.orbit}
                    cy={250 + Math.sin(index * (Math.PI * 2 / planets.length)) * planet.orbit}
                    r={planet.size * 2}
                    fill={`url(#gradient-${index})`}
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.g>
            ))}

            {/* Center Sun */}
            <circle
              cx="250"
              cy="250"
              r="25"
              fill="url(#gradient-0)"
              filter="url(#glow)"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Planet Description - Updated styling */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlanet}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="lg:fixed lg:right-[5%] lg:top-1/2 lg:-translate-y-1/2 
                     w-full lg:w-[280px] bg-gradient-to-br from-purple-900/90 via-purple-800/50 to-purple-900/30 
                     backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 
                     shadow-xl shadow-purple-900/20 z-10"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 
                         bg-clip-text text-transparent mb-3">
              {planets[activePlanet].name}
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              {planets[activePlanet].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ChakraAnimation