import {AppConfigType} from "./app";


export type Environment = {
  production: boolean
  config: AppConfigType,
  MAPQUEST_KEY: string,
  METEOMATICS_AUTH: string,
  WEATHER_URI: string,
}

