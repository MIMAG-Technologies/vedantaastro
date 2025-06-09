'use client'

import React, { useRef, useEffect, useState } from 'react'
import ServiceCard from '../ServiceCard'
import { servicesData } from '@/app/Data/services'

const ServicesSection: React.FC = () => {
  const [currentRotation, setCurrentRotation] = useState(0)
  const animationRef = useRef<number | null>(null)

  const handleServiceSelect = (id: string) => {
    console.log(`Selected service: ${id}`)
  }

  // Show only 5 services for better circular arc
  const displayServices = servicesData.slice(0, 5)

  // Enhanced auto-rotation with faster speed
  useEffect(() => {
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const rotation = (elapsed * 0.025) % 360 // Faster rotation for better visibility
      setCurrentRotation(rotation)
      animationRef.current = requestAnimationFrame(animate)
    }

    const timer = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate)
    }, 1500) // Start sooner

    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Much more spacious circular arc positioning
  const getCardPosition = (index: number, totalCards: number) => {
    // Even wider arc for maximum spacing (180 degrees)
    const arcSpan = 180
    const startAngle = -90 // Start from -90 degrees
    const angle = startAngle + (index / (totalCards - 1)) * arcSpan
    
    // Much larger radius for maximum spacing
    const radius = 450
    const x = Math.sin((angle * Math.PI) / 180) * radius
    const y = Math.cos((angle * Math.PI) / 180) * radius * 0.2 // Even flatter arc
    
    // Minimal rotation for horizontal feel
    const rotation = angle * 0.1
    
    return { x, y, rotation, angle }
  }

  return (
    <section className="py-28 bg-gradient-to-br from-slate-50 via-indigo-50/15 to-orange-50/25 relative overflow-hidden">
      {/* Reduced background elements for cleaner look */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-1/5 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-1/5 w-56 h-56 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-8xl mx-auto px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Our Astrological</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive Vedic astrology services designed to illuminate your path and guide your journey through life&apos;s cosmic mysteries.
          </p>
        </div>

        {/* Much More Spacious Circular Arc Container */}
        <div className="relative h-[600px] mb-20 flex items-center justify-center overflow-visible">
          {/* Smaller, less distracting central element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center"
              style={{
                transform: `rotate(${currentRotation * 1.5}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
              </div>
            </div>
          </div>

          {/* Service Cards in Ultra-Spacious Circular Arc */}
          {displayServices.map((service, index) => {
            const position = getCardPosition(index, displayServices.length)
            const rotationOffset = currentRotation + index * 72
            const cardRotation = currentRotation * 0.15 + position.rotation
            
            // Enhanced scaling with better visibility range
            const scaleValue = 0.85 + Math.sin((rotationOffset) * Math.PI / 180) * 0.2
            const opacityValue = 0.8 + Math.sin((rotationOffset) * Math.PI / 180) * 0.2
            
            return (
              <div
                key={service.id}
                className="absolute transition-all duration-300 ease-out"
                style={{
                  transform: `
                    translate(${position.x}px, ${position.y}px) 
                    rotate(${cardRotation}deg)
                    scale(${scaleValue})
                  `,
                  opacity: opacityValue,
                  zIndex: Math.round(50 + Math.sin((rotationOffset) * Math.PI / 180) * 25),
                  filter: `blur(${Math.max(0, (1 - opacityValue) * 2)}px)` // Subtle blur for depth
                }}
              >
                <div
                  style={{
                    transform: `rotate(${-cardRotation}deg)` // Counter-rotate content
                  }}
                >
                  <ServiceCard
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    price={service.price}
                    icon={service.icon}
                    gradientFrom={service.gradientFrom}
                    gradientTo={service.gradientTo}
                    isPopular={service.isPopular}
                    onSelect={handleServiceSelect}
                  />
                </div>
              </div>
            )
          })}

          {/* Minimalist orbital rings */}
          <div 
            className="absolute rounded-full border border-orange-200/20"
            style={{
              width: '900px',
              height: '180px',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${currentRotation * 0.2}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute rounded-full border border-indigo-200/15"
            style={{
              width: '1100px',
              height: '220px',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${-currentRotation * 0.15}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>

          {/* Cleaner guide lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => {
              const angle = -90 + (i / 4) * 180
              return (
                <div
                  key={i}
                  className="absolute w-px h-16 bg-gradient-to-b from-transparent via-orange-200/25 to-transparent"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${angle}deg) translate(420px, -8px)`
                  }}
                ></div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="flex justify-center mb-16 space-x-6">
          {displayServices.map((_, index) => {
            const rotationOffset = currentRotation + index * 72
            const isActive = Math.sin((rotationOffset) * Math.PI / 180) > 0.3
            const intensity = Math.abs(Math.sin((rotationOffset) * Math.PI / 180))
            
            return (
              <div
                key={index}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-4 h-4 bg-gradient-to-r from-orange-500 to-yellow-400 scale-125 shadow-lg' 
                    : 'w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400'
                }`}
                style={{
                  opacity: 0.5 + intensity * 0.5,
                  boxShadow: isActive ? '0 0 20px rgba(255, 165, 0, 0.4)' : 'none'
                }}
              ></div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-4 px-12 rounded-2xl font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
            View All Services
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection