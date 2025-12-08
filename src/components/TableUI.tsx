import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
    return arrLabels.map((label, index) => ({
        id: index,
        label: label,
        value1: arrValues1[index],
        value2: arrValues2[index]
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'label',
        headerName: 'Fecha y Hora',
        width: 125,
    },
    {
        field: 'value1',
        headerName: 'Velocidad del viento',
        width: 125,
    },
    {
        field: 'value2',
        headerName: 'Temperatura',
        width: 125,
    },
    {
        field: 'resumen',
        headerName: 'Resumen',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 100,
        valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
    },
];


interface TableUIProps {
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

export default function TableUI({ data }: TableUIProps) {

    if (!data) return <Typography>Cargando datos...</Typography>;

    const { hours, temps, winds } = getDataFiveHours(data);
    const rows = combineArrays(hours, winds, temps);

    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}