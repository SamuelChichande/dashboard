/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import Selector from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

import { Grid } from '@mui/material';

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/
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
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App;
