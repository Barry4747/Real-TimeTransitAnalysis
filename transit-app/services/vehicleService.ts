import axios from 'axios';

export interface Vehicle {
    id?: string;
    vehicleId: string;
    line: string;
    lat: number;
    lon: number;
}

// Change API_BASE to your local IP where the .NET backend is running
export const API_BASE = 'http://192.168.8.107:5234';

export async function fetchVehicles(): Promise<Vehicle[]> {
    const response = await axios.get<Vehicle[]>(`${API_BASE}/api/vehicles/wroclaw`);
    return response.data;
}
