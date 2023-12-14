import {WEATHER_PARAM, WeatherResponseData} from "../services/weather.service";


export type WeatherLocationData = {
  date: string,
  parameters: {
    name: WEATHER_PARAM,
    value: unknown
  }[]
}
