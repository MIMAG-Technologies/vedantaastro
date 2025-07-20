/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
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

  const FilterCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
    <label className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-50/30 p-2 rounded-xl transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
      />
      <span className="text-sm text-slate-700 flex-1">{label}</span>
    </label>
  )

  // Convert API data to AstrologerCard props format
  const convertToCardProps = (astrologer: AstrologerListItem, index: number) => {
    const gradient = gradientCombinations[index % gradientCombinations.length]
    const initials = astrologer.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    
    // Create specializations from bio or default ones
    const defaultSpecializations = ['Vedic', 'Palmistry', 'Numerology', 'Tarot', 'Vastu', 'Remedies']
    const specializations = defaultSpecializations.slice(0, 3) // Take first 3 as default

    return {
      id: astrologer.id.toString(),
      name: astrologer.full_name,
      experience: `${astrologer.experience_years}+ Years Experience`,
      rating: parseFloat(astrologer.astrologer_ratings.average_rating),
      totalRatings: Math.min(astrologer.astrologer_ratings.total_reviews, 5), // Cap at 5 for display
      specializations,
      isOnline: astrologer.is_active && Math.random() > 0.3, // Random online status, you can modify this based on actual data
      avatar: astrologer.profile_image || undefined,
      initials,
      gradientFrom: gradient.from,
      gradientTo: gradient.to
    }
  }

  // Event handlers for astrologer actions
  const handleChatClick = (id: string) => {
    console.log(`Starting chat with astrologer ${id}`)
    router.push(`/astrologer/${id}`)
  }

  const handleCallClick = (id: string) => {
    console.log(`Starting call with astrologer ${id}`)
    router.push(`/astrologer/${id}`)
  }

  const handleNotifyClick = (id: string) => {
    console.log(`Setting notification for astrologer ${id}`)
    router.push(`/astrologer/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Navbar />
      
      {/* Background pattern matching home section */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 pt-28 pb-8">
        {/* Header matching home section style */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Find Your Perfect </span>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Expert
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with experienced astrologers tailored to your specific needs
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 h-fit sticky top-28 border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
              <button 
                onClick={resetAllFilters}
                className="text-amber-600 text-sm hover:text-amber-700 font-medium transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search experts by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all"
                />
              </div>
            </div>

            {/* Languages Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
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
                    className="text-indigo-600 text-sm hover:text-indigo-700 font-medium flex items-center gap-2 pl-2 pt-2"
                  >
                    View {showMoreLanguages ? 'less' : `more (${languageOptions.length - 5} more)`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMoreLanguages ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-3"></div>
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
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3"></div>
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
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">Expert Results</h2>
                <p className="text-slate-600 mt-1">{sortedAstrologers.length} experts found</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 font-medium">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm font-medium"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <div className="text-red-600 text-lg mb-4">{error}</div>
                <button 
                  onClick={fetchAstrologers}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Astrologers Grid - Using exact same layout as home section */}
            {!loading && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <AnimatePresence>
                  {sortedAstrologers.map((astrologer, index) => (
                    <motion.div
                      key={astrologer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
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
              </div>
            )}

            {/* No Results */}
            {!loading && !error && sortedAstrologers.length === 0 && (
              <div className="text-center py-20">
                <div className="text-slate-500 text-lg mb-6">No astrologers found matching your criteria</div>
                <button 
                  onClick={resetAllFilters}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}