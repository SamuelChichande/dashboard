import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import Selector from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

import { Grid } from '@mui/material';

function App() {

  const { data, loading, error } = useFetchData();

  const getDescription = (value: Number | undefined, unit: string | undefined) => {
    if (loading) return "Cargando...";
    if (error) return `Error: ${error}`;
    if (!data || value === undefined || unit === undefined) return "Dato no disponible";
    return `${value} ${unit}`;
  };

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={12}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={12} /*container justifyContent="right" alignItems="center"*/><AlertUI description="No se preveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><Selector></Selector></Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }} container>
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Temperatura (2m)'
            description={getDescription(
              data?.current.temperature_2m,
              data?.current_units.temperature_2m
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Temperatura aparente'
            description={getDescription(
              data?.current.apparent_temperature,
              data?.current_units.apparent_temperature
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Velocidad del viento (10m)'
            description={getDescription(
              data?.current.wind_speed_10m,
              data?.current_units.wind_speed_10m
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Humedad relativa (2m)'
            description={getDescription(
              data?.current.relative_humidity_2m,
              data?.current_units.relative_humidity_2m
            )}
          />
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App;
