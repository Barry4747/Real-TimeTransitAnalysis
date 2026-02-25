import { useState, useEffect, useCallback } from 'react';
import { fetchVehicles, Vehicle } from '@/services/vehicleService';

const FETCH_INTERVAL_SECONDS = parseInt(
    process.env.EXPO_PUBLIC_FETCH_INTERVAL_SECONDS ?? '15',
    10
);
const REFRESH_INTERVAL_MS = FETCH_INTERVAL_SECONDS * 1000;

export interface UseVehiclesResult {
    vehicles: Vehicle[];
    error: string | null;
    lastUpdated: Date | null;
    isLoading: boolean;
    refresh: () => void;
}

export function useVehicles(): UseVehiclesResult {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useCallback(async () => {
        try {
            const data = await fetchVehicles();
            setVehicles(data);
            setLastUpdated(new Date());
            setError(null);
        } catch (err: any) {
            console.error('Vehicle fetch error:', err.message);
            setError('Cannot connect to API. Check IP and port.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [refresh]);

    return { vehicles, error, lastUpdated, isLoading, refresh };
}
