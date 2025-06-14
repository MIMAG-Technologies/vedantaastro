import { Service } from '../components/services/ServiceCard';

const API_BASE_URL = 'https://api.vedantaastro.com/api';

export interface ServiceResponse {
  success: boolean;
  message: string;
  data: {
    services: Service[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
    filters: {
      query: string | null;
      type: string | null;
      is_active: boolean | null;
    };
  };
}

export interface ServicesQueryParams {
  page?: number;
  q?: string;
  type?: string;
  is_active?: boolean;
}

export async function getServices(params: ServicesQueryParams = {}): Promise<ServiceResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.q) searchParams.append('q', params.q);
  if (params.type) searchParams.append('type', params.type);
  if (params.is_active !== undefined) searchParams.append('is_active', params.is_active.toString());

  const response = await fetch(`${API_BASE_URL}/services?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }

  return response.json();
}

export async function getServiceById(id: string): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/services/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch service');
  }

  const data = await response.json();
  return data.data.service;
}

export async function getServiceCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/services/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
} 