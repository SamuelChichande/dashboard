import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import Selector from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

import { Grid } from '@mui/material';
import { useState } from 'react';

function App() {

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Comunique la opción seleccionada al hook useFetchData
  const dataFetcherOutput = useFetchData(selectedOption);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={12}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={12} /*container justifyContent="right" alignItems="center"*/><AlertUI data={dataFetcherOutput} /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><Selector onOptionSelect={setSelectedOption}></Selector></Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }} container>
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Temperatura (2m)'
              description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Temperatura aparente'
              description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
          }
          {/* IndicatorUI con la Temperatura aparente en °C' */}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Velocidad del viento (10m)'
              description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
          }
          {/* IndicatorUI con la Velocidad del viento en km/h' */}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Humedad relativa (2m)'
              description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />)
          }
          {/* IndicatorUI con la Humedad relativa en %' */}
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI data={dataFetcherOutput} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI data={dataFetcherOutput} />
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App;
