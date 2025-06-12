/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef } from 'react';

const VedantaAstro = () => {
  const systemRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // SVG dimensions and positioning
  const svgSize = 1250;
  const svgHeight = 700;
  const center = svgHeight / 2;
  const centerX = svgSize / 2;
  const planetRadius = 60;

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

  // Planets data with correct /plantes/ paths
  const planets = [
    { 
      name: 'Sun', 
      size: 1.8, 
      color: '#FF8C00', 
      glowColor: '#FFA500',
      angle: 0, 
      orbit: 'center' as const, 
      image: '/planets/SUN.png'
    },
    { 
      name: 'Mercury', 
      size: 0.6, 
      color: '#D2691E', 
      glowColor: '#FF7F50',
      angle: 45, 
      orbit: 0, 
      image: '/planets/MERCURY.png'
    },
    { 
      name: 'Venus', 
      size: 0.8, 
      color: '#E39E54', 
      glowColor: '#FFB347',
      angle: 90, 
      orbit: 1, 
      image: '/planets/VENUS.png'
    },
    { 
      name: 'Earth', 
      size: 0.9, 
      color: '#7EAED9', 
      glowColor: '#87CEEB',
      angle: 135, 
      orbit: 2, 
      image: '/planets/EARTH.png'
    },
    { 
      name: 'Mars', 
      size: 0.7, 
      color: '#D67762', 
      glowColor: '#FF6347',
      angle: 180, 
      orbit: 3, 
      image: '/planets/MARS.png'
    },
    { 
      name: 'Jupiter', 
      size: 1.4, 
      color: '#E8B07F', 
      glowColor: '#DEB887',
      angle: 225, 
      orbit: 4, 
      image: '/planets/JUPYTER.png'
    },
    { 
      name: 'Saturn', 
      size: 1.5, 
      color: '#E8CC6F', 
      glowColor: '#F0E68C',
      angle: 270, 
      orbit: 5, 
      image: '/planets/SATURN.png'
    },
    { 
      name: 'Uranus', 
      size: 1.0, 
      color: '#9BD4E4', 
      glowColor: '#B0E0E6',
      angle: 315, 
      orbit: 6, 
      image: '/planets/URANUS.png'
    },
    { 
      name: 'Neptune', 
      size: 1.0, 
      color: '#6081DE', 
      glowColor: '#7B68EE',
      angle: 360, 
      orbit: 7, 
      image: '/planets/NEPTUNE.png'
    }
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

  // Enhanced orbit styles matching your project theme
  const orbitsSection = (
    <defs>
      {/* Orangish gradient background for chakra theme */}
      <radialGradient id="space-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000000" />
        <stop offset="25%" stopColor="#1a0f0a" />
        <stop offset="50%" stopColor="#2d1810" />
        <stop offset="75%" stopColor="#1a0f0a" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>

      {/* Enhanced orangish orbit lines */}
      <linearGradient id="orbit-line" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#FFA500" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.3" />
      </linearGradient>

      {/* Subtle glow filter */}
      <filter id="mysticGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0   
                  0.9 1 0 0 0
                  0 0.3 1 0 0  
                  0 0 0 0.7 0"
        />
      </filter>

      {/* Orangish star pattern for chakra theme */}
      <pattern id="constellations" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
        <circle cx="100" cy="100" r="1.2" fill="#FF8C00" opacity="0.4" />
        <circle cx="50" cy="50" r="0.8" fill="#FFA500" opacity="0.3" />
        <circle cx="150" cy="60" r="0.9" fill="#FFB347" opacity="0.35" />
        <circle cx="60" cy="150" r="0.7" fill="#FF7F50" opacity="0.25" />
        <circle cx="140" cy="140" r="0.6" fill="#D2691E" opacity="0.2" />
      </pattern>
    </defs>
  );

  // Smooth rotation animation
  useEffect(() => {
    let frame: number;
    let angle = 0;
    
    const animate = () => {
      angle += 0.08; 
      if (systemRef.current) {
        systemRef.current.style.transform = `rotate(${angle}deg)`;
      }
      frame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Chakra Title */}
      
      
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          ref={systemRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgSize} ${svgHeight}`}
          className="block max-w-full max-h-full"
          preserveAspectRatio="xMidYMid meet"
        >
            {orbitsSection}

            {/* Background matching your black theme */}
            <circle
              cx={centerX}
              cy={center}
              r={orbitRadiuses[7] + 60}
              fill="url(#space-bg)"
            />
            <circle
              cx={centerX}
              cy={center}
              r={orbitRadiuses[7] + 60}
              fill="url(#constellations)"
              opacity={0.4}
            />

            {/* Elegant orbit circles */}
            {orbitRadiuses.map((radius, i) => (
              <circle
                key={`orbit-${i}`}
                cx={centerX}
                cy={center}
                r={radius}
                fill="none"
                stroke="url(#orbit-line)"
                strokeWidth="1"
                strokeDasharray="8 6"
                opacity={0.5}
                filter="url(#mysticGlow)"
              />
            ))}

            {/* Planets - Real Images Only */}
            {planets.map((planet, index: number) => {
              const { x, y } = calculatePlanetPosition(planet);
              const planetSize = planetRadius * planet.size;
              return (
                <foreignObject
                  key={`planet-${index}`}
                  x={x - planetSize}
                  y={y - planetSize}
                  width={planetSize * 2}
                  height={planetSize * 2}
                >
                  <div
                    style={{
                      width: planetSize * 2,
                      height: planetSize * 2,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: 'transparent'
                    }}
                  >
                    <img
                      src={planet.image}
                      alt={planet.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onLoad={() => console.log(`${planet.name} image loaded successfully`)}
                      onError={(e) => {
                        console.error(`Failed to load ${planet.name} image:`, planet.image);
                        const target = e.target as HTMLImageElement;
                        target.alt = `${planet.name} (image not found)`;
                      }}
                    />
                  </div>
                </foreignObject>
              );
            })}

            {/* Enhanced stars with orangish theme */}
            {Array.from({ length: 60 }).map((_, i: number) => {
              const colors = ['#FF8C00', '#FFA500', '#FFB347', '#FF7F50', '#D2691E'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              return (
                <circle
                  key={`star-${i}`}
                  cx={Math.random() * svgSize}
                  cy={Math.random() * svgHeight}
                  r={Math.random() * 1.2 + 0.4}
                  fill={randomColor}
                  opacity={Math.random() * 0.7 + 0.2}
                  style={{
                    filter: `drop-shadow(0 0 2px ${randomColor})`,
                    animation: `warmTwinkle ${2 + Math.random() * 4}s infinite ease-in-out`
                  }}
                />
              );
            })}
          </svg>

          {/* Warm orangish animation theme */}
          <style jsx>{`
            @keyframes warmTwinkle {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.8; }
            }
          `}</style>
        </div>
    </div>
  );
};

export default VedantaAstro;