import {Observable} from "rxjs";
import {WeatherLocationData, WeatherLocationMap} from "./weather.state";
import {WeatherResponseData} from "../services/weather.service";
import {InjectionToken} from "@angular/core";


export interface WeatherRepository {
  readonly locations$: Observable<WeatherLocationMap>;
  readonly getLocationByKey: (key: string) =>  Observable<WeatherResponseData[] | null>;
  readonly getLocationDataByKey: (key: string) => Observable<WeatherLocationData | null>;
  getWeatherForLocation(lat: number, lng: number, validdatetime: string): void;
}

export const WEATHER_REPOSITORY = new InjectionToken<WeatherRepository>('WeatherRepository');
