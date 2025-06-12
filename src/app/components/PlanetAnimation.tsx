/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef } from 'react';

interface PlanetAnimationProps {
  planetImage?: string;
  planetSize?: number;
  rotationSpeed?: number;
}

const PlanetAnimation: React.FC<PlanetAnimationProps> = ({
  planetImage = '/planets/EARTH.png',
  planetSize = 500,
  rotationSpeed = 0.8
}) => {
  const planetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame: number;
    let angle = 0;
    let scale = 1;
    let growing = true;
    let floatY = 0;
    let floatDirection = 1;
    let wobbleX = 0;
    
    const animate = () => {
      // Smooth rotation
      angle += rotationSpeed;
      
      // Enhanced floating with gentle wobble
      floatY += 0.015 * floatDirection;
      wobbleX = Math.sin(angle * 0.5) * 1.5; // Subtle side-to-side wobble
      
      if (floatY > 3) floatDirection = -1;
      if (floatY < -3) floatDirection = 1;
      
      // Very gentle breathing effect
      if (growing) {
        scale += 0.0002;
        if (scale >= 1.02) growing = false;
      } else {
        scale -= 0.0002;
        if (scale <= 0.99) growing = true;
      }
      
      if (planetRef.current) {
        planetRef.current.style.transform = `
          rotate(${angle}deg)
          scale(${scale})
          translate(${wobbleX}px, ${floatY}px)
        `;
      }
      frame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(frame);
  }, [rotationSpeed]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Clean space background */}
        <div className="absolute inset-0 bg-gradient-radial from-black via-[#0a0a0a] to-black">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 1.2 + 0.5 + 'px',
                height: Math.random() * 1.2 + 0.5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.3 + 0.1,
                animation: `twinkle ${Math.random() * 4 + 3}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Planet container with enhanced effects */}
        <div
          ref={planetRef}
          className="relative transition-transform duration-1000 ease-out"
          style={{
            width: planetSize,
            height: planetSize,
          }}
        >
          {/* Energy ring effect - moved closer */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transform: 'scale(1.03)',
              animation: 'rotateRing 15s linear infinite'
            }}
          />
          
          {/* Second energy ring - even closer */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transform: 'scale(1.015)',
              animation: 'rotateRing 12s linear infinite reverse'
            }}
          />
          
          {/* Planet core with dynamic glow */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              boxShadow: '0 0 80px rgba(255, 255, 255, 0.08)',
              animation: 'pulseGlow 6s infinite ease-in-out'
            }}
          >
            <img
              src={planetImage}
              alt="Planet"
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.1) brightness(1.05)',
                animation: 'subtleHue 20s infinite linear'
              }}
            />
          </div>

          {/* Enhanced atmospheric layers */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(15px)',
              animation: 'pulseAtmosphere 8s infinite ease-in-out',
              opacity: 0.2
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
              filter: 'blur(20px)',
              animation: 'pulseAtmosphere 12s infinite ease-in-out reverse',
              opacity: 0.15
            }}
          />
          
          {/* Energy particles - adjusted for closer orbit */}
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: '1.5px',
                  height: '1.5px',
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-${planetSize * 0.52}px)`,
                  opacity: 0.2,
                  animation: `pulseParticle ${2.5 + i * 0.3}s infinite ease-in-out`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle ambient light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'pulseAmbient 10s infinite ease-in-out'
          }}
        />
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes pulseAtmosphere {
          0%, 100% { 
            opacity: 0.15; 
            transform: scale(1) rotate(0deg);
            filter: blur(15px) brightness(1);
          }
          50% { 
            opacity: 0.25; 
            transform: scale(1.05) rotate(180deg);
            filter: blur(20px) brightness(1.2);
          }
        }
        @keyframes pulseAmbient {
          0%, 100% { opacity: 0.01; transform: scale(1); }
          50% { opacity: 0.03; transform: scale(1.05); }
        }
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 80px rgba(255, 255, 255, 0.08);
            filter: brightness(1);
          }
          50% { 
            box-shadow: 0 0 100px rgba(255, 255, 255, 0.12);
            filter: brightness(1.1);
          }
        }
        @keyframes subtleHue {
          0% { filter: hue-rotate(0deg) contrast(1.1) brightness(1.05); }
          50% { filter: hue-rotate(1deg) contrast(1.1) brightness(1.05); }
          100% { filter: hue-rotate(0deg) contrast(1.1) brightness(1.05); }
        }
        @keyframes rotateRing {
          0% { transform: scale(1.03) rotate(0deg); }
          100% { transform: scale(1.03) rotate(360deg); }
        }
        @keyframes pulseParticle {
          0%, 100% { 
            opacity: 0.1;
            transform: rotate(var(--rotation)) translateY(-${planetSize * 0.52}px) scale(1);
          }
          50% { 
            opacity: 0.3;
            transform: rotate(var(--rotation)) translateY(-${planetSize * 0.54}px) scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};

export default PlanetAnimation; 