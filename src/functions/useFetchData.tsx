import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'quito': { latitude: -0.22016, longitude: -78.51233 },
    'manta': { latitude: -0.94937, longitude: -80.73137 },
    'cuenca': { latitude: -2.89530, longitude: -78.99630 },
};

export default function useFetchData(selectedOption: string | null): OpenMeteoResponse | undefined {

    let cityConfig = CITY_COORDS['guayaquil'];
    if (selectedOption) {
        // if format is "lat,lng" use those coordinates
        if (selectedOption.includes(',')) {
            const parts = selectedOption.split(',').map(s => parseFloat(s));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                cityConfig = { latitude: parts[0], longitude: parts[1] };
            }
        } else {
            const key = selectedOption.toLowerCase();
            cityConfig = CITY_COORDS[key as keyof typeof CITY_COORDS] ?? CITY_COORDS['guayaquil'];
        }
    }
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation`

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {

        const fetchAPI = async () => {
            try {
                const response = await fetch(URL);
                const json: OpenMeteoResponse = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAPI();

    }, [selectedOption]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;
}