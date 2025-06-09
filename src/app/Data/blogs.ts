import { Calendar, User, Clock, Tag } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
  views: number
}

export const blogCategories = [
  'All Posts',
  'Astrology',
  'Vedic Science',
  'Gemstones',
  'Vastu',
  'Numerology',
  'Spirituality'
]

export const blogsData: BlogPost[] = [
  {
    id: 'saturn-transit-2024',
    title: 'Saturn Transit 2024: What You Need to Know',
    excerpt: 'Discover how Saturn\'s movement through different zodiac signs will impact your life in 2024 and learn practical remedies.',
    content: 'Saturn, the planet of discipline and karma...',
    author: 'Acharya Rajesh Sharma',
    publishDate: '2024-06-05',
    readTime: '8 min read',
    category: 'Astrology',
    tags: ['Saturn', 'Transit', '2024', 'Predictions'],
    image: '/api/placeholder/400/250',
    featured: true,
    views: 2847
  },
  {
    id: 'gemstone-guide-ruby',
    title: 'The Complete Guide to Ruby Gemstones',
    excerpt: 'Learn about the astrological benefits of ruby, how to choose authentic stones, and proper wearing guidelines.',
    content: 'Ruby, known as Manik in Sanskrit...',
    author: 'Dr. Meera Agarwal',
    publishDate: '2024-06-03',
    readTime: '6 min read',
    category: 'Gemstones',
    tags: ['Ruby', 'Gemstones', 'Benefits', 'Guide'],
    image: '/api/placeholder/400/250',
    featured: false,
    views: 1923
  },
  {
    id: 'vastu-home-entrance',
    title: 'Vastu Tips for Your Home Entrance',
    excerpt: 'Create positive energy flow in your home with these essential Vastu guidelines for entrance design and placement.',
    content: 'The entrance of your home is crucial...',
    author: 'Guru Krishnan',
    publishDate: '2024-06-01',
    readTime: '5 min read',
    category: 'Vastu',
    tags: ['Vastu', 'Home', 'Entrance', 'Tips'],
    image: '/api/placeholder/400/250',
    featured: true,
    views: 3156
  },
  {
    id: 'numerology-name-analysis',
    title: 'Understanding Your Name Through Numerology',
    excerpt: 'Explore how the numbers in your name influence your personality, destiny, and life path according to ancient numerology.',
    content: 'Every letter in your name carries...',
    author: 'Pandit Vishnu Sharma',
    publishDate: '2024-05-30',
    readTime: '7 min read',
    category: 'Numerology',
    tags: ['Numerology', 'Name', 'Analysis', 'Destiny'],
    image: '/api/placeholder/400/250',
    featured: false,
    views: 1654
  },
  {
    id: 'mercury-retrograde-guide',
    title: 'Navigating Mercury Retrograde: A Practical Guide',
    excerpt: 'Learn how to handle communication challenges and technology issues during Mercury retrograde periods.',
    content: 'Mercury retrograde often gets blamed...',
    author: 'Acharya Priya Nair',
    publishDate: '2024-05-28',
    readTime: '6 min read',
    category: 'Astrology',
    tags: ['Mercury', 'Retrograde', 'Guide', 'Communication'],
    image: '/api/placeholder/400/250',
    featured: false,
    views: 2198
  },
  {
    id: 'spiritual-meditation-practices',
    title: 'Ancient Vedic Meditation Practices for Modern Life',
    excerpt: 'Discover time-tested meditation techniques from Vedic traditions that can transform your daily spiritual practice.',
    content: 'In our fast-paced modern world...',
    author: 'Dr. Meera Agarwal',
    publishDate: '2024-05-25',
    readTime: '9 min read',
    category: 'Spirituality',
    tags: ['Meditation', 'Vedic', 'Spirituality', 'Practice'],
    image: '/api/placeholder/400/250',
    featured: true,
    views: 2743
  }
]