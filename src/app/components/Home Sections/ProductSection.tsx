'use client'
import React, { useState, useMemo } from 'react'
import ProductCard from '../HomeCards/ProductCard'
import ProductFilter from '../HomeSectionComponents/ProductFilter'
import { productsData, productCategories } from '@/app/Data/products'

const ProductsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [sortBy, setSortBy] = useState('featured')

  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`)
    // Implement cart logic here
  }

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for product ${id}`)
    // Implement product detail view
  }

  const handleWishlist = (id: string) => {
    console.log(`Added product ${id} to wishlist`)
    // Implement wishlist logic here
  }

 const filteredAndSortedProducts = useMemo(() => {
    const filtered  = selectedCategory === 'All Products' 
      ? productsData 
      : productsData.filter(product => product.category === selectedCategory)

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating)
      case 'newest':
        return [...filtered].reverse()
      default:
        // Featured - bestsellers first, then by rating
        return [...filtered].sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1
          if (!a.isBestseller && b.isBestseller) return 1
          return b.rating - a.rating
        })

     }
  }, [selectedCategory, sortBy])

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50/50 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/5 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/5 w-48 h-48 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-400/8 to-emerald-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800">Sacred </span>
            
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover authentic spiritual products, gemstones, and sacred items to enhance your spiritual journey and astrological practice.
          </p>
        </div>

        {/* Filter Component */}
        <ProductFilter
        categories={productCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
              onWishlist={handleWishlist}
            />
          ))}

          </div>

        {/* No Products Message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-slate-500 text-2xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Products Found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              We couldn&apos;t find any products in this category. Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white py-4 px-12 rounded-2xl font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
            Explore All Products
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection