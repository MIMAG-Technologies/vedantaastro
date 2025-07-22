'use client'

import React, { useState } from 'react'
import SimpleProductCard from '../HomeCards/SimpleProductCard'
import { productsData } from '@/app/Data/products'
import { Sparkles, TrendingUp, Award, Shield, Zap, Crown } from 'lucide-react'

const ProductsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('featured')
  
  // Enhanced product selection logic
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return productsData.filter(p => p.isBestseller).slice(0, 6)
      case 'new':
        return productsData.slice(3, 9) // Simulate new products
      default:
        return productsData.slice(0, 6) // Featured
    }
  }

  const filteredProducts = getFilteredProducts()

  const tabs = [
    { id: 'featured', label: 'Featured', icon: Sparkles },
    { id: 'bestsellers', label: 'Bestsellers', icon: TrendingUp },
    { id: 'new', label: 'New Arrivals', icon: Award }
  ]

  return (
    <section className="py-8 bg-gradient-to-br from-slate-50/40 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/6 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/6 w-48 h-48 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-400/6 to-emerald-400/6 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="grid grid-cols-20 gap-8 h-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-slate-400 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            Sacred Collection
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Authentic Spiritual </span>
            
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover handpicked spiritual items, gemstones, and sacred artifacts to enhance your astrological practice and spiritual journey.
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-slate-200/60">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg scale-105'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <SimpleProductCard
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                originalPrice={product.originalPrice}
                description={product.description}
                icon={product.icon}
                gradientFrom={product.gradientFrom}
                gradientTo={product.gradientTo}
                isBestseller={product.isBestseller}
                rating={product.rating}
                reviews={product.reviews}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Features Section - Better Icons and Content */}
        <div className="bg-gradient-to-r from-slate-50/80 to-indigo-50/60 rounded-3xl p-8 border border-slate-200/60 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">100% Authentic</h3>
              <p className="text-slate-600 text-sm">All products are certified and energized by our expert astrologers for maximum effectiveness</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Energized Products</h3>
              <p className="text-slate-600 text-sm">Each item is blessed and energized using ancient Vedic rituals for enhanced spiritual benefits</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Premium Quality</h3>
              <p className="text-slate-600 text-sm">Handpicked premium materials sourced from authentic suppliers with quality guarantee</p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-4 px-8 rounded-2xl font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center gap-2">
              <Sparkles size={20} />
              Explore Full Collection
            </button>
            
            <div className="text-sm text-slate-500">
              <span className="text-slate-800 font-medium">500+</span> Happy Customers | 
              <span className="text-slate-800 font-medium"> 4.8★</span> Average Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection