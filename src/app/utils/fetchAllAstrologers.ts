import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vedantaastro.com/api';

export interface AstrologerListItem {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  profile_image: string;
  bio: string;
  experience_years: number;
  languages: string[];
  is_verified: boolean;
  is_active: boolean;
  is_google_verified: boolean;
  gender: string;
  date_of_birth: string | null;
  firebase_uid: string | null;
  created_at: string;
  updated_at: string;
  astrologer_ratings: {
    astrologer_id: number;
    total_reviews: number;
    average_rating: string;
    updated_at: string;
  };
}

export interface AstrologersResponse {
  data: AstrologerListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  filters: {
    query: string | null;
    is_active: string;
  };
}

export const getAllAstrologers = async(params: {
  page?: number;
  query?: string;
  is_active?: boolean;
} = {}): Promise<AstrologersResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.query) searchParams.append('query', params.query);
    if (params.is_active !== undefined) searchParams.append('is_active', params.is_active.toString());

    console.log('Fetching all astrologers with params:', params);
    console.log('API URL:', `${API_BASE_URL}/astrologer?${searchParams.toString()}`);
    
    const res = await axios.get(`${API_BASE_URL}/astrologer?${searchParams.toString()}`);
    console.log('Astrologers API Response:', res.data);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    throw new Error("Error fetching astrologers");
  }
}