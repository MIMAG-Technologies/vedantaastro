import axios from "axios";
import { Astrologer } from "../types/astrologerProfile";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vedantaastro.com/api';

export const getAstrologerProfile = async(id: number): Promise<Astrologer> => {
    try {
        console.log('Fetching astrologer profile for ID:', id);
        console.log('API URL:', `${API_BASE_URL}/astrologer/${id}`);
        
        const res = await axios.get(`${API_BASE_URL}/astrologer/${id}`);
        console.log('Astrologer Profile API Response:', res.data);
        
        // Extract data from the wrapped response
        const astrologerData = res.data.data;
        
        if (!astrologerData) {
            throw new Error('No astrologer data found in response');
        }
        
        // Process the schedule times to extract just the time part
        if (astrologerData.astrologer_schedules) {
            astrologerData.astrologer_schedules = astrologerData.astrologer_schedules.map((schedule: any) => ({
                ...schedule,
                start_time: schedule.start_time ? new Date(schedule.start_time).toTimeString().slice(0, 5) : '00:00',
                end_time: schedule.end_time ? new Date(schedule.end_time).toTimeString().slice(0, 5) : '00:00'
            }));
        }
        
        console.log('Processed astrologer data:', astrologerData);
        return astrologerData as Astrologer;
    } catch (error) {
        console.error("Error Fetching astrologer profile", error);
        if (axios.isAxiosError(error)) {
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        }
        throw new Error("Error Fetching astrologer profile");
    }
}