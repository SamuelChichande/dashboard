import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
    data?: OpenMeteoResponse | undefined;
}

const getDataFiveHours = (data: OpenMeteoResponse | undefined) => {
    if (!data) return { hours: [], temps: [], winds: [] };
    const hours = data.hourly.time.slice(0, 10).map(formatDateTime);
    const temps = data.hourly.temperature_2m.slice(0, 10);
    const winds = data.hourly.wind_speed_10m.slice(0, 10);
    return { hours, temps, winds };
}

const formatDateTime = (dateTime: string): string => {
    const d = new Date(dateTime);
    if (isNaN(d.getTime())) return dateTime;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).padStart(4, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
}

export default function ChartUI({ data }: ChartUIProps) {
    return (
        <>
            <Typography variant="h5" component="div">
                Tiempo vs Velocidad del viento (10m) & Temperatura (2m)
            </Typography>
            <LineChart
                height={300}
                series={[
                    { data: getDataFiveHours(data).winds, label: 'Velocidad del viento' },
                    { data: getDataFiveHours(data).temps, label: 'Temperatura' },
                ]}
                xAxis={[{ scaleType: 'point', data: getDataFiveHours(data).hours }]}
            />
        </>
    );
}