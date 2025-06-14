import { motion } from 'framer-motion';
import Link from 'next/link';

export interface Service {
  id: number;
  title: string;
  description: string;
  service_type: string;
  service_images: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
  thumbnail_img: string | null;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imageUrl = service.thumbnail_img 
    ? `https://api.vedantaastro.com/api/images/${service.thumbnail_img}`
    : '/images/service-placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {service.service_type && (
          <div className="absolute top-4 right-4">
            <span className="px-4 py-1.5 text-sm font-medium text-white bg-amber-500/90 backdrop-blur-sm rounded-full shadow-lg">
              {service.service_type.replace(/_/g, ' ')}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium">
            {new Date(service.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <Link
            href={`/services/${service.id}`}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg 
              hover:from-amber-400 hover:to-orange-400 transition-all duration-300 font-medium
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard; 