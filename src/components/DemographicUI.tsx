import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Stack
} from '@mui/material';
import {
  LocationOn,
  Terrain,
  Flag,
  Refresh,
  Close,
  Language
} from '@mui/icons-material';

import { type OpenStreetMapResponse } from '../types/DashboardTypes';

interface DemographicUIProps {
  data?: OpenStreetMapResponse | undefined;
  onRefresh?: () => void;
  onClose?: () => void;
}

export default function DemographicUI({ data, onRefresh, onClose }: DemographicUIProps) {
  const addr = data?.address as any;
  const city = addr?.city ?? addr?.town ?? addr?.village ?? addr?.municipality ?? addr?.hamlet ?? addr?.county ?? addr?.state;
  const county = addr?.county ?? addr?.region ?? addr?.state_district ?? addr?.state;
  const plot = addr?.plot ?? addr?.road ?? addr?.house_number ?? addr?.postcode;
  const country = addr?.country;
  const country_code = addr?.country_code;
  const latitude = data?.lat ? Number.parseFloat(data.lat) : undefined;
  const longitude = data?.lon ? Number.parseFloat(data.lon) : undefined;

  const hasCoords = Number.isFinite(latitude) && Number.isFinite(longitude);

  return (
    <Card sx={{ maxWidth: 400, minWidth: 320, mt: 2 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn color="primary" />
            <Typography variant="h6" component="h2">
              Información de Ubicación
            </Typography>
          </Box>
        }
        action={
          <Box>
            {onRefresh && (
              <Tooltip title="Actualizar">
                <IconButton onClick={onRefresh} size="small">
                  <Refresh />
                </IconButton>
              </Tooltip>
            )}
            {onClose && (
              <Tooltip title="Cerrar">
                <IconButton onClick={onClose} size="small">
                  <Close />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent>
        {/* Datos principales */}
        <Stack spacing={2}>
          {/* Ciudad */}
          {city && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Ciudad
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                {city}
              </Typography>
            </Box>
          )}

          {/* Condado/Región */}
          {county && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Región
              </Typography>
              <Typography variant="body1">
                <Terrain sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                {county}
              </Typography>
            </Box>
          )}

          {/* Lote/Dirección */}
          {plot && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Dirección
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {plot}
              </Typography>
            </Box>
          )}

          <Divider />

          {/* País y Código */}
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              País
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Flag sx={{ color: 'action.active' }} />
              <Typography variant="body1" fontWeight="medium">
                {country}
              </Typography>
              {country_code && (
                <Chip 
                  label={country_code.toUpperCase()} 
                  size="small" 
                  variant="outlined"
                  icon={<Language sx={{ fontSize: 14 }} />}
                />
              )}
            </Box>
          </Box>
        </Stack>

        {/* Coordenadas si están disponibles */}
        {hasCoords && (
          <Box mt={2} pt={2} borderTop={1} borderColor="divider">
            <Typography variant="caption" color="text.secondary" display="block">
              Coordenadas
            </Typography>
            <Typography variant="body2" fontFamily="monospace">
              {latitude!.toFixed(4)}, {longitude!.toFixed(4)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}