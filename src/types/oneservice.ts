interface AstrologerRatings {
    astrologer_id:string;
    total_reviews:number;
    average_rating:string;
    updated_at:string;
}

interface Astrologer {
    id:number;
    full_name:string;
    profile_image:string;
    experience_years:number;
    astrologer_ratings:AstrologerRatings;
}

interface AstrologerService {
    id:number;
    astrolger_id:number;
    service_id:number;
    astrologers:Astrologer;

}

interface Service {
    id:number;
    title:string;
    description:string;
    service_type:string;
    service_images:string[];
    created_at:string;
    updated_at:string;
    is_active:boolean;
    thumbnail_img:string;
    slug:string;
    products:any[];
    astrologer_services:AstrologerService[];
}

export interface OneServiceResponse{
    success:boolean;
    message:string;
    service:Service;
}