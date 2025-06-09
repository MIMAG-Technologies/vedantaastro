export interface HomeBlog {
  id: string
  title: string
  excerpt: string
  author: string
  publishDate: string
  readTime: string
  category: string
}

export interface HomeHoroscope {
  id: string
  name: string
  symbol: string
  dates: string
  todaysPrediction: string
  gradient: string
}

export const homeBlogs: HomeBlog[] = [
  {
    id: 'saturn-transit-2024',
    title: 'Saturn Transit 2024: What You Need to Know',
    excerpt: 'Discover how Saturn\'s movement through different zodiac signs will impact your life in 2024 and learn practical remedies.',
    author: 'Acharya Rajesh Sharma',
    publishDate: '2024-06-05',
    readTime: '8 min read',
    category: 'Astrology'
  },
  {
    id: 'gemstone-guide-ruby',
    title: 'The Power of Ruby Gemstones in Vedic Astrology',
    excerpt: 'Learn about the astrological benefits of ruby, how to choose authentic stones, and proper wearing guidelines.',
    author: 'Dr. Meera Agarwal',
    publishDate: '2024-06-03',
    readTime: '6 min read',
    category: 'Gemstones'
  },
  {
    id: 'mercury-retrograde-guide',
    title: 'Navigating Mercury Retrograde: A Practical Guide',
    excerpt: 'Learn how to handle communication challenges and make the most of Mercury retrograde periods.',
    author: 'Pandit Vishnu Sharma',
    publishDate: '2024-05-30',
    readTime: '5 min read',
    category: 'Planetary Transits'
  }
]

export const homeHoroscopes: HomeHoroscope[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    dates: 'Mar 21 - Apr 19',
    todaysPrediction: 'Today brings opportunities for leadership. Trust your instincts in professional matters.',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    dates: 'Apr 20 - May 20',
    todaysPrediction: 'Focus on financial planning. Your practical nature leads to wise decisions.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    dates: 'May 21 - Jun 20',
    todaysPrediction: 'Communication is key today. Reach out to old friends and make new connections.',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    dates: 'Jun 21 - Jul 22',
    todaysPrediction: 'Family matters take priority. Your nurturing nature brings harmony to situations.',
    gradient: 'from-blue-400 to-cyan-500'
  }
]