export interface OpenMeteoResponse {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: CurrentUnits
    current: Current
    hourly_units: HourlyUnits
    hourly: Hourly
}

export interface CurrentUnits {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    wind_speed_10m: string
    apparent_temperature: string
    precipitation: string
}

export interface Current {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    apparent_temperature: number
    precipitation: number
}

export interface HourlyUnits {
    time: string
    temperature_2m: string
    wind_speed_10m: string
}

export interface Hourly {
    time: string[]
    temperature_2m: number[]
    wind_speed_10m: number[]
}




export interface OpenStreetMapResponse {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  class: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  address: Address
  boundingbox: string[]
}

export interface Address {
  city: string
  county: string
  plot: string
  "ISO3166-2-lvl4": string
  postcode: string
  country: string
  country_code: string
}
