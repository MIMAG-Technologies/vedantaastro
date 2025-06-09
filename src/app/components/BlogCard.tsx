'use client'

import React from 'react'
import { Calendar, User, Clock, Eye, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  publishDate: string
  readTime: string
  category: string
  image: string
  featured?: boolean
  views: number
  onReadMore?: (id: string) => void
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  author,
  publishDate,
  readTime,
  category,
  image,
  featured = false,
  views,
  onReadMore
}) => {
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(id)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatViews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-slate-200 overflow-hidden">
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
          Featured
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/api/placeholder/400/250'
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{formatViews(views)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Author and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">{author}</span>
          </div>

          <button
            onClick={handleReadMore}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 group/btn transition-colors duration-300"
          >
            Read More
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default BlogCard