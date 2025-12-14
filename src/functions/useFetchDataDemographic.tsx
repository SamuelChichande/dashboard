import { useState, useEffect } from 'react';
import { type OpenStreetMapResponse } from '../types/DashboardTypes';

interface Coord {
    latitude: number;
    longitude: number;
}

export default function useFetchData(coord: Coord | null): OpenStreetMapResponse | undefined {

    const [data, setData] = useState<OpenStreetMapResponse>();

    useEffect(() => {

        // If no coordinates provided, clear data and skip fetch
        if (!coord) {
            setData(undefined);
            return;
        }

        const { latitude, longitude } = coord;
        const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=es`;

        const fetchAPI = async () => {
            try {
                const response = await fetch(URL);
                const json: OpenStreetMapResponse = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAPI();

    }, [coord?.latitude, coord?.longitude]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;
}
