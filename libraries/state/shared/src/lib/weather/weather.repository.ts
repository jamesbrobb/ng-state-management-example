import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {WeatherLocationData, WeatherResponseData} from '@jbr/shared';
import {WeatherLocationMap} from "./weather.state";


export interface WeatherRepository {
  readonly locations$: Observable<WeatherLocationMap>;
  readonly getLocationByKey: (key: string) =>  Observable<{[datetime: string]:WeatherResponseData[]} | null>;
  readonly getLocationDataByKey: (key: string, datetime: string) => Observable<WeatherLocationData | null>;
  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void;
}

export const WEATHER_REPOSITORY = new InjectionToken<WeatherRepository>('WeatherRepository');
