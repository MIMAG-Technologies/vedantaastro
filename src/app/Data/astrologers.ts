export interface Astrologer {
  id: string
  name: string
  experience: string
  rating: number
  totalRatings: number
  specializations: string[]
  isOnline: boolean
  avatar?: string
  initials: string
  gradientFrom: string
  gradientTo: string
}

export const astrologersData: Astrologer[] = [
  {
    id: '1',
    name: 'Acharya Rajesh',
    experience: '15+ Years Experience',
    rating: 4.9,
    totalRatings: 5,
    specializations: ['Career', 'Marriage', 'Finance'],
    isOnline: true,
    initials: 'AR',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-purple-600'
  },
  {
    id: '2',
    name: 'Pandit Sharma',
    experience: '12+ Years Experience',
    rating: 4.8,
    totalRatings: 5,
    specializations: ['Love', 'Health', 'Spiritual'],
    isOnline: true,
    initials: 'PS',
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-emerald-600'
  },
  {
    id: '3',
    name: 'Dr. Meera',
    experience: '18+ Years Experience',
    rating: 5.0,
    totalRatings: 5,
    specializations: ['Remedies', 'Gemstones', 'Doshas'],
    isOnline: false,
    initials: 'DM',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-600'
  },
  {
    id: '4',
    name: 'Guru Krishnan',
    experience: '20+ Years Experience',
    rating: 4.9,
    totalRatings: 5,
    specializations: ['Vastu', 'Business', 'Property'],
    isOnline: true,
    initials: 'GK',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-600'
  },
  {
    id: '5',
    name: 'Acharya Priya',
    experience: '10+ Years Experience',
    rating: 4.7,
    totalRatings: 5,
    specializations: ['Children', 'Education', 'Family'],
    isOnline: true,
    initials: 'AP',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600'
  },
  {
    id: '6',
    name: 'Pandit Vishnu',
    experience: '16+ Years Experience',
    rating: 4.8,
    totalRatings: 5,
    specializations: ['Travel', 'Foreign', 'Relocation'],
    isOnline: false,
    initials: 'PV',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-600'
  }
]