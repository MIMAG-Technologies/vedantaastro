/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/services/[id]/ServiceDetailClient.tsx
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, Users, Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react'
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
  // The 'showBooking' state is no longer needed since we're navigating to a new page.
  // We'll keep 'selectedAstrologer' for consistency if you need it for other logic later.
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

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/planets/services.jpg'
    if (imagePath.startsWith('http')) return imagePath
    return `${API_BASE_URL}/uploads/${imagePath}`
  }

  const handleBookAstrologer = (astrologerId: number) => {
    router.push(`/astrologer/${astrologerId}`); // Navigate to the new astrologer booking page
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  if (loading) {
    return (
      <div className="min-h-screen ">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600">Loading service details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !serviceData) {
    return (
      <div className="min-h-screen ">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Service Not Found</h1>
              <p className="text-slate-600 mb-6">{error}</p>
              <button
                onClick={() => router.push('/services')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const service = serviceData.service

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      
      {/* Hero Section - Modern Clean Design */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Beautiful Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl transform translate-x-48 -translate-y-24"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl transform -translate-x-32 translate-y-16"></div>
          <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-amber-300/10 to-orange-300/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push('/services')}
            className="mb-12 inline-flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-all duration-300 group bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200/50"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Services</span>
          </motion.button>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Main Content - Reduced to 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Service Type Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-amber-500/25">
                <Clock className="w-4 h-4 mr-2" />
                {service.service_type === 'ONE_ON_ONE' ? 'One-on-One Session' : 
                 service.service_type === 'GROUP' ? 'Group Session' : 
                 service.service_type === 'ONLINE' ? 'Online Service' : 
                 service.service_type}
              </div>
              
              {/* Main Title */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 text-slate-900">
                  {service.title}
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6"></div>
              </div>
              
              {/* Description */}
              <p className="text-lg leading-relaxed text-slate-600 font-light">
                {service.description}
              </p>

              {/* Action Buttons - After description */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
                <button className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-amber-300 hover:text-amber-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Stats Info - Simple and Clean */}
              <div className="flex items-center justify-between pt-6 pb-2 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{service.astrologer_services?.length || 0} Astrologers</p>
                    <p className="text-sm text-slate-500">Available for consultation</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${service.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm font-semibold ${service.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {service.is_active ? 'Service Active' : 'Service Inactive'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Image Section - Now takes up 3 columns for more space */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-3"
            >
              {/* Service Image Card - Much larger */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                  <img
                    src="/mockservice.jpeg"
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Astrologers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Expert <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Astrologers</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with our certified astrologers specializing in {service.title.toLowerCase()}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search astrologers by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </form>
          </motion.div>

          {/* Astrologers Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredAstrologers.map((astrologerService, index) => (
                <motion.div
                  key={astrologerService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-amber-200">
                    {/* Astrologer Image */}
                    <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-50">
                      <img
                        src={getImageUrl(astrologerService.astrologers.profile_image)}
                        alt={astrologerService.astrologers.full_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                            {astrologerService.astrologers.full_name}
                          </h3>
                          <div className="flex items-center text-slate-600 mb-3">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{astrologerService.astrologers.experience_years} years experience</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
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
                        </div>
                        <span className="ml-2 text-sm text-slate-600">
                          ({astrologerService.astrologers.astrologer_ratings?.total_reviews || 0} reviews)
                        </span>
                      </div>

                      {/* Book Button */}
                      <button
                        onClick={() => handleBookAstrologer(astrologerService.astrologers.id)}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredAstrologers.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No astrologers found</h3>
              <p className="text-slate-600">Try adjusting your search query</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking Modal - REMOVED since we are navigating to a new page */}
    </div>
  )
}