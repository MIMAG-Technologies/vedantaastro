'use client'


import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const vh = window.innerHeight / 2 // 50vh
      setScrolled(window.scrollY > vh)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out 
      ${scrolled 
        ? 'bg-black/90 backdrop-blur-2xl shadow-2xl border-b border-gray-800/50' 
        : 'bg-transparent backdrop-blur-none border-b border-transparent'}`}>
      
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 absolute left-15">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/planets/vedanta.png"
                alt="VedantaAstro Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                VedantaAstro
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 
                  transition-all duration-300 font-medium backdrop-blur-sm"
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className={`ml-8 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 
                text-black rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/25 font-medium backdrop-blur-sm
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-2 border border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors duration-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/contact"
                className={`block w-full mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 
                  text-black rounded-xl transition-all duration-300 shadow-lg font-medium text-center
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
