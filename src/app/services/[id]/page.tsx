/* eslint-disable @next/next/no-img-element */
import { getServices } from '../../utils/services'
import ServiceDetailClient from './ServiceDetailClient'

// Generate static params for all services
export async function generateStaticParams() {
  try {
    // Fetch all services to generate static params
    const response = await getServices({
      page: 1,
      is_active: true,
    });
    
    // Get all pages of services
    const allServices = [...response.data.services];
    const totalPages = response.data.pagination.pages;
    
    // Fetch remaining pages if there are more
    for (let page = 2; page <= totalPages; page++) {
      try {
        const pageResponse = await getServices({
          page,
          is_active: true,
        });
        allServices.push(...pageResponse.data.services);
      } catch (error) {
        console.warn(`Failed to fetch services page ${page}:`, error);
      }
    }
    
    // Return array of params for each service
    return allServices.map((service: any) => ({
      id: service.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return some fallback IDs if API is unavailable during build
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
    ];
  }
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return <ServiceDetailClient serviceId={params.id} />
} 