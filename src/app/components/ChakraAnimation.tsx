'use client'
import React, { useEffect, useRef } from 'react'

const ChakraAnimation = () => {
  const systemRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG dimensions and positioning
  const svgSize = 900;
  const svgHeight = 700;
  const center = svgHeight / 2;
  const centerX = svgSize / 2;
  const planetRadius = 45;

  // Orbit radiuses
  const orbitRadiuses = [
    90,   // Mercury
    130,  // Venus
    170,  // Earth
    210,  // Mars
    250,  // Jupiter
    290,  // Saturn
    330,  // Uranus
    370   // Neptune
  ];

  // Planets data
  const planets = [
    { name: 'Sun', size: 1.8, color: '#FFE484', angle: 0, orbit: 'center' },
    { name: 'Mercury', size: 0.6, color: '#A67358', angle: 45, orbit: 0 },
    { name: 'Venus', size: 0.8, color: '#E39E54', angle: 90, orbit: 1 },
    { name: 'Earth', size: 0.9, color: '#7EAED9', angle: 135, orbit: 2 },
    { name: 'Mars', size: 0.7, color: '#D67762', angle: 180, orbit: 3 },
    { name: 'Jupiter', size: 1.4, color: '#E8B07F', angle: 225, orbit: 4 },
    { name: 'Saturn', size: 1.3, color: '#E8CC6F', angle: 270, orbit: 5 },
    { name: 'Uranus', size: 1.0, color: '#9BD4E4', angle: 315, orbit: 6 },
    { name: 'Neptune', size: 1.0, color: '#6081DE', angle: 360, orbit: 7 }
  ];

  // Calculate planet position
  const calculatePlanetPosition = (planet: typeof planets[0]) => {
    if (planet.orbit === 'center') return { x: centerX, y: center };
    
    const radius = orbitRadiuses[planet.orbit as number];
    const radians = (planet.angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians)
    };
  };

  // Orbit styles and gradients
  const orbitsSection = (
    <defs>
      {/* Minimalistic astrological background */}
      <radialGradient id="space-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#392C64" />
        <stop offset="45%" stopColor="#2E2150" />
        <stop offset="75%" stopColor="#251940" />
        <stop offset="90%" stopColor="#2A1B3D" />
        <stop offset="100%" stopColor="#2D1D3A" />
      </radialGradient>

      {/* Orbit line gradient */}
      <linearGradient id="orbit-line" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
      </linearGradient>

      {/* Mystical glow filter */}
      <filter id="mysticGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.6   
                  0 0 0 0 0.4
                  0 0 0 0 0.7  
                  0 0 0 0.8 0"
        />
      </filter>

      {/* Constellation pattern */}
      <pattern id="constellations" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <circle cx="60" cy="60" r="0.8" fill="#ffffff" opacity="0.3" />
        <circle cx="30" cy="30" r="0.5" fill="#ffffff" opacity="0.2" />
        <circle cx="90" cy="90" r="0.5" fill="#ffffff" opacity="0.2" />
      </pattern>
    </defs>
  );

  // Rotation animation
  useEffect(() => {
    let frame: number;
    let angle = 0;
    
    const animate = () => {
      angle += 0.1;
      if (systemRef.current) {
        systemRef.current.style.transform = `rotate(${angle}deg)`;
      }
      frame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center"
    >
      <svg
        ref={systemRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgSize} ${svgHeight}`}
        className="block max-w-xl"
        preserveAspectRatio="xMidYMid meet"
      >
        {orbitsSection}

        {/* Background */}
        <circle
          cx={centerX}
          cy={center}
          r={orbitRadiuses[7] + 40}
          fill="url(#space-bg)"
        />
        <circle
          cx={centerX}
          cy={center}
          r={orbitRadiuses[7] + 40}
          fill="url(#constellations)"
          opacity={0.4}
        />

        {/* Orbit circles */}
        {orbitRadiuses.map((radius: number, i: number) => (
          <circle
            key={`orbit-${i}`}
            cx={centerX}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#orbit-line)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity={0.7}
            filter="url(#mysticGlow)"
          />
        ))}

        {/* Planets */}
        {planets.map((planet, index: number) => {
          const { x, y } = calculatePlanetPosition(planet);
          return (
            <g key={`planet-group-${index}`}>
              <circle
                cx={x}
                cy={y}
                r={planetRadius * planet.size + 5}
                fill={planet.color}
                opacity={0.15}
                filter="blur(8px)"
              />
              <circle
                cx={x}
                cy={y}
                r={planetRadius * planet.size}
                fill={planet.color}
                opacity={0.9}
                style={{
                  filter: `drop-shadow(0 0 2px ${planet.color})`,
                  transition: 'all 0.3s ease'
                }}
              />
            </g>
          );
        })}

        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i: number) => (
          <circle
            key={`star-${i}`}
            cx={Math.random() * svgSize}
            cy={Math.random() * svgHeight}
            r={Math.random() * 1}
            fill="#ffffff"
            opacity={Math.random() * 0.5 + 0.25}
          />
        ))}
      </svg>
    </div>
  );
};

export default ChakraAnimation