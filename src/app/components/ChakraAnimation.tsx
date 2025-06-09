'use client'
import React, { useEffect, useState, useRef } from 'react'

const adjustColor = (color: string, amount: number) => {
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

const ChakraAnimation = () => {
  const [activePlanet, setActivePlanet] = useState(0)
  const systemRef = useRef<SVGSVGElement>(null)
   
  // Adjusted dimensions for better visibility
  const svgSize = 1800
  const svgHeight = 900
  const center = svgHeight / 2
  const centerX = svgSize / 2
  const planetRadius = 40
  
  // Adjusted orbit radiuses for better distribution
  const innerOrbitRadius = 200
  const middleOrbitRadius = 300
  const outerOrbitRadius = 400

  
  // Updated planets with specific orbit assignments
  const planets = [
    { name: 'Sun', size: 2.0, color: '#FDB813', angle: 0, orbit: 'center' },
    { name: 'Mercury', size: 0.8, color: '#A0522D', angle: -60, orbit: 'inner' },
    { name: 'Venus', size: 1.0, color: '#E6B800', angle: -20, orbit: 'inner' },
    { name: 'Earth', size: 1.1, color: '#4B96AF', angle: 20, orbit: 'inner' },
    { name: 'Mars', size: 0.9, color: '#FF6B6B', angle: 60, orbit: 'middle' },
    { name: 'Jupiter', size: 1.6, color: '#E8B484', angle: -45, orbit: 'middle' },
    { name: 'Saturn', size: 1.5, color: '#F4D03F', angle: 45, orbit: 'middle' },
    { name: 'Uranus', size: 1.3, color: '#73C2FB', angle: -30, orbit: 'outer' },
    { name: 'Neptune', size: 1.3, color: '#4B70DD', angle: 30, orbit: 'outer' }
  ]

  // Updated calculate position function for three orbits
  const calculatePlanetPosition = (planet: typeof planets[0]) => {
    let x = centerX
    let y = center
    
    if (planet.orbit === 'inner') {
      const radians = (planet.angle * Math.PI) / 180
      x = centerX + innerOrbitRadius * Math.cos(radians)
      y = center + innerOrbitRadius * Math.sin(radians)
    } else if (planet.orbit === 'middle') {
      const radians = (planet.angle * Math.PI) / 180
      x = centerX + middleOrbitRadius * Math.cos(radians)
      y = center + middleOrbitRadius * Math.sin(radians)
    } else if (planet.orbit === 'outer') {
      const radians = (planet.angle * Math.PI) / 180
      x = centerX + outerOrbitRadius * Math.cos(radians)
      y = center + outerOrbitRadius * Math.sin(radians)
    }
    
    return { x, y }
  }

  // Enhanced orbit styles with single background
  const orbitsSection = (
    <defs>
      {/* Single dark astrological background */}
      <radialGradient id="space-bg" cx="50%" cy="50%" r="100%">
        <stop offset="0%" stopColor="#141729" />
        <stop offset="65%" stopColor="#0D0F1F" />
        <stop offset="100%" stopColor="#070817" />
      </radialGradient>

      {/* Brighter orbit gradient for better visibility */}
      <linearGradient id="orbit-line" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
      </linearGradient>

      {/* Enhanced planet gradients */}
      {planets.map((planet, i) => (
        <radialGradient
          key={`planet-gradient-${i}`}
          id={`planet-${i}`}
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor={planet.color} />
          <stop offset="100%" stopColor={adjustColor(planet.color, -20)} />
        </radialGradient>
      ))}
    </defs>
  )

  useEffect(() => {
    let frame: number
    let angle = 0
    const animate = () => {
      angle += 0.001 // Even slower rotation
      if (systemRef.current) {
        systemRef.current.style.transform = `rotate(${angle}deg)`
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        ref={systemRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgSize} ${svgHeight}`}
        className="block"
        preserveAspectRatio="xMidYMid meet"
      >
        {orbitsSection}

        {/* Single background */}
        <rect width={svgSize} height={svgHeight} fill="url(#space-bg)" />

        {/* Enhanced visible orbits */}
        <circle
          cx={centerX}
          cy={center}
          r={innerOrbitRadius}
          fill="none"
          stroke="url(#orbit-line)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={0.8}
        />
        <circle
          cx={centerX}
          cy={center}
          r={middleOrbitRadius}
          fill="none"
          stroke="url(#orbit-line)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={0.8}
        />
        <circle
          cx={centerX}
          cy={center}
          r={outerOrbitRadius}
          fill="none"
          stroke="url(#orbit-line)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity={0.8}
        />

        {/* Planets */}
        {planets.map((planet, index) => {
          const { x, y } = calculatePlanetPosition(planet)
          return (
            <g key={`planet-group-${index}`}>
              <circle
                cx={x}
                cy={y}
                r={planetRadius * planet.size + 8}
                fill={`url(#planet-${index})`}
                opacity={0.2}
                filter="blur(6px)"
              />
              <circle
                cx={x}
                cy={y}
                r={planetRadius * planet.size}
                fill={`url(#planet-${index})`}
                style={{
                  filter: `drop-shadow(0 0 8px ${planet.color}40)`,
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }}
                onClick={() => setActivePlanet(index)}
              />
              <text
                x={x}
                y={y + planetRadius * planet.size + 25}
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="500"
                opacity={0.9}
              >
                {planet.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default ChakraAnimation