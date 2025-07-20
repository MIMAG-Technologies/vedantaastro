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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-amber-200 rounded-full animate-ping"></div>
            </div>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Service Unavailable</h1>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">{error}</p>
              <button
                onClick={() => router.push('/services')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Return to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const service = serviceData.service

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50/20">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl transform translate-x-64 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl transform -translate-x-48 translate-y-24"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-amber-300/15 to-orange-300/15 rounded-full blur-2xl transform -translate-x-32 -translate-y-32"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => router.push('/services')}
            className="mb-12 group inline-flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-all duration-300 bg-white/70 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl hover:border-amber-200"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-semibold">Back to All Services</span>
          </motion.button>

          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Content Section - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Service Badge - More Prominent */}
              <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-amber-500/30">
                <Clock className="w-5 h-5 mr-3" />
                {service.service_type === 'ONE_ON_ONE' ? 'Personal Consultation' : 
                 service.service_type === 'GROUP' ? 'Group Experience' : 
                 service.service_type === 'ONLINE' ? 'Virtual Session' : 
                 service.service_type}
              </div>
              
              {/* Title with Enhanced Typography */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] mb-6 text-slate-900 tracking-tight">
                  {service.title}
                </h1>
                <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8"></div>
              </div>
              
              {/* Enhanced Description */}
              <div className="space-y-4">
                <p className="text-xl leading-relaxed text-slate-700 font-medium">
                  {service.description}
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                  Connect with certified astrologers who specialize in providing personalized guidance and insights tailored to your unique needs.
                </p>
              </div>

              {/* Enhanced Stats */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{service.astrologer_services?.length || 0}+</p>
                    <p className="text-sm text-slate-600 font-medium">Expert Astrologers</p>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-14 h-14 ${service.is_active ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {service.is_active ? 'Available Now' : 'Coming Soon'}
                    </p>
                    <p className="text-sm text-slate-600 font-medium">Service Status</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span>Book Consultation</span>
                </button>
                <button className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:border-amber-300 hover:text-amber-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3">
                  <Share2 className="w-5 h-5" />
                  <span>Share Service</span>
                </button>
              </div>
            </motion.div>

            {/* Enhanced Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="relative">
                {/* Main Image Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="relative h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    <img
                      src="/mockservice.jpeg"
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    
                    {/* Floating Info Card */}
                    
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Astrologers Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 mr-2" />
              Handpicked Experts
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Meet Your <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Perfect Match</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Our certified astrologers bring years of expertise in {service.title.toLowerCase()}, ready to guide you on your spiritual journey with personalized insights and wisdom.
            </p>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search by astrologer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg font-medium shadow-lg"
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Enhanced Astrologers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredAstrologers.map((astrologerService, index) => (
                <motion.div
                  key={astrologerService.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-amber-200 transform hover:-translate-y-2">
                    {/* Enhanced Astrologer Image */}
                    <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
                      <img
                        src={getImageUrl(astrologerService.astrologers.profile_image)}
                        alt={astrologerService.astrologers.full_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          Available Now
                        </div>
                      </div>

                      {/* Experience Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-2 rounded-xl text-xs font-bold shadow-lg border border-white/50">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {astrologerService.astrologers.experience_years} years exp.
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                          {astrologerService.astrologers.full_name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Specialized in providing deep insights through {service.title.toLowerCase()} with a personalized approach to spiritual guidance.
                        </p>
                      </div>

                      {/* Enhanced Rating */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(Number(astrologerService.astrologers.astrologer_ratings?.average_rating || 0))
                                    ? 'text-amber-400 fill-current'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-3 text-sm text-slate-600 font-medium">
                            ({astrologerService.astrologers.astrologer_ratings?.total_reviews || 0} reviews)
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Starting from</p>
                          <p className="text-xl font-bold text-amber-600">₹{Math.floor(Math.random() * 400) + 600}</p>
                        </div>
                      </div>

                      {/* Enhanced Book Button */}
                      <button
                        onClick={() => handleBookAstrologer(astrologerService.astrologers.id)}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-8 rounded-2xl font-bold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
                      >
                        Start Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Enhanced No Results */}
          {filteredAstrologers.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No astrologers found</h3>
              <p className="text-xl text-slate-600 mb-8">Try adjusting your search or explore all our available experts</p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300"
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