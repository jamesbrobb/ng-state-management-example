import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {WeatherResponseData} from "@jbr/shared";

export interface AppRepository {
  readonly currentWeather$:  Observable<WeatherResponseData[] | null>
}

export const APP_REPOSITORY: InjectionToken<AppRepository> = new InjectionToken<AppRepository>('AppRepository');
