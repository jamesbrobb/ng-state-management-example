import {inject, Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {iif, map, Observable, of, Subject, switchMap} from "rxjs";


export const API = 'https://api.meteomatics.com';
export const LOGIN_URI = 'https://login.meteomatics.com/api/v1/token';

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

export const METEOMATICS_AUTH = new InjectionToken<string>('METEOMATICS_AUTH')

@Injectable({providedIn: 'root'})
export class WeatherService {

  #http = inject(HttpClient);
  #auth_token = inject(METEOMATICS_AUTH);

  #accessToken?: string;

  #token = new Subject();


  get(params: WeatherRequestParams): Observable<WeatherResponseData[]> {

    return this._auth()
      .pipe(switchMap((token) => {
        const uri = [
          API,
          params.validdatetime,
          params.parameters.join(','),
          params.location,
          'json'
        ].join('/');

        return this.#http.get<WeatherResponse>(uri, {params: new HttpParams({fromString: `access_token=${token}`})})
          .pipe(map(response => response.data));
      })
    )
  }

  private _auth(): Observable<string> {

    return iif(
      () => !this.#accessToken,
      of('').pipe(switchMap(() => {
        const headers = new HttpHeaders({
          Authorization: 'Basic ' +btoa(this.#auth_token)
        });
        return this.#http.get<{
          access_token: string,
          token_type: string
        }>(LOGIN_URI, {headers})
          .pipe(
            map(response => this.#accessToken = response.access_token)
          );
      })),
      of(this.#accessToken as string)
    );
  }
}
