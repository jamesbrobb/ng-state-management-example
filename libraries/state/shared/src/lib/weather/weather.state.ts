import {WeatherResponseData} from '@jbr/shared';


export type WeatherLocationMap = {
  [latLng: string]: {
    [date: string]: WeatherResponseData[]
  }
}

export interface WeatherState {
  locations: WeatherLocationMap
}

export const initialWeatherState: WeatherState = {locations: {}}
