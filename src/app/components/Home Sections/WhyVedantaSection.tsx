'use client'

import React from 'react'
import { Shield, Users, Clock, Award, Heart, Sparkles } from 'lucide-react'

const WhyVedantaSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Authentic Vedic Wisdom',
      description: 'Ancient knowledge passed down through generations of scholarly traditions',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Certified astrologers with decades of experience in Vedic sciences',
      color: 'from-teal-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Timeless Accuracy',
      description: 'Precise calculations using traditional methods for reliable insights',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Thousands of satisfied clients with life-changing experiences',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Personalized approach with genuine concern for your well-being',
      color: 'from-rose-500 to-red-500'
    },
    {
      icon: Sparkles,
      title: 'Modern Approach',
      description: 'Traditional wisdom enhanced with contemporary understanding',
      color: 'from-blue-500 to-indigo-500'
    }
  ]

  return (
    <section className="py-0 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Why Choose </span>
            
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Vedanta Astro?
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of ancient wisdom and modern insight with our comprehensive astrological services.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-8 border border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Subtle Glow Effect */}
                <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 rounded-3xl p-8 border border-slate-100">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Transform Your Life?
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Join thousands who have discovered their true potential through Vedic astrology
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyVedantaSection