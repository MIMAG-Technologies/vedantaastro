'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ChakraAnimation = () => {
  const [activePlanet, setActivePlanet] = useState(0)
  const systemRef = useRef(null);
  const svgSize = 520;
  const center = svgSize / 2;
  const planetRadius = 32;
  const numPlanets = 8;
  const numOrbits = 9;
  const minOrbit = 60;
  const orbitGap = 42;

  // Harmonious, soft pastel gradients for planets
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
  ];

  // Animate rotation
  useEffect(() => {
    let frame: number;
    let angle = 0;
    const animate = () => {
      angle += 0.008;
      if (systemRef.current) {
        (systemRef.current as SVGElement).style.transform = `rotate(${angle}deg)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={systemRef}
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      className="block"
      preserveAspectRatio="xMidYMid meet"
      style={{ background: '#18181b', borderRadius: '50%' }}
    >
      <defs>
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
      </defs>
      {/* Orbits */}
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
        />
      ))}
      {/* Sun glow */}
      <circle
        cx={center}
        cy={center}
        r={planetRadius + 18}
        fill="url(#sun-glow)"
      />
      {/* Sun */}
      <circle
        cx={center}
        cy={center}
        r={planetRadius}
        fill="url(#planet-gradient-0)"
        style={{ filter: 'brightness(1.08)' }}
      />
      {/* Planets */}
      {[...Array(numPlanets)].map((_, index) => {
        const angle = index * (Math.PI * 2 / numPlanets) - Math.PI / 2;
        const orbit = minOrbit + (index + 1) * orbitGap;
        const x = center + Math.cos(angle) * orbit;
        const y = center + Math.sin(angle) * orbit;
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
          />
        );
      })}
    </svg>
  )
}

export default ChakraAnimation