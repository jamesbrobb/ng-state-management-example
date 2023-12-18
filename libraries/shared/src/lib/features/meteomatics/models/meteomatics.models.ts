import {WEATHER_PARAM} from "../services/weather.service";


export type WeatherParameter = {
  name: WEATHER_PARAM,
  value: unknown
}


export type WeatherLocationData = {
  date: string,
  parameters: WeatherParameter[]
}
