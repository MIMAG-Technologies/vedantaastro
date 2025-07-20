import axios from "axios";
import { OneServiceResponse } from "@/app/types/oneservice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vedantaastro.com/api';

export const getOneService = async(id: number): Promise<OneServiceResponse | null> => {
    try {
        const res = await axios.get<OneServiceResponse>(`${API_BASE_URL}/services/${id}`);
        return res.data;
    } catch(error) {
        console.error("Error fetching one service:", error);
        return null;
    }
}