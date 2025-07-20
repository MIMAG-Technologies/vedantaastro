export interface Astrologer {
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
  created_at: string;
  updated_at: string;
  firebase_uid: string | null;
  gender: string;
  date_of_birth: string | null;
  astrologer_ratings: AstrologerRatings;
  astrologer_schedules: AstrologerSchedule[];
  astrologer_services: AstrologerService[];
}

export interface AstrologerRatings {
  astrologer_id: number;
  total_reviews: number;
  average_rating: string; // If returned as string, otherwise use `number`
  updated_at: string;
}

export interface AstrologerSchedule {
  id: number;
  astrologer_id: number;
  day_of_week: string;
  start_time: string; // ISO format
  end_time: string;
  is_working_day: boolean;
}

export interface AstrologerService {
  id: number;
  service_id: number;
  service_name: string;
  modes: ServiceMode[];
}

export interface ServiceMode {
  id: number;
  mode: 'call' | 'chat' | 'video' | 'offline'; 
  price: string; 
  is_active: boolean;
}
