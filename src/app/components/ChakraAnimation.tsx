'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ChakraAnimation = () => {
  const [activePlanet, setActivePlanet] = useState(0)
  const systemRef = useRef<SVGSVGElement>(null)
  const svgSize = 800 // Increased size
  const center = svgSize / 2
  const planetRadius = 40 // Slightly smaller for better fit
  const numPlanets = 8
  const numOrbits = 9
  const minOrbit = 120 // Increased initial orbit
  const orbitGap = 60 // Increased gap between orbits

  // Astrologic/space gradients for planets
  const planetGradients = [
    ['#f7b733', '#fc4a1a'],
    ['#4e54c8', '#8f94fb'],
    ['#43cea2', '#b8e1fc'],
    ['#ffaf7b', '#ffd6e0'],
    ['#f7971e', '#ffd200'],
    ['#c33764', '#f8ffae'],
    ['#00c6ff', '#b2fefa'],
    ['#f953c6', '#b91d73'],
    ['#ee9ca7', '#ffdde1'],
  ]

  // Animate rotation
  useEffect(() => {
    let frame: number
    let angle = 0
    const animate = () => {
      angle += 0.008
      if (systemRef.current) {
        systemRef.current.style.transform = `rotate(${angle}deg)`
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  // Modified clip path for wider view
  const clipWidth = svgSize * 0.75 // 75% of total width for better visibility

  return (
    <div className="w-full overflow-hidden">
      <svg
        ref={systemRef}
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="block -mr-32" // Negative margin to extend into right space
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Astrologic/space background */}
          <radialGradient id="astro-bg" cx="60%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#2d2250" />
            <stop offset="100%" stopColor="#18122b" />
          </radialGradient>
          <radialGradient id="sun-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fffbe6" stopOpacity="0" />
          </radialGradient>
          {planetGradients.map((g, i) => (
            <radialGradient key={i} id={`planet-gradient-${i}`} cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor={g[0]} />
              <stop offset="100%" stopColor={g[1]} />
            </radialGradient>
          ))}
          {/* Half-moon clip path */}
          <clipPath id="half-moon">
            <rect
              x={svgSize * 0.25} // Start from 25% of width
              y="0"
              width={clipWidth}
              height={svgSize}
            />
          </clipPath>
        </defs>
        {/* Background with updated clip path */}
        <rect
          width={svgSize}
          height={svgSize}
          fill="url(#astro-bg)"
          clipPath="url(#half-moon)"
        />
        {/* Orbits with increased size */}
        {[...Array(numOrbits)].map((_, index) => (
          <circle
            key={`orbit-${index}`}
            cx={center}
            cy={center}
            r={minOrbit + index * orbitGap}
            fill="none"
            stroke="#fff"
            strokeWidth={0.7}
            opacity={0.10}
            clipPath="url(#half-moon)"
          />
        ))}
        {/* Sun glow with adjusted size */}
        <circle
          cx={center}
          cy={center}
          r={planetRadius + 24}
          fill="url(#sun-glow)"
          clipPath="url(#half-moon)"
        />
        {/* Sun */}
        <circle
          cx={center}
          cy={center}
          r={planetRadius}
          fill="url(#planet-gradient-0)"
          style={{ filter: 'brightness(1.08)' }}
          clipPath="url(#half-moon)"
        />
        {/* Planets with wider orbits */}
        {[...Array(numPlanets)].map((_, index) => {
          const angle = index * (Math.PI * 2 / numPlanets) - Math.PI / 2
          const orbit = minOrbit + (index + 1) * orbitGap
          const x = center + Math.cos(angle) * orbit
          const y = center + Math.sin(angle) * orbit
          return (
            <circle
              key={`planet-${index + 1}`}
              cx={x}
              cy={y}
              r={planetRadius}
              fill={`url(#planet-gradient-${(index + 1) % planetGradients.length})`}
              style={{
                filter: index + 1 === activePlanet ? 'brightness(1.15)' : 'brightness(1.0)',
                transition: 'filter 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => setActivePlanet(index + 1)}
              clipPath="url(#half-moon)"
            />
          )
        })}
      </svg>
    </div>
  )
}

export default ChakraAnimation