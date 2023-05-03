import {WEATHER_PARAM, WeatherResponseData} from "../services/weather.service";

export interface WeatherState {
  locations: WeatherLocationMap
}

export type WeatherLocationMap = {
  [latLng: string]: WeatherResponseData[]
}

export type WeatherLocationData = {
  date: string,
  parameters: {
    name: WEATHER_PARAM,
    value: unknown
  }[]
}

export const initialWeatherState: WeatherState = {locations: {}}
