import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import Selector from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import { CITY_COORDS } from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import MapUI from './components/MapUI';
import useFetchDataDemographic from './functions/useFetchDataDemographic';
import DemographicUI from './components/DemographicUI';

import { Grid } from '@mui/material';
import { useState } from 'react';

function App() {

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Determine cityConfig from selectedOption (can be 'lat,lng' or city key)
  let cityConfig = { latitude: -2.1962, longitude: -79.8862 };
  if (selectedOption) {
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

  // Comunique la opción seleccionada al hook useFetchData
  const dataFetcherOutput = useFetchData(selectedOption);
  const dataFetcherOutputDemographic = useFetchDataDemographic(cityConfig);

  const onCoordinatesSelect = (coords: string) => {
    console.log('Coordenadas seleccionadas:', coords);
    setSelectedOption(coords);
  }
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
      <Grid size={{ xs: 12, md: 6 }}><MapUI selectedOption={selectedOption} onCoordinatesSelect={onCoordinatesSelect}></MapUI></Grid>
      <Grid size={{ xs: 12, md: 6 }}><DemographicUI data={dataFetcherOutputDemographic} /></Grid>
    </Grid>
  );
}

export default App;
