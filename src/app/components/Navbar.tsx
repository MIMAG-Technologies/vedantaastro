/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Blogs', href: '/blogs' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { user, me, logout } = useAuth()

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
      ticking = false;
    }
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine if we're on a page with a hero section
  const hasHero = ['/', '/services', '/about'].includes(pathname);

  // Determine text color based on whether navbar is fixed or on a page with hero
  const getTextColor = () => {
    if (isFixed) {
      return 'text-gray-700 hover:text-amber-600';
    }
    return 'text-white hover:text-amber-400';
  }

  // Determine active link color
  const getActiveColor = () => {
    if (isFixed) {
      return 'text-amber-600';
    }
    return 'text-amber-400';
  }

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header 
      className={`w-full z-50 transition-all duration-200 ${
        isFixed 
          ? 'fixed top-0 bg-white/95 shadow-md backdrop-blur-md' 
          : 'absolute bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Image and Text */}
          <Link href="/" className="flex items-center gap-2">
            {/* Logo Image */}
            <div className="h-10 w-10 ml-6 relative">
              <img
                src="/planets/vedanta.png" 
                alt="Vedanta Astro"
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            
            {/* Logo Text with gradient */}
            <span className={`text-xl font-bold ${
              isFixed 
                ? 'bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent' 
                : 'text-amber-300'
            }`}>
              Vedanta Astro
            </span>
          </Link>

          {/* Spacer to push navigation links to the end */}
          <div className="flex-grow"></div>

          {/* Desktop Navigation - moved to the end with better spacing */}
          <nav className="hidden md:flex items-center justify-end space-x-6">
            {/* Links with dynamic text color */}
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href 
                    ? getActiveColor()
                    : getTextColor()
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Contact Button with consistent theme */}
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Contact
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isFixed 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    {me?.personalInfo?.profileImage ? (
                      <img
                        src={me.personalInfo.profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {me?.personalInfo?.name || user.displayName || 'Profile'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button with dynamic color */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-2 rounded-lg ${isFixed ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col space-y-2 py-3">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`py-2 px-3 rounded-lg text-sm font-medium ${
                    pathname === link.href 
                      ? 'bg-amber-50 text-amber-600' 
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium text-center mt-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Auth Section */}
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center py-2 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 px-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium text-center mt-2 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar