'use client'

import React, { useState } from 'react'
import BlogCard from '../BlogCard'
import { blogsData, blogCategories } from '@/app/Data/blogs'
import { BookOpen, Filter } from 'lucide-react'

const BlogsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  const [showAllBlogs, setShowAllBlogs] = useState(false)

  const handleReadMore = (id: string) => {
    console.log(`Reading blog post: ${id}`)
    // Navigate to blog detail page
  }

  // Filter blogs by category
  const filteredBlogs = selectedCategory === 'All Posts' 
    ? blogsData 
    : blogsData.filter(blog => blog.category === selectedCategory)

  // Show only 6 blogs initially, or all if showAllBlogs is true
  const displayBlogs = showAllBlogs ? filteredBlogs : filteredBlogs.slice(0, 6)

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-1/5 w-48 h-48 bg-gradient-to-br from-orange-400/8 to-yellow-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/5 w-40 h-40 bg-gradient-to-br from-indigo-400/8 to-purple-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen size={16} />
            Astrological Insights
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Latest</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Blog Posts
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of articles on Vedic astrology, spiritual guidance, and cosmic wisdom to deepen your understanding.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-slate-200/60">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-500 ml-3" />
              <div className="flex gap-1 overflow-x-auto">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg scale-105'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayBlogs.map((blog, index) => (
            <div
              key={blog.id}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <BlogCard
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                author={blog.author}
                publishDate={blog.publishDate}
                readTime={blog.readTime}
                category={blog.category}
                image={blog.image}
                featured={blog.featured}
                views={blog.views}
                onReadMore={handleReadMore}
              />
            </div>
          ))}
        </div>

        {/* No Blogs Message */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Articles Found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              We couldn&apos;t find any articles in this category. Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* Load More / View All Button */}
        {filteredBlogs.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllBlogs(!showAllBlogs)}
              className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              {showAllBlogs ? 'Show Less' : `View All ${filteredBlogs.length} Articles`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogsSection