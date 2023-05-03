import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {WeatherResponseData} from "../../features";

export interface AppRepository {
  readonly currentWeather$:  Observable<WeatherResponseData[] | null>
}

export const APP_REPOSITORY: InjectionToken<AppRepository> = new InjectionToken<AppRepository>('AppRepository');
