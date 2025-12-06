import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import Selector from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

import { Grid } from '@mui/material';

function App() {

  const dataFetcherOutput = useFetchData();

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
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Temperatura (2m)'
              description={`${dataFetcherOutput.data?.current.temperature_2m} ${dataFetcherOutput.data?.current_units.temperature_2m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Temperatura aparente'
              description={`${dataFetcherOutput.data?.current.apparent_temperature} ${dataFetcherOutput.data?.current_units.apparent_temperature}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Velocidad del viento (10m)'
              description={`${dataFetcherOutput.data?.current.wind_speed_10m} ${dataFetcherOutput.data?.current_units.wind_speed_10m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Humedad relativa (2m)'
              description={`${dataFetcherOutput.data?.current.relative_humidity_2m} ${dataFetcherOutput.data?.current_units.relative_humidity_2m}`} />)
          }
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
