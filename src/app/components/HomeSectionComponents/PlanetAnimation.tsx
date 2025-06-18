/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef } from 'react';

interface PlanetAnimationProps {
  planetImage?: string;
  planetSize?: number;
  rotationSpeed?: number;
  containerClassName?: string; // New prop for custom container styling
  showBackground?: boolean; // New prop to control background elements
}

const PlanetAnimation: React.FC<PlanetAnimationProps> = ({
  planetImage = '/planets/EARTH.png',
  planetSize = 550,
  rotationSpeed = 0.8,
  containerClassName = "w-full h-screen", // Default full screen
  showBackground = true // Default show background
}) => {
  const planetRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame: number;
    let angle = 0;
    let shadowAngle = 0;
    let orbitAngle = 0;
    
    const animate = () => {
      // Smooth planet rotation
      angle += rotationSpeed * 0.2;
      
      // Dramatic shadow rotation
      shadowAngle += rotationSpeed * 0.1;
      
      // Orbital ring rotation
      orbitAngle += rotationSpeed * 0.05;
      
      if (planetRef.current) {
        planetRef.current.style.transform = `rotate(${angle}deg)`;
      }
      
      if (shadowRef.current) {
        shadowRef.current.style.transform = `rotate(${-shadowAngle}deg)`;
      }
      
      if (orbitRef.current) {
        orbitRef.current.style.transform = `rotate(${orbitAngle}deg)`;
      }
      
      frame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(frame);
  }, [rotationSpeed]);

  return (
    <div className={`${containerClassName} flex items-center justify-center overflow-hidden relative`}>
      {/* Deep space background - only show if showBackground is true */}
      {showBackground && (
        <>
          <div className="absolute inset-0">
            {/* Seductive star field */}
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 1.5 + 0.3 + 'px',
                  height: Math.random() * 1.5 + 0.3 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.6 + 0.2,
                  animation: `seductiveTwinkle ${Math.random() * 8 + 3}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 4}s`,
                  filter: `hue-rotate(${Math.random() * 60}deg)`
                }}
              />
            ))}
          </div>

          {/* Deep space ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(50, 100, 200, 0.05) 0%, transparent 60%)',
              filter: 'blur(40px)',
              animation: 'deepSpacePulse 15s infinite ease-in-out'
            }}
          />
        </>
      )}

      {/* Planet container */}
      <div className="relative flex items-center justify-center">
        
        {/* Sexy orbital rings */}
        <div
          ref={orbitRef}
          className="absolute rounded-full"
          style={{
            width: planetSize * 1.8,
            height: planetSize * 1.8,
            border: '1px solid rgba(255, 255, 255, 0.03)',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.05)',
          }}
        />
        
        <div
          className="absolute rounded-full"
          style={{
            width: planetSize * 2.2,
            height: planetSize * 2.2,
            border: '1px solid rgba(100, 200, 255, 0.08)',
            animation: 'pulseOrbit 12s infinite ease-in-out',
            boxShadow: '0 0 50px rgba(100, 200, 255, 0.1)',
          }}
        />

        {/* Main planet with mysterious shadow */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: planetSize,
            height: planetSize,
            filter: 'drop-shadow(0 0 80px rgba(100, 150, 255, 0.3))',
          }}
        >
          {/* Planet base */}
          <div
            ref={planetRef}
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background: `
                radial-gradient(
                  circle at 40% 30%, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  transparent 50%
                )
              `
            }}
          >
            <img
              src={planetImage}
              alt="Earth"
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(0.9) brightness(0.7) saturate(1.3)',
                opacity: 0.85,
                transform: 'scale(1.05)'
              }}
            />
          </div>

          {/* Dramatic rotating shadow overlay */}
          <div
            ref={shadowRef}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                conic-gradient(
                  from 0deg,
                  rgba(0, 0, 0, 0.9) 0deg,
                  rgba(0, 0, 0, 0.7) 60deg,
                  rgba(0, 0, 0, 0.3) 120deg,
                  transparent 180deg,
                  transparent 240deg,
                  rgba(0, 0, 0, 0.2) 300deg,
                  rgba(0, 0, 0, 0.8) 360deg
                )
              `,
              filter: 'blur(2px)',
              opacity: 0.8
            }}
          />

          {/* Atmospheric edge glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle, 
                  transparent 60%, 
                  rgba(100, 200, 255, 0.4) 85%, 
                  rgba(150, 220, 255, 0.6) 95%,
                  transparent 100%
                )
              `,
              filter: 'blur(3px)',
              animation: 'atmosphericPulse 6s infinite ease-in-out'
            }}
          />

          {/* Sexy highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(
                  ellipse 40% 60% at 35% 25%, 
                  rgba(255, 255, 255, 0.25) 0%, 
                  rgba(255, 255, 255, 0.1) 30%, 
                  transparent 70%
                )
              `,
              filter: 'blur(6px)',
              animation: 'seductiveShimmer 8s infinite ease-in-out'
            }}
          />
        </div>

        {/* Ambient light particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              width: '2px',
              height: '2px',
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 60}deg) translateY(-${planetSize * 0.9}px)`,
              animation: `floatParticle ${4 + i * 0.5}s infinite ease-in-out`,
              animationDelay: `${i * 0.3}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Sexy animation styles */}
      <style jsx>{`
        @keyframes seductiveTwinkle {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.5); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.5); 
          }
        }
        
        @keyframes atmosphericPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 0.9;
            transform: scale(1.02);
          }
        }
        
        @keyframes seductiveShimmer {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.1) rotate(5deg);
          }
        }
        
        @keyframes pulseOrbit {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.03) rotate(180deg);
          }
        }
        
        @keyframes floatParticle {
          0%, 100% { 
            opacity: 0.1;
            transform: rotate(var(--rotation)) translateY(-${planetSize * 0.9}px) scale(0.5);
          }
          50% { 
            opacity: 0.4;
            transform: rotate(var(--rotation)) translateY(-${planetSize * 0.95}px) scale(1.2);
          }
        }
        
        @keyframes deepSpacePulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default PlanetAnimation;