'use client'

import React, { useState } from 'react'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  description: string
  features: string[]
  rating: number
  reviews: number
  inStock: boolean
  isBestseller?: boolean
  icon: LucideIcon
  primaryColor: string
  secondaryColor: string
  gradientFrom: string
  gradientTo: string
  onAddToCart?: (id: string) => void
  onViewDetails?: (id: string) => void
  onWishlist?: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  description,
  rating,
  reviews,
  inStock,
  isBestseller,
  icon: Icon,
  primaryColor,
  secondaryColor,
  gradientFrom,
  gradientTo,
  onAddToCart,
  onViewDetails,
  onWishlist
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = () => {
    if (inStock && onAddToCart) {
      onAddToCart(id)
    }
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    if (onWishlist) {
      onWishlist(id)
    }
  }

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-slate-200 overflow-hidden relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isBestseller && (
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Bestseller
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            -{discountPercentage}%
          </span>
        )}
        {!inStock && (
          <span className="bg-gradient-to-r from-gray-500 to-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Out of Stock
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Heart 
          size={16} 
          className={`transition-colors duration-300 ${
            isWishlisted ? 'text-red-500 fill-current' : 'text-slate-400 hover:text-red-500'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-20 h-20 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl flex items-center justify-center shadow-lg animate-pulse`}
            >
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>
        )}
        
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleViewDetails}
            className="bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ 
              backgroundColor: secondaryColor + '40',
              color: primaryColor 
            }}
          >
            {category}
          </span>
          
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-400 fill-current" />
            <span className="text-sm text-slate-600">{rating}</span>
            <span className="text-xs text-slate-400">({reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-300 line-clamp-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
          <span 
            className="text-2xl font-bold"
            style={{ color: primaryColor }}
          >
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-lg text-slate-400 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            inStock
              ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:shadow-lg hover:shadow-${primaryColor}/25 text-white hover:scale-105 transform`
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={18} />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard