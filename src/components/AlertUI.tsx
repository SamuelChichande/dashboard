import Alert from "@mui/material/Alert";
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface AlertConfig {
    data?: OpenMeteoResponse | undefined;
}

const getAlert = (data: OpenMeteoResponse | undefined) => {
    if (!data) {
        return <Alert variant="standard" severity="success">Cargando datos del clima...</Alert>;
    }

    const currentPrecipitation = data.current.precipitation;

    if (currentPrecipitation >= 0 && currentPrecipitation <= 0.2) {
        return <Alert variant="standard" severity="success">No se preveen lluvias</Alert>;
    }

    if (currentPrecipitation > 0.2 && currentPrecipitation <= 0.4) {
        return <Alert variant="standard" severity="info">Baja probabilidad de lluvia</Alert>;
    }

    if (currentPrecipitation > 0.4 && currentPrecipitation <= 0.6) {
        return <Alert variant="standard" severity="info">Es probable que lluvia</Alert>;
    }

    if (currentPrecipitation > 0.6 && currentPrecipitation <= 0.8) {
        return <Alert variant="standard" severity="info">Se esperan lluvias</Alert>;
    }

    if (currentPrecipitation > 0.8) {
        return <Alert variant="standard" severity="warning">Llovera</Alert>;
    }
    
    return <Alert variant="standard" severity="success">Datos disponibles</Alert>;
}

/*
interface AlertConfig {
    description: string;
}


export default function AlertUI( config:AlertConfig ) {
    return (
        <Alert variant="standard" severity="success"> {config.description} </Alert>
    )
}
*/

export default function AlertUI({ data }: AlertConfig) {
    return (
        getAlert(data)
    )
}
