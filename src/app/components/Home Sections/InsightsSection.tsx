'use client'

import React from 'react'
import HomeBlogCard from '../HomeCards/HomeBlogCard'
import HomeHoroscopeCard from '../HomeCards/HomeHoroscopeCard'
import { homeBlogs, homeHoroscopes } from '@/app/Data/homeContent'
import { BookOpen, Stars, ArrowRight } from 'lucide-react'

const InsightsSection: React.FC = () => {
  const handleBlogReadMore = () => {
    console.log('Navigate to blog page')
    // Navigate to blog detail or blog listing page
  }

  const handleHoroscopeReadMore = () => {
    console.log('Navigate to horoscope page')
    // Navigate to detailed horoscope page
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-8 bg-gray-100 relative overflow-hidden">
      {/* Enhanced Subtle Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-32 left-1/6 w-64 h-64 bg-gradient-to-br from-orange-400/6 to-yellow-400/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-1/6 w-56 h-56 bg-gradient-to-br from-indigo-400/6 to-purple-400/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-400/4 to-emerald-400/4 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="grid grid-cols-12 gap-8 h-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-slate-400 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Insights & </span>
            
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Daily Guidance
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with astrological insights and discover what the stars have in store for you today.
          </p>
        </div>

        {/* Blog Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-800">Latest Articles</h3>
              <p className="text-slate-600">Astrological wisdom & spiritual guidance</p>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {homeBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <HomeBlogCard
                  title={blog.title}
                  excerpt={blog.excerpt}
                  author={blog.author}
                  publishDate={blog.publishDate}
                  readTime={blog.readTime}
                  category={blog.category}
                  onReadMore={handleBlogReadMore}
                />
              </div>
            ))}
          </div>

          {/* View All Blogs Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2 mx-auto">
              <BookOpen size={18} />
              View All Articles
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Horoscope Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Stars className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-800">Today&apos;s Horoscope</h3>
              <p className="text-slate-600">{getCurrentDate()}</p>
            </div>
          </div>

          {/* Horoscope Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {homeHoroscopes.map((sign, index) => (
              <div
                key={sign.id}
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <HomeHoroscopeCard
                  name={sign.name}
                  symbol={sign.symbol}
                  dates={sign.dates}
                  todaysPrediction={sign.todaysPrediction}
                  gradient={sign.gradient}
                  onReadMore={handleHoroscopeReadMore}
                />
              </div>
            ))}
          </div>

          {/* View All Signs Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2 mx-auto">
              <Stars size={18} />
              View All Signs
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className="mt-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden">
            {/* CTA Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/70 to-indigo-50/50 rounded-3xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/20 to-transparent rounded-tr-3xl"></div>
            </div>
            
            <div className="text-center max-w-2xl mx-auto relative z-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Get Personalized Astrological Guidance
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Book a consultation with our expert astrologers for detailed insights tailored specifically to your birth chart and life circumstances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
                  Book Consultation
                </button>
                <button className="border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InsightsSection