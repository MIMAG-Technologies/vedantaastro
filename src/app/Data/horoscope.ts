export interface HoroscopeSign {
  id: string
  name: string
  symbol: string
  element: string
  dates: string
  ruler: string
  description: string
  todaysPrediction: string
  luckyColor: string
  luckyNumber: number
  compatibility: string[]
  traits: string[]
  gradient: string
}

export const horoscopeData: HoroscopeSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    dates: 'Mar 21 - Apr 19',
    ruler: 'Mars',
    description: 'Bold, ambitious, and energetic leaders who love new challenges.',
    todaysPrediction: 'Today brings opportunities for leadership. Trust your instincts and take bold action in your professional life.',
    luckyColor: 'Red',
    luckyNumber: 7,
    compatibility: ['Leo', 'Sagittarius', 'Gemini'],
    traits: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'],
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    dates: 'Apr 20 - May 20',
    ruler: 'Venus',
    description: 'Practical, reliable, and devoted individuals who appreciate beauty and comfort.',
    todaysPrediction: 'Focus on financial planning today. Your practical nature will help you make wise investment decisions.',
    luckyColor: 'Green',
    luckyNumber: 6,
    compatibility: ['Virgo', 'Capricorn', 'Cancer'],
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    dates: 'May 21 - Jun 20',
    ruler: 'Mercury',
    description: 'Curious, adaptable, and communicative souls who love learning and sharing ideas.',
    todaysPrediction: 'Communication is key today. Reach out to old friends and make new connections that could benefit your future.',
    luckyColor: 'Yellow',
    luckyNumber: 5,
    compatibility: ['Libra', 'Aquarius', 'Aries'],
    traits: ['Adaptable', 'Outgoing', 'Intelligent', 'Curious'],
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    dates: 'Jun 21 - Jul 22',
    ruler: 'Moon',
    description: 'Intuitive, emotional, and protective individuals who value home and family.',
    todaysPrediction: 'Family matters take priority today. Your nurturing nature will bring harmony to domestic situations.',
    luckyColor: 'Silver',
    luckyNumber: 2,
    compatibility: ['Scorpio', 'Pisces', 'Taurus'],
    traits: ['Loyal', 'Emotional', 'Sympathetic', 'Protective'],
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    dates: 'Jul 23 - Aug 22',
    ruler: 'Sun',
    description: 'Confident, generous, and dramatic personalities who love being in the spotlight.',
    todaysPrediction: 'Your natural charisma shines today. Take center stage in presentations or social gatherings.',
    luckyColor: 'Gold',
    luckyNumber: 1,
    compatibility: ['Aries', 'Sagittarius', 'Libra'],
    traits: ['Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    dates: 'Aug 23 - Sep 22',
    ruler: 'Mercury',
    description: 'Analytical, practical, and perfectionist individuals who pay attention to details.',
    todaysPrediction: 'Your attention to detail pays off today. Complete important tasks and organize your workspace for better productivity.',
    luckyColor: 'Navy Blue',
    luckyNumber: 3,
    compatibility: ['Taurus', 'Capricorn', 'Scorpio'],
    traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking'],
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    dates: 'Sep 23 - Oct 22',
    ruler: 'Venus',
    description: 'Diplomatic, fair-minded, and social individuals who seek balance and harmony.',
    todaysPrediction: 'Balance is key today. Mediate conflicts and bring harmony to your relationships and work environment.',
    luckyColor: 'Pink',
    luckyNumber: 6,
    compatibility: ['Gemini', 'Aquarius', 'Leo'],
    traits: ['Diplomatic', 'Fair-minded', 'Social', 'Gracious'],
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    dates: 'Oct 23 - Nov 21',
    ruler: 'Mars & Pluto',
    description: 'Passionate, mysterious, and determined individuals with intense emotional depth.',
    todaysPrediction: 'Trust your intuition today. Deep insights and transformative experiences await those who look beneath the surface.',
    luckyColor: 'Maroon',
    luckyNumber: 8,
    compatibility: ['Cancer', 'Pisces', 'Virgo'],
    traits: ['Brave', 'Passionate', 'Stubborn', 'True Friend'],
    gradient: 'from-red-700 to-purple-700'
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    dates: 'Nov 22 - Dec 21',
    ruler: 'Jupiter',
    description: 'Adventurous, optimistic, and philosophical individuals who love freedom and exploration.',
    todaysPrediction: 'Adventure calls today. Embrace new experiences and expand your horizons through learning or travel.',
    luckyColor: 'Purple',
    luckyNumber: 9,
    compatibility: ['Aries', 'Leo', 'Aquarius'],
    traits: ['Generous', 'Idealistic', 'Great sense of humor', 'Adventurous'],
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    dates: 'Dec 22 - Jan 19',
    ruler: 'Saturn',
    description: 'Ambitious, disciplined, and responsible individuals who value tradition and hard work.',
    todaysPrediction: 'Your hard work pays off today. Focus on long-term goals and make strategic decisions for your career.',
    luckyColor: 'Brown',
    luckyNumber: 10,
    compatibility: ['Taurus', 'Virgo', 'Pisces'],
    traits: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    gradient: 'from-gray-600 to-slate-700'
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    dates: 'Jan 20 - Feb 18',
    ruler: 'Uranus & Saturn',
    description: 'Independent, innovative, and humanitarian individuals who think outside the box.',
    todaysPrediction: 'Innovation is your strength today. Embrace new technologies and unconventional solutions to old problems.',
    luckyColor: 'Turquoise',
    luckyNumber: 11,
    compatibility: ['Gemini', 'Libra', 'Sagittarius'],
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    dates: 'Feb 19 - Mar 20',
    ruler: 'Neptune & Jupiter',
    description: 'Compassionate, artistic, and intuitive individuals with deep emotional understanding.',
    todaysPrediction: 'Your compassion guides you today. Help others and trust your intuitive insights for important decisions.',
    luckyColor: 'Sea Green',
    luckyNumber: 12,
    compatibility: ['Cancer', 'Scorpio', 'Capricorn'],
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
    gradient: 'from-teal-500 to-green-600'
  }
]