'use client'

import React from 'react'
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react'

interface HomeBlogCardProps {
  title: string
  excerpt: string
  author: string
  publishDate: string
  readTime: string
  category: string
  onReadMore?: () => void
}

const HomeBlogCard: React.FC<HomeBlogCardProps> = ({
  title,
  excerpt,
  author,
  publishDate,
  readTime,
  category,
  onReadMore
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <article className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200/40 hover:border-orange-300/50 transition-all duration-500 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/30 to-orange-50/20 group-hover:from-white group-hover:to-orange-50/40 transition-all duration-500 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-bl-2xl group-hover:from-orange-200/40 transition-all duration-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon & Category */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          
          <span className="text-xs font-semibold text-orange-600 bg-orange-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-orange-200/60 group-hover:bg-orange-100/80 transition-all duration-300">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors duration-300 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
          {excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-5 group-hover:text-slate-600 transition-colors duration-300">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Author and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 group-hover:border-slate-300/60 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <User size={12} className="text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800 transition-colors duration-300">{author}</span>
          </div>

          <button
            onClick={onReadMore}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 group/btn transition-all duration-300 hover:scale-105"
          >
            Read More
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default HomeBlogCard