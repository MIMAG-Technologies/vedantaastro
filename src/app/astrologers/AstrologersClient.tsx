/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaStar, 
  FaUserFriends, 
  FaGlobe, 
  FaClock, 
  FaVenusMars, 
  FaRedo,
  FaSortAmountDown,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa'
import { MdVerified, MdTrendingUp } from 'react-icons/md'
import Navbar from '../components/Navbar'
import AstrologerCard from '../components/HomeCards/AstrologerCard'
import { getAllAstrologers, AstrologerListItem } from '../utils/fetchAllAstrologers'

export default function AstrologersClient() {
  const router = useRouter()
  
  const [astrologers, setAstrologers] = useState<AstrologerListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Rating (High to Low)')
  
  // Expandable sections state
  const [showMoreLanguages, setShowMoreLanguages] = useState(false)

  // Available filter options
  const languageOptions = ['Hindi', 'English', 'Marathi', 'Telugu', 'Tamil', 'Bengali', 'Gujarati', 'Punjabi', 'Malayalam', 'Kannada']
  const experienceOptions = ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '15+ years']
  const genderOptions = ['Male', 'Female']
  const ratingOptions = ['4.5+', '4.0+', '3.5+', '3.0+']
  const sortOptions = ['Rating (High to Low)', 'Rating (Low to High)', 'Experience (High to Low)', 'Experience (Low to High)']

  // Gradient combinations for profile avatars
  const gradientCombinations = [
    { from: 'from-indigo-600', to: 'to-purple-600' },
    { from: 'from-teal-600', to: 'to-emerald-600' },
    { from: 'from-purple-600', to: 'to-pink-600' },
    { from: 'from-orange-600', to: 'to-red-600' },
    { from: 'from-blue-600', to: 'to-indigo-600' },
    { from: 'from-green-600', to: 'to-teal-600' },
    { from: 'from-rose-600', to: 'to-purple-600' },
    { from: 'from-amber-600', to: 'to-orange-600' }
  ]

  useEffect(() => {
    fetchAstrologers()
  }, [])

  const fetchAstrologers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getAllAstrologers({
        page: 1,
        query: searchQuery || undefined,
        is_active: true
      })
      
      setAstrologers(response.data)
    } catch (err) {
      setError('Failed to load astrologers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchAstrologers()
  }

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    switch (filterType) {
      case 'language':
        setSelectedLanguages(prev => 
          isChecked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
      case 'experience':
        setSelectedExperience(prev => 
          isChecked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
      case 'gender':
        setSelectedGender(prev => 
          isChecked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
      case 'rating':
        setSelectedRating(prev => 
          isChecked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
    }
  }

  const resetAllFilters = () => {
    setSelectedLanguages([])
    setSelectedExperience([])
    setSelectedGender([])
    setSelectedRating([])
    setSearchQuery('')
  }

  const getExperienceCategory = (years: number) => {
    if (years <= 2) return '0-2 years'
    if (years <= 5) return '3-5 years'
    if (years <= 10) return '6-10 years'
    if (years <= 15) return '11-15 years'
    return '15+ years'
  }

  const filteredAstrologers = astrologers.filter(astrologer => {
    // Search filter
    if (searchQuery && !astrologer.full_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Language filter
    if (selectedLanguages.length > 0 && !selectedLanguages.some(lang => astrologer.languages.includes(lang))) {
      return false
    }

    // Experience filter
    if (selectedExperience.length > 0 && !selectedExperience.includes(getExperienceCategory(astrologer.experience_years))) {
      return false
    }

    // Gender filter
    if (selectedGender.length > 0 && !selectedGender.includes(astrologer.gender)) {
      return false
    }

    // Rating filter
    if (selectedRating.length > 0) {
      const rating = parseFloat(astrologer.astrologer_ratings.average_rating)
      const matchesRating = selectedRating.some(filterRating => {
        const minRating = parseFloat(filterRating.replace('+', ''))
        return rating >= minRating
      })
      if (!matchesRating) return false
    }

    return true
  })

  const sortedAstrologers = [...filteredAstrologers].sort((a, b) => {
    switch (sortBy) {
      case 'Rating (High to Low)':
        return parseFloat(b.astrologer_ratings.average_rating) - parseFloat(a.astrologer_ratings.average_rating)
      case 'Rating (Low to High)':
        return parseFloat(a.astrologer_ratings.average_rating) - parseFloat(b.astrologer_ratings.average_rating)
      case 'Experience (High to Low)':
        return b.experience_years - a.experience_years
      case 'Experience (Low to High)':
        return a.experience_years - b.experience_years
      default:
        return parseFloat(b.astrologer_ratings.average_rating) - parseFloat(a.astrologer_ratings.average_rating)
    }
  })

  const FilterCheckbox = ({ label, checked, onChange, icon: Icon }: { 
    label: string, 
    checked: boolean, 
    onChange: (checked: boolean) => void,
    icon?: any 
  }) => (
    <label className="flex items-center space-x-3 cursor-pointer hover:bg-amber-50/50 p-3 rounded-xl transition-all duration-200 group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500 focus:ring-2 transition-all"
      />
      <div className="flex items-center space-x-2 flex-1">
        {Icon && <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />}
        <span className="text-sm text-slate-700 font-medium">{label}</span>
      </div>
    </label>
  )

  // Convert API data to AstrologerCard props format
  const convertToCardProps = (astrologer: AstrologerListItem, index: number) => {
    const gradient = gradientCombinations[index % gradientCombinations.length]
    const initials = astrologer.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    
    // Create specializations from bio or default ones
    const defaultSpecializations = ['Vedic', 'Palmistry', 'Numerology', 'Tarot', 'Vastu', 'Remedies']
    const specializations = defaultSpecializations.slice(0, 3)

    return {
      id: astrologer.id.toString(),
      name: astrologer.full_name,
      experience: `${astrologer.experience_years}+ Years Experience`,
      rating: parseFloat(astrologer.astrologer_ratings.average_rating),
      totalRatings: Math.min(astrologer.astrologer_ratings.total_reviews, 5),
      specializations,
      isOnline: astrologer.is_active && Math.random() > 0.3,
      avatar: astrologer.profile_image || undefined,
      initials,
      gradientFrom: gradient.from,
      gradientTo: gradient.to
    }
  }

  // Event handlers for astrologer actions
  const handleChatClick = (id: string) => {
    router.push(`/astrologer/${id}`)
  }

  const handleCallClick = (id: string) => {
    router.push(`/astrologer/${id}`)
  }

  const handleNotifyClick = (id: string) => {
    router.push(`/astrologer/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <Navbar />
      
      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-100/15 to-teal-100/15 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MdVerified className="w-4 h-4 mr-2" />
            Verified Experts
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-slate-800">Find Your Perfect </span>
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Astrologer
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Connect with certified astrologers who specialize in personalized guidance and spiritual solutions
          </p>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaUserFriends className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-800">Expert Results</h2>
            </div>
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              {sortedAstrologers.length} experts found
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <FaSortAmountDown className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white/80 backdrop-blur-sm font-medium text-sm"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-6 h-fit sticky top-28"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <FaFilter className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-800">Filters</h2>
              </div>
              <button 
                onClick={resetAllFilters}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 text-sm font-medium rounded-lg px-3 py-2 transition-all duration-200"
              >
                <FaRedo className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search experts by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-white/50 backdrop-blur-sm transition-all text-sm"
                />
              </div>
            </div>

            {/* Languages Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <FaGlobe className="w-4 h-4 text-amber-500 mr-2" />
                Languages
              </h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {languageOptions.slice(0, showMoreLanguages ? languageOptions.length : 5).map(language => (
                  <FilterCheckbox
                    key={language}
                    label={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={(checked) => handleFilterChange('language', language, checked)}
                  />
                ))}
                {languageOptions.length > 5 && (
                  <button
                    onClick={() => setShowMoreLanguages(!showMoreLanguages)}
                    className="text-amber-600 text-sm hover:text-amber-700 font-medium flex items-center space-x-2 pl-3 pt-2 transition-colors"
                  >
                    <span>View {showMoreLanguages ? 'less' : `more (${languageOptions.length - 5} more)`}</span>
                    <FaTimes className={`w-3 h-3 transition-transform ${showMoreLanguages ? 'rotate-45' : ''}`} />
                  </button>
                )}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <FaClock className="w-4 h-4 text-amber-500 mr-2" />
                Experience
              </h3>
              <div className="space-y-1">
                {experienceOptions.map(exp => (
                  <FilterCheckbox
                    key={exp}
                    label={exp}
                    checked={selectedExperience.includes(exp)}
                    onChange={(checked) => handleFilterChange('experience', exp, checked)}
                  />
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <FaVenusMars className="w-4 h-4 text-amber-500 mr-2" />
                Gender
              </h3>
              <div className="space-y-1">
                {genderOptions.map(gender => (
                  <FilterCheckbox
                    key={gender}
                    label={gender}
                    checked={selectedGender.includes(gender)}
                    onChange={(checked) => handleFilterChange('gender', gender, checked)}
                  />
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <FaStar className="w-4 h-4 text-amber-500 mr-2" />
                Rating
              </h3>
              <div className="space-y-1">
                {ratingOptions.map(rating => (
                  <FilterCheckbox
                    key={rating}
                    label={`${rating} stars`}
                    checked={selectedRating.includes(rating)}
                    onChange={(checked) => handleFilterChange('rating', rating, checked)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center py-20"
              >
                <div className="flex flex-col items-center space-y-4">
                  <FaSpinner className="w-8 h-8 text-amber-500 animate-spin" />
                  <p className="text-slate-600 font-medium">Loading experts...</p>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                  <FaExclamationTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Experts</h3>
                  <p className="text-red-600 mb-6">{error}</p>
                  <button 
                    onClick={fetchAstrologers}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Astrologers Grid */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {sortedAstrologers.map((astrologer, index) => (
                    <motion.div
                      key={astrologer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <AstrologerCard
                        {...convertToCardProps(astrologer, index)}
                        onChatClick={handleChatClick}
                        onCallClick={handleCallClick}
                        onNotifyClick={handleNotifyClick}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* No Results */}
            {!loading && !error && sortedAstrologers.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 max-w-md mx-auto">
                  <FaSearch className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No Experts Found</h3>
                  <p className="text-slate-600 mb-6">Try adjusting your filters or search criteria</p>
                  <button 
                    onClick={resetAllFilters}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}