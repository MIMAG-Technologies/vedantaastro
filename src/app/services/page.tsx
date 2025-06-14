/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard, { Service } from '../components/services/ServiceCard';
import { getServices } from '../utils/services';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const serviceTypes = [
  { value: '', label: 'All Services', icon: '✨' },
  { value: 'ONE_ON_ONE', label: 'One on One', icon: '👤' },
  { value: 'GROUP', label: 'Group Sessions', icon: '👥' },
  { value: 'ONLINE', label: 'Online Services', icon: '🌐' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') ?? '');
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getServices({
          page: currentPage,
          q: searchQuery || undefined,
          type: selectedType || undefined,
          is_active: true,
        });
        
        setServices(response.data.services);
        setTotalPages(response.data.pagination.pages);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, selectedType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) params.set('q', searchQuery);
    else params.delete('q');
    params.set('page', '1');
    router.push(`/services?${params.toString()}`);
  };

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) params.set('type', type);
    else params.delete('type');
    params.set('page', '1');
    router.push(`/services?${params.toString()}`);
    setSelectedType(type);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/services?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center text-center overflow-hidden bg-cover bg-center" 
           style={{ backgroundImage: 'url("/planets/services.jpg")' }}>
        {/* Overlay */}
        <div className="absolute inset-0" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-orange-400 mb-6 drop-shadow-2xl">
              Discover Our Services
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-xl">
              Explore our comprehensive range of astrological services, designed to guide you on your spiritual journey and help you make informed decisions.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl 
                  focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm
                  transition-all duration-300 group-hover:border-amber-200 bg-white/90 text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r 
                  from-amber-500 to-orange-500 text-white rounded-xl 
                  hover:from-amber-400 hover:to-orange-400 transition-all duration-300 font-medium
                  shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Type Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {serviceTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleTypeChange(type.value)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                  flex items-center gap-2 backdrop-blur-sm
                  ${selectedType === type.value
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-white/80 text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-amber-200'
                  }`}
              >
                <span className="text-lg">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              {...fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm animate-pulse h-[450px] border border-gray-100"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              {...fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-16 gap-2"
          >
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-medium
                  ${currentPage === i + 1
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-amber-200'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 