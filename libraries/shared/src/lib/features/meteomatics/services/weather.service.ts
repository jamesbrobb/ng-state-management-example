import {inject, Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {iif, map, Observable, of, Subject, switchMap} from "rxjs";


export enum WEATHER_PARAM {
  WIND_SPEED='wind_speed_10m:ms',
  WIND_DIRECTION='wind_dir_10m:d',
  WIND_GUSTS_1HR='wind_gusts_10m_1h:ms',
  WIND_GUSTS_24HR='wind_gusts_10m_24h:ms',
  TEMPERATURE='t_2m:C',
  TEMPERATURE_MIN='t_min_2m_24h:C',
  TEMPERATURE_MAX='t_max_2m_24h:C',
  MSL_PRESSURE='msl_pressure:hPa',
  PRECIPITATION_1HR='precip_1h:mm',
  PRECIPITATION_24HR='precip_24h:mm',
  WEATHER_SYMBOL_1H='weather_symbol_1h:idx',
  WEATHER_SYMBOL_24H='weather_symbol_24h:idx',
  UV_INDEX='uv:idx',
  SUNRISE='sunrise:sql',
  SUNSET='sunset:sql'
}

export type WeatherParams = WEATHER_PARAM[]


export type WeatherRequestParams = {
  validdatetime: string, // ISO-86011
  parameters: WeatherParams,
  location: string, //  (latitude and longitude) in WGS-84 decimal format
}

export type WeatherResponse = {
  version: string,
  user: string,
  dateGenerated: string,
  status: 'OK',
  data: WeatherResponseData[]
}

export type WeatherResponseData = {
  parameter: WEATHER_PARAM,
  coordinates: WeatherResponseCoordData[]
}

export type WeatherResponseCoordData = {
  lat: string,
  lon: string,
  dates: [{
    date: string,
    value: unknown
  }]
}


export const WEATHER_URI = new InjectionToken<string>('WEATHER_URI')
export const METEOMATICS_AUTH = new InjectionToken<string>('METEOMATICS_AUTH')

@Injectable({providedIn: 'root'})
export class WeatherService {

  #http = inject(HttpClient);
  #uri = inject(WEATHER_URI);

  get(params: WeatherRequestParams): Observable<WeatherResponseData[]> {

    const uri = [
      this.#uri,
      params.validdatetime,
      params.parameters.join(','),
      params.location,
    ].join('/');

    return this.#http.get<WeatherResponse>(uri)
      .pipe(map(response => response.data));
  }
}
