import { BookOpen, Gem, Star, Shield, Heart, Moon } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface Product {
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
}

export const productCategories = [
  'All Products',
  'Gemstones',
  'Books',
  'Spiritual Items',
  'Yantras',
  'Accessories'
]

export const productsData: Product[] = [
  {
    id: 'ruby-stone',
    name: 'Natural Ruby Stone',
    category: 'Gemstones',
    price: 2499,
    originalPrice: 3499,
    image: '/api/placeholder/300/300',
    description: 'Authentic natural ruby stone for enhancing love, passion, and vitality',
    features: ['Certified Authentic', 'Lab Tested', 'Energized', 'Free Certificate'],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isBestseller: true,
    icon: Gem,
    primaryColor: '#DC2626',
    secondaryColor: '#FCA5A5',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-rose-400'
  },
  {
    id: 'bhagavad-gita',
    name: 'Bhagavad Gita',
    category: 'Books',
    price: 599,
    originalPrice: 799,
    image: '/api/placeholder/300/300',
    description: 'Sacred text with detailed commentary and astrological insights',
    features: ['Sanskrit Text', 'English Translation', 'Commentary', 'Premium Binding'],
    rating: 4.9,
    reviews: 298,
    inStock: true,
    icon: BookOpen,
    primaryColor: '#EA580C',
    secondaryColor: '#FED7AA',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-400'
  },
  {
    id: 'emerald-stone',
    name: 'Natural Emerald',
    category: 'Gemstones',
    price: 3999,
    originalPrice: 5499,
    image: '/api/placeholder/300/300',
    description: 'Premium emerald stone for wisdom, growth, and prosperity',
    features: ['AAA Grade', 'Certified', 'Astrologically Tested', 'Lifetime Warranty'],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isBestseller: true,
    icon: Gem,
    primaryColor: '#059669',
    secondaryColor: '#A7F3D0',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-400'
  },
  {
    id: 'sri-yantra',
    name: 'Sri Yantra',
    category: 'Yantras',
    price: 1299,
    image: '/api/placeholder/300/300',
    description: 'Sacred geometry for abundance and spiritual growth',
    features: ['Copper Material', 'Hand Crafted', 'Energized', 'Instructions Included'],
    rating: 4.6,
    reviews: 124,
    inStock: true,
    icon: Star,
    primaryColor: '#7C2D12',
    secondaryColor: '#FED7AA',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-orange-400'
  },
  {
    id: 'protection-bracelet',
    name: 'Protection Bracelet',
    category: 'Accessories',
    price: 899,
    originalPrice: 1199,
    image: '/api/placeholder/300/300',
    description: 'Black tourmaline and obsidian bracelet for protection',
    features: ['Natural Stones', 'Adjustable Size', 'Blessed', 'Gift Box'],
    rating: 4.5,
    reviews: 67,
    inStock: false,
    icon: Shield,
    primaryColor: '#1F2937',
    secondaryColor: '#9CA3AF',
    gradientFrom: 'from-gray-700',
    gradientTo: 'to-slate-500'
  },
  {
    id: 'moonstone',
    name: 'Moonstone Ring',
    category: 'Gemstones',
    price: 1899,
    image: '/api/placeholder/300/300',
    description: 'Beautiful moonstone ring for emotional balance and intuition',
    features: ['Sterling Silver', 'Natural Moonstone', 'Custom Sizing', 'Certificate'],
    rating: 4.8,
    reviews: 203,
    inStock: true,
    icon: Moon,
    primaryColor: '#6366F1',
    secondaryColor: '#C7D2FE',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-400'
  },
  {
    id: 'love-yantra',
    name: 'Love Yantra',
    category: 'Yantras',
    price: 999,
    image: '/api/placeholder/300/300',
    description: 'Sacred yantra for attracting love and harmonious relationships',
    features: ['Rose Gold Plated', 'Vedic Mantras', 'Energized', 'Beautiful Design'],
    rating: 4.4,
    reviews: 91,
    inStock: true,
    icon: Heart,
    primaryColor: '#EC4899',
    secondaryColor: '#FBCFE8',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-400'
  },
  {
    id: 'astrology-guide',
    name: 'Complete Astrology Guide',
    category: 'Books',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    description: 'Comprehensive guide to Vedic astrology for beginners and experts',
    features: ['500+ Pages', 'Illustrations', 'Practice Charts', 'Author Signed'],
    rating: 4.9,
    reviews: 445,
    inStock: true,
    isBestseller: true,
    icon: BookOpen,
    primaryColor: '#7C3AED',
    secondaryColor: '#DDD6FE',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-400'
  }
]