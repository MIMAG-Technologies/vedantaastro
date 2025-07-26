/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/services/[id]/ServiceDetailClient.tsx
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, Users, Clock, Calendar, ArrowLeft, Share2, MapPin, Award, CheckCircle, Phone, Video, MessageCircle } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { getOneService } from '../../utils/oneservice'
import { OneServiceResponse } from '@/app/types/oneservice'

interface ServiceDetailClientProps {
  serviceId: string
}

export default function ServiceDetailClient({ serviceId }: ServiceDetailClientProps) {
  const router = useRouter()
  const serviceIdNum = Number(serviceId)

  const [serviceData, setServiceData] = useState<OneServiceResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAstrologer, setSelectedAstrologer] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredAstrologers, setFilteredAstrologers] = useState<any[]>([])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true)
        const response = await getOneService(serviceIdNum)
        if (response) {
          setServiceData(response)
          setFilteredAstrologers(response.service.astrologer_services || [])
        } else {
          setError('Service not found')
        }
       
      } catch (err) {
        setError('Failed to load service. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (serviceIdNum) {
      fetchServiceData()
    }
  }, [serviceIdNum])

  useEffect(() => {
    if (serviceData?.service.astrologer_services) {
      const filtered = serviceData.service.astrologer_services.filter(astrologerService =>
        astrologerService.astrologers.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredAstrologers(filtered)
    }
  }, [searchQuery, serviceData])

  // Add this useEffect to handle navbar scroll behavior for this page only
  useEffect(() => {
    // Override navbar scroll behavior for this page
    document.body.style.setProperty('--navbar-scroll-behavior', 'disabled')
    
    return () => {
      // Clean up when leaving the page
      document.body.style.removeProperty('--navbar-scroll-behavior')
    }
  }, [])

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/planets/services.jpg'
    if (imagePath.startsWith('http')) return imagePath
    return `${API_BASE_URL}/uploads/${imagePath}`
  }

  const handleBookAstrologer = (astrologerId: number) => {
    router.push(`/astrologer/${astrologerId}`);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-slate-700 text-lg font-medium mb-2">Discovering your perfect astrologer...</p>
              <p className="text-slate-500 text-sm">This will just take a moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !serviceData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Service Unavailable</h1>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">{error}</p>
            <button
              onClick={() => router.push('/services')}
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Return to Services
            </button>
          </div>
        </div>
      </div>
    )
  }

  const service = serviceData.service

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

    {/* HERO SECTION */}
    <section className="pt-24 pb-20 bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16 px-6">
          {/* LEFT SIDE - Service Info */}
          <div className="flex-1 w-full py-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100/50 p-8 hover:shadow-xl transition-all duration-500">
              <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-sm">
                <Clock className="w-4 h-4 mr-2" />
                {service.service_type === 'ONE_ON_ONE' ? 'Personal Consultation' : 
                  service.service_type === 'GROUP' ? 'Group Experience' : 
                  service.service_type === 'ONLINE' ? 'Virtual Session' : 
                  service.service_type}
              </div>
              <h1 className="text-5xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {service.title}
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                {service.description}
              </p>
              
              {/* Stats Boxes */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl shadow-md border border-amber-100/50 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{service.astrologer_services?.length || 0}+</div>
                  <div className="text-sm font-medium text-slate-600">Astrologers Available</div>
                </div>
                <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-md border border-green-100/50 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`text-xl font-bold mb-2 ${service.is_active ? 'text-green-600' : 'text-red-500'}`}>
                    {service.is_active ? 'Available' : 'Coming Soon'}
                  </div>
                  <div className="text-sm font-medium text-slate-600">Status</div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50/30 rounded-2xl shadow-md border border-slate-100/50 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-slate-700 mb-2">4.9</div>
                  <div className="text-sm font-medium text-slate-600">Avg. Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Image and Buttons */}
          <div className="flex-shrink-0 w-full lg:w-96 py-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100/50 p-6 hover:shadow-xl transition-all duration-500">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white mb-8 group">
                <img
                  src="/mockservice.jpeg"
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col gap-4">
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Book Now
                </button>
                <button className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 px-6 rounded-xl font-semibold hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50/50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <Share2 className="w-5 h-5 inline mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASTROLOGERS SECTION */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Meet Your Perfect Astrologer
            </h2>
            <p className="text-lg text-slate-600">
              Our certified astrologers bring years of expertise in {service.title.toLowerCase()}, ready to guide you on your spiritual journey.
            </p>
          </div>
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search astrologers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 bg-white"
              />
            </form>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredAstrologers.map((astrologerService, index) => (
                <motion.div
                  key={astrologerService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-amber-200">
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={getImageUrl(astrologerService.astrologers.profile_image)}
                        alt={astrologerService.astrologers.full_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Available
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {astrologerService.astrologers.full_name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Specialized in {service.title.toLowerCase()} with personalized spiritual guidance.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(Number(astrologerService.astrologers.astrologer_ratings?.average_rating || 0))
                                  ? 'text-amber-400 fill-current'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-slate-500">
                            ({astrologerService.astrologers.astrologer_ratings?.total_reviews || 0})
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Starting from</p>
                          <p className="text-lg font-semibold text-amber-600">₹{Math.floor(Math.random() * 400) + 600}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookAstrologer(astrologerService.astrologers.id)}
                        className="w-full bg-amber-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-amber-600 transition-colors duration-300"
                      >
                        Start Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filteredAstrologers.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">No astrologers found</h3>
              <p className="text-slate-600 mb-8">Try adjusting your search or explore all our available experts</p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-amber-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-amber-600 transition-colors duration-300"
              >
                Show All Astrologers
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}