import { Star, Users, Calculator, Heart, Home, Gem, LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string
  isPopular?: boolean
}

export const servicesData: Service[] = [
  {
    id: 'kundli',
    title: 'Kundli Analysis',
    description: 'Complete birth chart analysis with detailed planetary positions and predictions',
    features: [
      'Detailed Birth Chart',
      'Planetary Analysis',
      'Dasha Predictions',
      'Remedial Solutions',
      'Career Guidance',
      'Health Insights'
    ],
    price: '₹999',
    icon: Star,
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-500',
    isPopular: true
  },
  {
    id: 'compatibility',
    title: 'Match Making',
    description: 'Comprehensive compatibility analysis for marriage and relationships',
    features: [
      'Guna Milan Analysis',
      'Manglik Dosha Check',
      'Compatibility Score',
      'Marriage Timing',
      'Relationship Guidance',
      'Remedies for Issues'
    ],
    price: '₹1499',
    icon: Heart,
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-500'
  },
  {
    id: 'numerology',
    title: 'Numerology',
    description: 'Discover your life path through the power of numbers and their vibrations',
    features: [
      'Life Path Number',
      'Destiny Number',
      'Lucky Numbers',
      'Name Analysis',
      'Career Numbers',
      'Relationship Numbers'
    ],
    price: '₹799',
    icon: Calculator,
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-500'
  },
  {
    id: 'vastu',
    title: 'Vastu Consultation',
    description: 'Ancient architectural science for harmony and prosperity in your spaces',
    features: [
      'Home Vastu Analysis',
      'Office Vastu Tips',
      'Plot Selection',
      'Remedial Solutions',
      'Interior Guidance',
      'Prosperity Tips'
    ],
    price: '₹1999',
    icon: Home,
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-yellow-500'
  },
  {
    id: 'gemstone',
    title: 'Gemstone Consultation',
    description: 'Personalized gemstone recommendations based on your planetary positions',
    features: [
      'Planetary Gemstones',
      'Wearing Guidelines',
      'Authentic Stones',
      'Energization Process',
      'Care Instructions',
      'Regular Follow-ups'
    ],
    price: '₹699',
    icon: Gem,
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-indigo-500'
  },
  {
    id: 'consultation',
    title: 'Personal Consultation',
    description: 'One-on-one session with expert astrologers for personalized guidance',
    features: [
      '45-min Live Session',
      'Personalized Guidance',
      'Q&A Session',
      'Remedial Solutions',
      'Follow-up Support',
      'Recording Available'
    ],
    price: '₹2499',
    icon: Users,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500'
  }
]