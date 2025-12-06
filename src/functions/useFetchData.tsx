import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() {
    
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {

        const fetchAPI = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const json: OpenMeteoResponse = await response.json();
                setData(json);

            } catch (e) {
                setError(e instanceof Error ? e.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchAPI();
    }, []);

    return { data, loading, error };
}
